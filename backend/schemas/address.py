from pydantic import BaseModel

class AddressCreate(BaseModel):
    address: str
    latitude: float
    longitude: float