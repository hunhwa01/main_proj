from fastapi import APIRouter
from backend.services.google_places import fetch_place_autocomplete
from backend.schemas.google_places import PlaceAutocompleteResponse

router = APIRouter()

@router.get("/autocomplete", response_model=PlaceAutocompleteResponse)
async def autocomplete(input_text: str):
    """
    Google Places API를 사용하여 주소 자동완성을 제공합니다.
    """
    try:
        predictions = await fetch_place_autocomplete(input_text)
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
