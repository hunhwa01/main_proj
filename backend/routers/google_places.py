from fastapi import APIRouter, HTTPException, Query
from backend.services.google_places import fetch_place_autocomplete
from backend.schemas.google_places import PlaceAutocompleteResponse

router = APIRouter()

@router.get("/autocomplete", response_model=PlaceAutocompleteResponse)
async def autocomplete(input_text: str = Query(..., description="검색할 주소 입력")):
    """
    Google Places API를 사용하여 주소 자동완성을 제공합니다.
    """
    try:
        print(f"📩 입력된 `input_text`: {input_text}")
        predictions = await fetch_place_autocomplete(input_text)
        return {"predictions": predictions}
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        raise HTTPException(status_code=500, detail=str(e))
