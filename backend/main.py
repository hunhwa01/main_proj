from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from backend.routers import users, Dbti_router, auth
from backend.routers import users, Dbti_router, Care_recommed


from backend.routers.auth import router as auth_router
from backend.routers.upload import router as upload_router
from dotenv import load_dotenv

# 밥꺼 추가
from backend.routers.address import router as address_router
from backend.routers.google_places import router as google_places_router  # Google Places 라우터 임포트
import os
import httpx

app = FastAPI()

TMAP_API_KEY = os.getenv("TMAP_API_KEY")

# CORS 설정 (React와 통신 가능하도록 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(users.router)
app.include_router(Dbti_router.router, prefix="/api")
app.include_router(auth.router, prefix="/api/auth")
app.include_router(Care_recommed.router)
app.include_router(upload_router, prefix="/upload", tags=["Upload"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])  # ✅ prefix 유지

# 밥꺼 추가
app.include_router(address_router, prefix="/api/address", tags=["Address"])
app.include_router(google_places_router, prefix="/api/places", tags=["Google Places"])

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

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

# ✅ 환경 변수 로드
load_dotenv()

# ✅ 환경 변수 출력 (개발 중에만 유지)
print("✅ DATABASE_URL:", os.getenv("DATABASE_URL"))