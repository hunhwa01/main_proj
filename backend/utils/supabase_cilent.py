import httpx
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# HTTP 클라이언트 설정
HEADERS = {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}


async def supabase_request(method: str, endpoint: str, data=None, params=None):
    """Supabase와 통신하는 함수."""
    async with httpx.AsyncClient() as client:
        url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
        response = await client.request(method, url, headers=HEADERS, json=data, params=params)
        response.raise_for_status()  # 오류 발생 시 예외 처리
        return response.json()
