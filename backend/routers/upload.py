import uuid
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """
    업로드된 이미지를 저장하고 URL을 반환합니다.
    """
    file_location = f"uploads/{uuid.uuid4()}-{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())

    return {"image_url": f"http://localhost:8000/{file_location}"}