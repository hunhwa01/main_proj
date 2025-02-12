import requests

API_KEY = "AIzaSyCMDoICFXjY3-iMPUNHw6S2cdlnF2NOqy4"
input_text = "서울특별시 강남구 테헤란로"

url = f"https://maps.googleapis.com/maps/api/place/autocomplete/json"
params = {
    "input": input_text,
    "key": API_KEY,
    "types": "geocode",
    "language": "ko",
    "components": "country:KR"
}

response = requests.get(url, params=params)
print(response.json())  # 응답 데이터 출력

import os
from dotenv import load_dotenv

load_dotenv()
print("🔑 API Key:", os.getenv("GOOGLE_API_KEY"))
