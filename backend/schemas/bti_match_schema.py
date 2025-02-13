from pydantic import BaseModel
from typing import List

class PetSchema(BaseModel):
    id: int
    name: str
    pet_mbti: str

    class Config:
        orm_mode = True

class TrainerSchema(BaseModel):
    id: int
    name: str             
    trainer_mbti: str
    experience: int
    rating: float
    score: float          # XGBoost 예측 점수

    class Config:
        orm_mode = True

class TrainerRecommendation(BaseModel):
    recommended_trainers: List[TrainerSchema]
