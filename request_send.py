from requests.api import get
from request_generate import get_request_parameters
import json
import requests
from icecream import ic

url = "http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson"

headers, data = get_request_parameters()

def get_resp_data() -> dict:
    r = requests.post(url= url, headers=headers, json=data)
    r.encoding = "utf8"

    resp_data = json.loads(r.text)

    return resp_data["data"]
