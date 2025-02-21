from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
import uuid

class ReservationCreate(BaseModel):
    uuid_id: uuid.UUID  # ✅ UUID 형식
    pet_id: int
    trainer_id: int
    schedule: datetime
    status: str = "pending"