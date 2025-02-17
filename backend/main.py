from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import users, Dbti_router, auth
from backend.routers.bti_match import router as bti_match
from fastapi.responses import Response
from backend.routers.address import router as address_router
from backend.routers.google_places import router as google_places_router  # Google Places 라우터 임포트
import os
import httpx

app = FastAPI()

TMAP_API_KEY = os.getenv("TMAP_API_KEY")

# ✅ CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용 (필요에 따라 특정 도메인만 허용 가능)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

# ✅ T맵 도보 길찾기 API 프록시
@app.get("/proxy/tmap-route")
async def get_tmap_route(start: str, goal: str):
    url = f"https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1"
    headers = {
        "appKey": TMAP_API_KEY,
        "Content-Type": "application/json",
    }
    
    payload = {
        "startX": start.split(",")[0],
        "startY": start.split(",")[1],
        "endX": goal.split(",")[0],
        "endY": goal.split(",")[1],
        "reqCoordType": "WGS84GEO",
        "resCoordType": "EPSG3857",
        "startName": "출발지",
        "endName": "목적지",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        return response.json()


# 라우터 등록
app.include_router(users.router)
app.include_router(bti_match, prefix="/api")
app.include_router(Dbti_router.router, prefix="/api")
app.include_router(address_router, prefix="/api/address", tags=["Address"])
app.include_router(google_places_router, prefix="/api/places", tags=["Google Places"])
