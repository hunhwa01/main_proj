from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db
from backend.services.walk import save_walking_route

router = APIRouter()

@router.post("/save-walking-route")
async def save_walking_route_api(reservation_id: str, start: dict, end: dict, db: AsyncSession = Depends(get_db)):
    """
    산책이 끝난 후 walking_routes 테이블에 거리, 걸음 수, 예상 소요 시간을 저장
    """
    result = await save_walking_route(reservation_id, start, end, db)
    if not result:
        raise HTTPException(status_code=400, detail="산책 데이터 저장 실패")
    
    return {"message": "산책 데이터 저장 성공", "data": result}
