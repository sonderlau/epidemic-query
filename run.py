import pymysql.cursors
import pymysql
from request_send import get_resp_data
import time
from rich import print

# ! 表 名称
table_name = "epidemic_data"

# ! 数据库连接信息
connection = pymysql.connect(
    # 地址
    host="diana.mshome.net",
    # 用户名
    user="diana",
    # 密码
    passwd="max1ndex",
    # 数据库名
    database="demos",
    # 端口
    port=3306,
    
    
    charset="utf8",
    cursorclass=pymysql.cursors.DictCursor,
)

# 请求的返回
data = get_resp_data()

# YYYY-mm-dd 格式 今天日期
date_today = time.strftime("%Y-%m-%d", time.gmtime())

# YYYY-mm-dd 数据的最新更新时间
date_end_update = data["end_update_time"][:-1] + ":00:00"

# 统计计数使用
statistic = {"update": 0, "insert": 0}

# 执行标记
result = None

# 查找当前社区是否存在于数据库中
with connection:
    with connection.cursor() as cursor:

        check_if_community_exists = (
            "select id from {table_name} where date = '{date}'".format(
                table_name=table_name,
                date=date_today,
            )
        )

        cursor.execute(check_if_community_exists)

    result = cursor.fetchone()

    if result is not None:
        # 今日的所有风险设置为 none
        with connection.cursor() as cursor:
            risk_default_set = (
                "update {table_name} set rank = 'none' where date = '{date}'".format(
                    table_name=table_name, date=date_today
                )
            )
            cursor.execute(risk_default_set)
    connection.commit()



    # 高风险地区数
    high_risk_count = data["hcount"]
    # 中风险地区数
    mid_risk_count = data["mcount"]
    
    # 计数 用于判断风险等级
    cnt = 0
    
    print(":red_circle: 高风险地区数 - {}".format(high_risk_count))

    # * 所有的地区
    for risk_city in data["highlist"] + data["middlelist"] + data["lowlist"]:
        # 省份和城市名
        province_name = risk_city["province"]
        city_name = risk_city["city"]
        # 地区名
        area_name = risk_city["area_name"].replace(" ", "")  # 去空格
        # 区或县城
        county_name = risk_city["county"]
        
        # ! 无具体社区信息
        if len(risk_city["communitys"]) == 0:
            risk_city["communitys"].append(" ")
        
        # 该地区下 所有的社区
        for community_name in risk_city["communitys"]:
            
            # ---------判断当前的风险等级-------------
            if cnt >= (mid_risk_count + high_risk_count):
                risk_level = 'low'
            elif cnt >= (high_risk_count):
                risk_level = 'mid'
            else:
                risk_level = 'high'
                
            # -------------------------------------

            if result == None:
                # *表中无今日数据 -> 插入
                with connection.cursor() as cursor:

                    insert_new_community = "insert into {table} (`date`, `update_date`, `rank`, `area_name`, `province`, `city`, `county`) values('{date}', '{update_date}', '{rank}', '{area_name}', '{province}', '{city}' , '{county}')".format(
                        table=table_name,
                        date=date_today,
                        update_date=date_end_update,
                        rank=risk_level,
                        area_name= str(area_name + community_name).rstrip(),
                        province=province_name,
                        city=city_name,
                        county = county_name
                    )

                    cursor.execute(insert_new_community)
                    statistic["insert"] += 1
                

            else:
                # *有今日的的数据 -> 更新

                with connection.cursor() as cursor:
                    # 以 (当天日期, 地区全名) 为搜索关键字 对搜索结果地区的 (时间, 风险等级) 做更新
                    update_community = """
                            update {table} set `update_date` = '{update_date}', rank='{rank}'
                                where date = '{date}' and area_name = '{area_name}'
                            """.format(
                        table=table_name,
                        date=date_today,
                        update_date=date_end_update,
                        rank=risk_level,
                        area_name=str(area_name + community_name).rstrip(),
                    )

                    cursor.execute(update_community)

                    statistic["update"] += 1
            connection.commit()
            
            # * 输出信息
            
            level = ""
            
            if risk_level == "high":
                level = ":small_red_triangle: [red1]高风险[/red1]"
            elif risk_level == "mid":
                level = ":small_orange_diamond: [orange_red1]中风险[/orange_red1]"
            else:
                level = ":small_blue_diamond: [blue]低风险[/blue]"
            
            print(
                ":bento: {opt} - {level} - [dark_cyan]{area}[/dark_cyan] ".format(
                    opt="[gold1]插入[/gold1]"
                    if result == None
                    else "[orchid2]更新[/orchid2]",
                    area=area_name + community_name,
                    level= level
                )
            ) 
            
            # 计数 用于判断风险等级
            cnt += 1

    
print("完成: 更新 - {} 次    插入 - {} 次".format(statistic["update"], statistic["insert"]))
