from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.address import Address
from backend.schemas.address import AddressCreate

router = APIRouter()

@router.post("/save-address")
def save_address(address: AddressCreate, db: Session = Depends(get_db)):
    """Walk2에서 입력된 주소를 DB에 저장하는 API"""
    db_address = Address(
        address=address.address,
        latitude=address.latitude,
        longitude=address.longitude
    )
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return {"message": "주소 저장 성공", "data": db_address}

