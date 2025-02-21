import httpx
import os
from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile
from backend.schemas.pets import PetCreate
from backend.models import Pet
from backend.database import supabase
from backend.database import bucket_name

async def upload_pet_image(image: UploadFile):
    """
    Supabase Storage에 반려견 이미지 업로드 후 URL 반환
    """
    try:
        file_path = f"pets/{image.filename}"
        headers = {"apikey": os.getenv("SUPABASE_SERVICE_KEY")}
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://{supabase}.supabase.co/storage/v1/object/{bucket_name}/{file_path}",
                headers=headers,
                files={"file": (image.filename, image.file, image.content_type)}
            )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="이미지 업로드 실패")

        return f"https://{supabase}.supabase.co/storage/v1/object/public/{bucket_name}/{file_path}"

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"이미지 업로드 중 오류 발생: {str(e)}")


def create_pet(db: Session, pet_data: PetCreate, owner_id: int, image_url: str):
    """
    Supabase DB에 반려견 정보 저장
    """
    new_pet = Pet(
        owner_id=owner_id,
        name=pet_data.name,
        gender=pet_data.gender,
        breed=pet_data.breed,
        birth_date=pet_data.birth_date,
        weight=pet_data.weight,
        is_neutered=pet_data.is_neutered,
        notes=pet_data.notes,
        image_url=image_url
    )
    
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet
