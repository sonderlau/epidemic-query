from request_generate import get_request_parameters
import json
import requests
from icecream import ic

url = "http://bmfw.www.gov.cn/bjww/interface/interfaceJson"

headers, data = get_request_parameters()

def get_resp_data() -> dict:
    r = requests.post(url= url, headers=headers, json=data)
    r.encoding = "utf8"
    resp_data = json.loads(r.text)

    return resp_data["data"]