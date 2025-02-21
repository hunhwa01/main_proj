import requests
import os
import jwt
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from backend.database.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.models import User
from passlib.context import CryptContext

# ✅ 환경 변수에서 Supabase 정보 가져오기
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# ✅ FastAPI 보안 토큰 (Bearer 토큰 사용)
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Supabase JWT를 검증하고 현재 로그인된 사용자 UUID 반환
    """
    token = credentials.credentials
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{SUPABASE_URL}/auth/v1/user", headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT")

    user_data = response.json()
    return user_data["id"]  # ✅ Supabase에서 반환하는 사용자 UUID

# ✅ Supabase JWT 검증 함수
def verify_supabase_token(token: str = Depends(security)):
    headers = {"Authorization": f"Bearer {token.credentials}"}
    response = requests.get(f"{SUPABASE_URL}/auth/v1/user", headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT")

    return response.json()  # ✅ Supabase 사용자 정보 반환

# ✅ FastAPI 설정
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 5  # 2시간 후 만료

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

# ✅ 회원가입 요청 모델
class SignupRequest(BaseModel):
    user_id: str
    email: str
    password: str
    name: str
    phone_number: str
    address: str
    nickname: str

class LoginRequest(BaseModel):
    user_id: str
    password: str

# ✅ 회원가입 API (Supabase 사용)
@router.post("/signup")
async def signup(request: SignupRequest, db: AsyncSession = Depends(get_db)):
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "email": request.email,
        "password": request.password,
        "data": {
            "name": request.name,  # ✅ name 추가
            "phone_number": request.phone_number,
            "address": request.address,
            "nickname": request.nickname
        }
    }

    # ✅ Supabase `auth.users`에 회원가입 요청
    response = requests.post(f"{SUPABASE_URL}/auth/v1/signup", headers=headers, json=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="회원가입 실패")

    # ✅ Supabase에서 `user_id(UUID)` 가져오기
    user_data = response.json()
    user_id = user_data["id"]

    # ✅ `users` 테이블에 저장 (중복 방지)
    new_user = User(
        id=user_id,  # ✅ Supabase `auth.users.id(UUID)`를 `users.id`로 저장
        name=request.name,  # ✅ name 추가
        email=request.email,
        phone_number=request.phone_number,
        address=request.address,
        nickname=request.nickname
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return {"message": "회원가입이 완료되었습니다!", "user_id": user_id}

# ✅ 로그인 API (아이디 기반 로그인 → 이메일 변환 후 Supabase 로그인)
@router.post("/login")
async def login(request: LoginRequest):
    # 🔹 `user_id`를 통해 이메일 찾기
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.get(f"{SUPABASE_URL}/rest/v1/users?user_id=eq.{request.user_id}", headers=headers)

    if response.status_code != 200 or not response.json():
        raise HTTPException(status_code=401, detail="잘못된 아이디 또는 비밀번호입니다.")

    email = response.json()[0]["email"]

    # 🔹 Supabase 로그인 요청
    payload = {"email": email, "password": request.password}
    login_response = requests.post(f"{SUPABASE_URL}/auth/v1/token?grant_type=password", headers=headers, json=payload)

    if login_response.status_code != 200:
        raise HTTPException(status_code=401, detail="로그인 실패")

    return login_response.json()  # ✅ Supabase JWT 반환

@router.get("/auth/me")
async def get_current_user_info(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """\
    현재 로그인된 사용자 정보를 반환합니다.
    """
    token = credentials.credentials
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{SUPABASE_URL}/auth/v1/user", headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT")

    user_data = response.json()
    return {
        "id": user_data["id"],
        "email": user_data["email"],
        "name": user_data["user_metadata"]["name"]
    }