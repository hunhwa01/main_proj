from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database import get_db
from backend.models.address import Address
from backend.models.reservations import Reservation
from backend.schemas.reservations import ReservationCreate
import uuid

router = APIRouter()

@router.post("/create")
async def create_reservation(reservation: ReservationCreate, db: AsyncSession = Depends(get_db)):
    try:
        # 📌 가장 최신 주소 가져오기
        result = await db.execute(
            select(Address).order_by(Address.created_at.desc()).limit(1)
        )
        latest_address = result.scalars().first()

        if not latest_address:
            raise HTTPException(status_code=404, detail="주소 데이터가 없습니다.")
        
        new_reservation = Reservation(
            uuid_id=reservation.uuid_id,  # ✅ UUID 자동 변환
            pet_id=reservation.pet_id,
            trainer_id=reservation.trainer_id,
            schedule=reservation.schedule.replace(tzinfo=None),
            status=reservation.status,
            address=latest_address.address,
            latitude=latest_address.latitude,
            longitude=latest_address.longitude,
        )

        db.add(new_reservation)
        await db.commit()
        await db.refresh(new_reservation)

        return {"reservation_id": new_reservation.id, "address": new_reservation.address}
    
    except Exception as e:
        print(f"🚨 예약 생성 오류: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/latest")
async def get_latest_reservation(uuid_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Reservation)
        .where(Reservation.uuid_id == uuid_id)
        .order_by(Reservation.schedule.desc())  # ✅ 최신 예약을 가져옴
        .limit(1)
    )
    reservation = result.scalar()
    if not reservation:
        raise HTTPException(status_code=404, detail="해당 사용자의 예약을 찾을 수 없습니다.")

    return {"id": reservation.id, "schedule": reservation.schedule, "status": reservation.status}

@router.get("/{reservation_id}/address")
async def get_reservation_address(reservation_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id))
    reservation = result.scalars().first()

    if not reservation:
        raise HTTPException(status_code=404, detail="예약 정보를 찾을 수 없습니다.")

    if not reservation.latitude or not reservation.longitude:
        raise HTTPException(status_code=404, detail="예약에 출발지 좌표가 없습니다.")

    print(f"🚀 조회된 reservation 데이터: {reservation}")

    # ✅ reservations 테이블에서 직접 latitude, longitude 가져오기
    return {
        "latitude": reservation.latitude,
        "longitude": reservation.longitude
    }
