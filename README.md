# 疫情地区获取



## 项目文件结构

 ├── db
 │   └── epidemic_data.sql ==数据库文件==
 ├── decryption
 │   ├── interfaceJson.json ==返回信息==
 │   └── risk.25cebd5f.js ==混淆后的js请求==
 ├── README.md
 ├── request_generate.py ==构造请求==
 ├── request_send.py ==发送请求==
 ├── requirements.txt ==项目所需库文件==
 ├── run.py ==运行入口==
 └── test ==做测试用==
     └── select.py



## 环境配置

当前程序测试通过的版本 **Python 3.8.10**

使用 pip 或者 其他包管理安装所需要的包：

```bash
pip install -r requirements.txt
```

开发时使用的是 `virtualenv` 

推荐使用虚拟环境进行部署

```bash
virtualenv venv --python=python3.8.10
source venv/bin/activate
pip install -r requirements.txt
```


## 配置数据库信息

在 `run.py` 文件中的 8-21 行 为数据库连接配置信息

修改好相关配置



## 运行

```bash
# 激活虚拟环境
source ven/bin/activate

# 运行程序
python run.py
```



## 请求解密



对于风险地区的获取来自于卫生健康委官方发布网站，通过解密其发送请求中的字段格式，进行手动构造之后发送POST请求。

其核心文件为 `decryption/risk.25cebd5f.js` 文件经过混淆处理





### 渠道

卫生健康委

[风险等级查询](http://bmfw.www.gov.cn/yqfxdjcx/risk.html)







### 请求

POST

http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson



### 请求头

```
POST http://bmfw.www.gov.cn/bjww/interface/interfaceJson

Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 235
Content-Type: application/json;charset=UTF-8
DNT: 1
Host: bmfw.www.gov.cn
Origin: http://bmfw.www.gov.cn
Pragma: no-cache
Referer: http://bmfw.www.gov.cn/yqfxdjcx/risk.html
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36

x-wif-nonce: QkjjtiLM2dCratiA
x-wif-paasid: smt-application
x-wif-signature: 4CD1350B0208C827EB16A8AB50B91F618A73B18CD8D30EC84C30FAC8A1482600
x-wif-timestamp: 1641621504
```

关键字段：


- `x-wif-nonce` 固定值 "QkjjtiLM2dCratiA"
- `x-wif-paasid` 固定值 "smt-application"
- `x-wif-signature` timestampHeader + "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA" + timestampHeader 使用 SHA256 十六进制全大写表示
- `x-wif-timestamp` timestampHeader





### 请求数据

```json
{
	"appId": "NcApplication",
	"key": "3C502C97ABDA40D0A60FBEE50FAAD1DA",
	"nonceHeader": "123456789abcdefg",
	"paasHeader": "zdww",
	"signatureHeader": "9308EC7CCD63E36BDB87B41F3C98BF99BD893B195E8FD0BA97B2FFB6F0AB4576",
	"timestampHeader": "1641618579"
}
```



- `appId` 固定值
- `key` 固定值
- `nonceHeader` 固定值
- `paasHeader` 固定值
- `signatureHeader` :
  - SHA256 以 16 进制编码 全大写
  - 组成: timestampHeader + "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA" + "123456789abcdefg" + timestampHeader
- `timestampHeader` 当前时间的时间戳 除以 1e3 小数部分舍去且四舍五入到个位



### 返回


```json
"data": {
    "end_update_time": "2022-01-08 0时",
    "hcount": 15,
    "mcount": 82,
    
    "highlist":[
        {
            "type": "2",
            "province": "河南省",
            "city": "许昌市",
            "county": "禹州市",
            "area_name": "河南省 许昌市 禹州市",
            "communitys": [
                "火龙镇刘沟村",
                "夏都街道办事处"
            ]
        }
    ]
}
```





## 数据清洗

对最初的数据做清洗，**目前数据库中是已经清洗好的**

去除重复的地区数据

```sql
delete from epidemic_data where id not in (
    select * from (
                  select min(id) from epidemic_data group by area_name
                      ) as sl
    );
```


将所有英文的 `()` 替换为中文的 `（）` 与官方发布渠道的信息对齐

```sql
update epidemic_data set area_name = replace(area_name, '(', '（');
update epidemic_data set area_name = replace(area_name, ')', '）');
```

