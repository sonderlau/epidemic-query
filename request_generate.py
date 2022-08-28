"""
请求格式构造
"""

import time
import hashlib
from rich import print

init_headers = {
    "Host": "bmfw.www.gov.cn",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Content-Type": "application/json;charset=UTF-8",
    "Content-Length": "235",
    "Origin": "http://bmfw.www.gov.cn",
    "Connection": "keep-alive",
    "DNT": "1",
    "Referer": "http://bmfw.www.gov.cn/yqfxdjcx/risk.html",
    "Cache-Control": "no-cache",
    "x-wif-nonce": "QkjjtiLM2dCratiA",
    "x-wif-paasid": "smt-application",
    "Pragma": "no-cache"
}

init_data = {
    "appId": "NcApplication",
    "key": "3C502C97ABDA40D0A60FBEE50FAAD1DA",
    "nonceHeader": "123456789abcdefg",
    "paasHeader": "zdww",
}


def getTimestamp() -> str:
    """
    获取当前时间的时间戳格式
    """
    nanoSeconds = time.time_ns()
    return str(round(nanoSeconds / 1e9))
    


def get_request_parameters():
    currentTime = getTimestamp()

    # 请求头
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
