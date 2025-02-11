from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import psycopg2

DATABASE_URL = "postgresql://postgres.ivymmfqgtgqcgfxblvnj:alla990406!@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require"

engine = create_engine(DATABASE_URL)

# 세션 팩토리 생성 (비동기 → 동기 변경)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# SQLAlchemy Base 클래스 생성
Base = declarative_base()

# 동기 DB 세션 종속성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 데이터베이스 초기화 함수
def init_db():
    """데이터베이스 테이블 생성"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized successfully")

# DB 연결 테스트 함수
def test_db_connection():
    """데이터베이스 연결 테스트"""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print(f"✅ Database connection test passed: {result.scalar()}")
    except Exception as e:
        print(f"🚨 Database connection test failed: {e}")
        raise

if __name__ == "__main__":
    print("🚀 Running database initialization and connection test...")
    
    # 데이터베이스 초기화
    init_db()
    
    # 데이터베이스 연결 테스트
    test_db_connection()