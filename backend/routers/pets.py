from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import date, datetime
from backend.schemas.pets import PetResponse
from backend.services.pets import upload_pet_image
from backend.database.session import get_db
from backend.routers.auth import get_current_user  # ✅ auth.py에서 가져오기
from backend.models import Pet

router = APIRouter()

@router.post("/pets", response_model=PetResponse)
async def register_pet(
    name: str = Form(...),
    gender: str = Form(...),
    breed: str = Form(...),
    birth_date: str = Form(...),
    weight: float = Form(...),
    is_neutered: bool = Form(...),
    notes: str = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    user_uuid: str = Depends(get_current_user)  # ✅ 현재 로그인된 사용자 UUID 가져오기
):
    """
    반려견 정보 등록 API
    """

    # ✅ 나이 (age) 자동 계산
    birth_date_obj = datetime.strptime(birth_date, "%Y-%m-%d").date()
    today = date.today()
    age = today.year - birth_date_obj.year - ((today.month, today.day) < (birth_date_obj.month, birth_date_obj.day))

    # ✅ 이미지 업로드 (스토리지에 저장 후 URL 반환)
    image_url = None
    if image:
        image_url = await upload_pet_image(image)

    # ✅ DB에 저장할 데이터 생성
    pet_data = Pet(
        owner_id=user_uuid,  # ✅ 현재 로그인된 사용자 UUID 사용
        name=name,
        gender=gender,
        breed=breed,
        weight=weight,
        age=age,  # ✅ 계산된 나이 저장
        is_neutered=is_neutered,
        notes=notes,
        image_url=image_url
    )

    # ✅ DB에 데이터 저장
    db.add(pet_data)
    db.commit()
    db.refresh(pet_data)

    return pet_data
