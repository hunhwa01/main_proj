from fastapi import APIRouter, HTTPException
from backend.services.bti_match_service import get_pet_by_id, recommend_trainers
from backend.schemas.bti_match_schema import TrainerRecommendation

router = APIRouter()

@router.get("/recommend/{pet_id}", response_model=TrainerRecommendation)
def get_trainer_recommendations(pet_id: int):
    pet = get_pet_by_id(pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="해당 강아지를 찾을 수 없습니다.")
    
    recommended_trainers = recommend_trainers(pet)
    return {"recommended_trainers": recommended_trainers}
