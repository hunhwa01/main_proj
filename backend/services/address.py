import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models import Address
from backend.schemas.address import AddressCreate, AddressResponse
import os

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

async def get_coordinates_from_google(address: str):
    """
    Google Maps API를 사용하여 주소를 좌표로 변환합니다.
    """
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": GOOGLE_API_KEY}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

        if response.status_code != 200:
            raise Exception("Google Maps API 요청 실패")

        data = response.json()
        if not data.get("results"):
            raise Exception("주소를 찾을 수 없습니다.")

        location = data["results"][0]["geometry"]["location"]
        return {"latitude": location["lat"], "longitude": location["lng"]}

async def save_address_to_db(address: str, db: AsyncSession):
    """
    주소를 좌표로 변환한 후 DB에 저장합니다.
    """
    coordinates = await get_coordinates_from_google(address)

    new_address = Address(
        address=address,
        latitude=coordinates["latitude"],
        longitude=coordinates["longitude"]
    )
    db.add(new_address)
    await db.commit()
    await db.refresh(new_address)

    return {"id": new_address.id, "latitude": new_address.latitude, "longitude": new_address.longitude}
