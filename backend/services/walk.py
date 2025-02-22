import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database import get_db
from backend.models.walk import WalkingRoute
from fastapi import Depends, HTTPException
from backend.routers.reservations import get_latest_reservation
from sqlalchemy.dialects.postgresql import UUID
import os
import uuid

TMAP_API_KEY = os.getenv("TMAP_API_KEY")

async def calculate_walking_distance(start, end):
    """Tmap API를 이용해 거리, 걸음 수, 예상 시간 계산"""
    try:
        requestData = {
            "startX": start["longitude"],
            "startY": start["latitude"],
            "endX": end["longitude"],
            "endY": end["latitude"],
            "reqCoordType": "WGS84GEO",
            "resCoordType": "WGS84GEO",
            "startName": "출발지",
            "endName": "목적지",
        }

        headers = {"Content-Type": "application/json", "appKey": TMAP_API_KEY}

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1",
                json=requestData,
                headers=headers
            )

        result = response.json()
        total_distance = sum([f["properties"]["distance"] for f in result["features"] if "distance" in f["properties"]])
        total_time = sum([f["properties"]["time"] for f in result["features"] if "time" in f["properties"]])

        return {
            "distance_km": round(total_distance / 1000, 2),
            "estimated_steps": round(total_distance / 0.7),
            "estimated_time": round(total_time / 60)
        }

    except Exception as e:
        print("🚨 거리 계산 실패:", e)
        return None

async def save_walking_route(uuid_id: UUID, start_lat: float, start_lng: float, end_lat: float, end_lng: float, distance_km: float, steps: int, time: int, db: AsyncSession = Depends(get_db)):
    # ✅ 최신 예약 ID 가져오기
    latest_reservation = await get_latest_reservation(uuid_id, db)
    if "id" not in latest_reservation:
        raise HTTPException(status_code=404, detail="예약 정보가 없습니다.")

    # ✅ `walking_routes` 테이블에 데이터 저장
    new_route = WalkingRoute(
        id=uuid.uuid4(),
        reservation_id=int,
        start_latitude=start_lat,
        start_longitude=start_lng,
        end_latitude=end_lat,
        end_longitude=end_lng,
        distance_km=distance_km,
        estimated_steps=steps,
        estimated_time=time
    )
    db.add(new_route)
    await db.commit()
    return {"message": "산책 경로 저장 완료", "route_id": new_route.id}
