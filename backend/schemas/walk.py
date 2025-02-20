from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class WalkingRouteCreate(BaseModel):
    reservation_id: UUID
    start_latitude: float
    start_longitude: float
    end_latitude: float
    end_longitude: float
    distance_km: float
    estimated_steps: int
    estimated_time: int

class WalkReportCreate(BaseModel):
    walk_id: UUID
    user_id: UUID
    trainer_id: UUID | None
    feedback: str | None
