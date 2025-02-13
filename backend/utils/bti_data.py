# ✅ MBTI 궁합표
mbti_matching_table = {
    "ESTJ": {"ISTJ": 0.85, "ESFJ": 0.8, "ENTP": 0.75, "ENFJ": 0.7, "ISFP": 0.65},
    "ENTJ": {"INTJ": 0.85, "ENTP": 0.8, "INFJ": 0.75, "ESFP": 0.7, "ISFJ": 0.65},
    "ESFJ": {"ISFJ": 0.85, "ENFP": 0.8, "ENTP": 0.75, "ISTP": 0.7, "INTJ": 0.65},
    "ENFJ": {"INFJ": 0.85, "ENTP": 0.8, "ISFP": 0.75, "ESFP": 0.7, "INTP": 0.65},
    "ISTJ": {"ESTJ": 0.85, "INTJ": 0.8, "ESFP": 0.75, "ENTP": 0.7, "ISFJ": 0.65},
    "ISFJ": {"ESFJ": 0.85, "ENFJ": 0.8, "ISTJ": 0.75, "ESTP": 0.7, "INTP": 0.65},
    "INTJ": {"ENTJ": 0.85, "INFJ": 0.8, "ESTJ": 0.75, "ESFP": 0.7, "ISFP": 0.65},
    "INFJ": {"ENFJ": 0.85, "INTJ": 0.8, "ENTP": 0.75, "ESFP": 0.7, "ISTP": 0.65},
    "ESTP": {"ENTP": 0.85, "ISTP": 0.8, "ESFP": 0.75, "ISFP": 0.7, "INTP": 0.65},
    "ENTP": {"INTP": 0.85, "ENTJ": 0.8, "ENFP": 0.75, "ESFJ": 0.7, "ISTJ": 0.65},
    "ESFP": {"ISFP": 0.85, "ENTP": 0.8, "ENFJ": 0.75, "INTP": 0.7, "ISTP": 0.65},
    "ENFP": {"INFJ": 0.85, "ENTP": 0.8, "ISFP": 0.75, "ESFJ": 0.7, "INTJ": 0.65},
    "ISTP": {"ESTP": 0.85, "ISFP": 0.8, "ENTP": 0.75, "ENFJ": 0.7, "ESFJ": 0.65},
    "ISFP": {"ESFP": 0.85, "INFJ": 0.8, "ENFP": 0.75, "ISTP": 0.7, "ENTP": 0.65},
    "INTP": {"ENTP": 0.85, "ENFJ": 0.8, "INFJ": 0.75, "ISFP": 0.7, "ISTJ": 0.65},
    "INFP": {"INFJ": 0.85, "ENFP": 0.8, "ISFP": 0.75, "ESFJ": 0.7, "ENTP": 0.65},
}

def get_mbti_match_score(pet_mbti, trainer_mbti):
    """MBTI 궁합 점수 반환"""
    return mbti_matching_table.get(pet_mbti, {}).get(trainer_mbti, 0.5)  # 기본값 0.5

# ✅ 활동량 매칭 점수 계산
activity_levels = {
    "ESTJ": "Very High", "ENTJ": "Very High", "ESTP": "Very High", "ESFP": "Very High",
    "ENTP": "High", "ENFJ": "High", "ENFP": "High", "ESFJ": "High",
    "ISTJ": "Medium", "INTJ": "Medium", "ISFJ": "Medium", "INFJ": "Medium",
    "ISTP": "Low", "INTP": "Low", "ISFP": "Low", "INFP": "Low"
}

def calculate_activity_match(pet_mbti, trainer_mbti):
    pet_activity = activity_levels.get(pet_mbti, "Medium")
    trainer_activity = activity_levels.get(trainer_mbti, "Medium")

    if pet_activity == trainer_activity:
        return 10
    elif (pet_activity in ["Very High", "High"] and trainer_activity in ["Very High", "High"]) or \
         (pet_activity in ["Medium", "Low"] and trainer_activity in ["Medium", "Low"]):
        return 5
    else:
        return -5
