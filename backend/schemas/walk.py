from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class WalkingRouteCreate(BaseModel):
    uuid_id: UUID
    reservation_id: int
    start_latitude: float
    start_longitude: float
    end_latitude: float
    end_longitude: float
    distance_km: float
    estimated_steps: int
    estimated_time: int
    feedback: str | None = None

class WalkReportCreate(BaseModel):
    walk_id: int
    uuid_id: UUID
    trainer_id: int
    feedback: Optional[str] = None
    distance: float
    steps: int
    time: int
