from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import jwt
from backend.database.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database.models import User

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

router = APIRouter()

class LoginRequest(BaseModel):
    user_id: str
    password: str

@router.post("/login")
async def login(request: LoginRequest, db_session: AsyncSession = Depends(get_db)):
    # 🔹 데이터베이스에서 user_id 조회
    stmt = select(User).where(User.user_id == request.user_id)
    result = await db_session.execute(stmt)
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=401, detail="잘못된 아이디 또는 비밀번호입니다.")

    # 🔹 비밀번호 비교 (예외 방지 위해 `str()` 사용)
    if str(request.password) != str(user.password):
        raise HTTPException(status_code=401, detail="잘못된 아이디 또는 비밀번호입니다.")

    # 🔹 JWT 토큰 생성
    token_data = {"user_id": user.user_id, "email": user.email}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {"user_id": user.user_id, "token": token}