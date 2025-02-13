from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import users, Dbti_router
# from routers.bti_match import router as bti_match
from fastapi.responses import Response
from backend.routers.address import router as address_router
from backend.routers.google_places import router as google_places_router  # Google Places 라우터 임포트

app = FastAPI()

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

# 라우터 등록
app.include_router(users.router)
# app.include_router(bti_match, prefix="/api")
app.include_router(Dbti_router.router, prefix="/api")
app.include_router(address_router, prefix="/api/address", tags=["Address"])
app.include_router(google_places_router, prefix="/api/places", tags=["Google Places"])
