import pymysql.cursors
import pymysql
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

# 查找当前社区是否存在于数据库中
with connection:
    with connection.cursor() as cursor:

        check_if_community_exists = (
            "select id from {table_name} where date = '{date}'".format(
                table_name=table_name,
                date="2022-01-16",
            )
        )

        cursor.execute(check_if_community_exists)

    result = cursor.fetchone()
    
    print(result)