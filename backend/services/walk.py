import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database import get_db
from backend.models.walk import WalkingRoute
from fastapi import Depends
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

async def save_walking_route(reservation_id: str, start, end, db: AsyncSession = Depends(get_db)):
    """산책 데이터 저장 (walking_routes 테이블)"""
    route_data = await calculate_walking_distance(start, end)
    if not route_data:
        return None

    new_walk = WalkingRoute(
        walk_id=str(uuid.uuid4()),
        reservation_id=reservation_id,
        start_latitude=start["latitude"],
        start_longitude=start["longitude"],
        end_latitude=end["latitude"],
        end_longitude=end["longitude"],
        distance_km=route_data["distance_km"],
        estimated_steps=route_data["estimated_steps"],
        estimated_time=route_data["estimated_time"],
    )

    db.add(new_walk)
    await db.commit()
    await db.refresh(new_walk)
    return new_walk
