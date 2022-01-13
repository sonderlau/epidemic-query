"""
请求格式构造
"""

import time
import hashlib
from rich import print

init_headers = {
    "Host": "103.66.32.242:8005",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Accept-Encoding": "gzip, deflate",
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": "235",
    "Origin": "http://bmfw.www.gov.cn",
    "Connection": "keep-alive",
    "Referer": "http://bmfw.www.gov.cn/",
    "Cache-Control": "max-age=0",
    "x-wif-nonce": "QkjjtiLM2dCratiA",
    "x-wif-paasid": "smt-application",
}

init_data = {
    "appId": "NcApplication",
    "key": "3C502C97ABDA40D0A60FBEE50FAAD1DA",
    "nonceHeader": "123456789abcdefg",
    "paasHeader": "zdww",
    # "signatureHeader": "9308EC7CCD63E36BDB87B41F3C98BF99BD893B195E8FD0BA97B2FFB6F0AB4576",
    # "timestampHeader": "1641618579"
}


def getTimestamp() -> str:
    """
    获取当前时间的时间戳格式
    """
    nanoSeconds = time.time_ns()
    return str(round(nanoSeconds / 1e9))


def get_request_parameters():
    currentTime = getTimestamp()

    init_headers["x-wif-signature"] = (
        hashlib.sha256(
            (
                currentTime
                + "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA"
                + currentTime
            ).encode("utf-8")
        )
        .hexdigest()
        .upper()
    )

    init_headers["x-wif-timestamp"] = currentTime

    # 请求数据

    init_data["signatureHeader"] = (
        hashlib.sha256(
            (
                currentTime
                + "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"
                + "123456789abcdefg"
                + currentTime
            ).encode("utf-8")
        )
        .hexdigest()
        .upper()
    )

    
    init_data["timestampHeader"] = currentTime
    
    print(":package:[blue]请求构造完毕 Ready to go")
    return init_headers, init_data
