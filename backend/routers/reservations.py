from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database import get_db
from backend.models.reservations import Reservation
from backend.schemas.reservations import ReservationCreate
import uuid

router = APIRouter()

@router.post("/create")
async def create_reservation(reservation: ReservationCreate, db: AsyncSession = Depends(get_db)):
    try:
        new_reservation = Reservation(
            uuid_id=reservation.uuid_id,  # ✅ UUID 자동 변환
            pet_id=reservation.pet_id,
            trainer_id=reservation.trainer_id,
            schedule=reservation.schedule.replace(tzinfo=None),
            status=reservation.status,
        )

        db.add(new_reservation)
        await db.commit()
        return {"reservation_id": new_reservation.id}
    
    except Exception as e:
        print(f"🚨 예약 생성 오류: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/latest")
async def get_latest_reservation(user_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Reservation)
        .where(Reservation.user_id == user_id)
        .order_by(Reservation.schedule.desc())  # ✅ 최신 예약을 가져옴
        .limit(1)
    )
    reservation = result.scalar()
    if not reservation:
        raise HTTPException(status_code=404, detail="해당 사용자의 예약을 찾을 수 없습니다.")

    return {"id": reservation.id, "schedule": reservation.schedule, "status": reservation.status}
