from fastapi import APIRouter
from backend.services.gpt_service import ask_gpt4o

router = APIRouter()

@router.get("/gpt4o")
async def get_gpt_response(prompt: str):
    """프론트엔드에서 GPT-4o 응답을 요청하는 API"""
    response = ask_gpt4o(prompt)
    return {"response": response}
