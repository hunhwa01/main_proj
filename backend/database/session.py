import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# 환경 변수에서 DB URL 가져오기
DATABASE_URL = os.getenv("SUPABASE_DB_URL")

# SQLAlchemy 비동기 엔진 생성
engine = create_async_engine(DATABASE_URL, echo=True)

# 비동기 세션 설정
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Dependency 함수 (FastAPI에서 주입할 때 사용)
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session