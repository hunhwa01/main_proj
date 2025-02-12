from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db
from backend.models.address import Address
from backend.schemas.address import AddressCreate
from backend.services.address import save_address_to_db, get_all_addresses

router = APIRouter()

@router.post("/save-address")
async def save_address(address: AddressCreate, db: AsyncSession = Depends(get_db)):
    """Walk2에서 입력된 주소를 DB에 저장하는 API"""
    try:
        result = await save_address_to_db(address.address, db)
        return {"message": "주소 저장 성공", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/get-addresses")
async def get_addresses(db: AsyncSession = Depends(get_db)):
    """
    DB에 저장된 모든 주소 목록 조회 API
    """
    try:
        addresses = await get_all_addresses(db)
        return {"message": "주소 목록 조회 성공", "data": addresses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
