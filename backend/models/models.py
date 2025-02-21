from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    uuid_id = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    user_id = Column(String, unique=True, nullable=False)  # 로그인용
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    nickname = Column(String, nullable=True)
    is_walker = Column(Boolean, default=False)

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(UUID, ForeignKey("users.uuid_id"), nullable=False)  # Supabase users 테이블과 연결
    name = Column(String, nullable=False)
    breed = Column(String, nullable=False)
    size = Column(String, nullable=True)
    weight = Column(Float, nullable=True)
    gender = Column(String, nullable=True)
    age = Column(Integer, nullable=True)  # ✅ birth_date가 아니라 age 유지
    notes = Column(String, nullable=True)
    pet_mbti = Column(String, nullable=True)
    is_neutered = Column(Boolean, nullable=True)
    image_url = Column(String, nullable=True)