from sqlalchemy import Column, Integer, String, Float
from backend.database import Base

class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    address = Column(String(255), nullable=False)  # 입력된 주소
    latitude = Column(Float, nullable=False)  # 변환된 위도
    longitude = Column(Float, nullable=False)  # 변환된 경도