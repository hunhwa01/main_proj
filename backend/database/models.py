from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    phone_number = Column(String)
    address = Column(String)
    is_walker = Column(Boolean, default=False)
    nickname = Column(String)
    user_id = Column(String, unique=True, nullable=False)  