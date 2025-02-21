from pydantic import BaseModel
from typing import Optional

class PetCreate(BaseModel):
    name: str
    gender: str
    breed: str
    birth_date: str
    weight: float
    is_neutered: bool
    notes: Optional[str] = None

class PetResponse(PetCreate):
    id: int
    owner_id: int
    image_url: Optional[str] = None

    class Config:
        orm_mode = True
