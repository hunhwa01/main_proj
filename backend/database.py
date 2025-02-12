from sqlalchemy import Column, Integer, String, Float, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from dotenv import load_dotenv
import os
import asyncio

load_dotenv()

DATABASE_URL = os.getenv("SUPABASE_DB_URL")

engine = create_async_engine(DATABASE_URL, echo=True, connect_args={"statement_cache_size": 0})

# 전역적으로 MetaData를 관리 (중복 정의 방지)
metadata = MetaData()

# 세션 팩토리 생성 (비동기 → 동기 변경)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 비동기 세션 설정
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# SQLAlchemy Base 클래스 생성
Base = declarative_base(metadata=metadata)

# 동기 DB 세션 종속성
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# 데이터베이스 초기화 함수
async def init_db():
    """데이터베이스 테이블 생성"""
    async with engine.begin() as conn:
        await conn.run_sync(lambda sync_conn: Base.metadata.create_all(sync_conn, checkfirst=True))
    print("✅ Database initialized successfully")

if __name__ == "__main__":
    print("🚀 Running database initialization and connection test...")
    
    # **여기서 asyncio.run() 대신 직접 실행**
    loop = asyncio.get_event_loop()
    loop.run_until_complete(init_db())