# app/schemas/mbti_schemas.py
from pydantic import BaseModel
from typing import List

class MbtiTestRequest(BaseModel):
    answers: List[str]  # 예: ["E", "E", "I", "S", ...] 총 12개 (각 카테고리 3문항)

class MbtiTestResponse(BaseModel):
    mbti: str         # 계산된 MBTI 결과 예: "ESTJ"
