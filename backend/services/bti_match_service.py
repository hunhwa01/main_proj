import xgboost as xgb
import pandas as pd
from supabase import create_client, Client

# 유틸 함수 (MBTI 점수 계산 관련) – 기존 코드의 함수를 그대로 사용
from utils.bti_data import get_mbti_match_score, calculate_activity_match

# === Supabase 설정 ===
SUPABASE_URL = "https://ivymmfqgtgqcgfxblvnj.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eW1tZnFndGdxY2dmeGJsdm5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgxODQ1MywiZXhwIjoyMDU0Mzk0NDUzfQ.JjKyQROGKa5TdUhlOSEXCAyOdX1aYolC5Qv4Uy6Fh6g"

# Supabase 클라이언트 생성
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# === XGBoost 모델 로드 ===
model = xgb.Booster()
model.load_model("ml/xgboost_mbti.json")

# 학습 데이터에서 사용한 컬럼 로드 (CSV 경로는 실제 경로로 수정)
df_train = pd.read_csv("data/mbti_matching_data_large.csv")
df_train = pd.get_dummies(df_train, columns=["pet_mbti", "trainer_mbti"])
train_columns = df_train.drop(columns=["total_score"]).columns.tolist()

def get_pet_by_id(pet_id: int) -> dict:
    """
    Supabase를 사용하여 pet_id에 해당하는 강아지(Pet) 데이터를 조회합니다.
    """
    response = supabase.table("pets").select("*").eq("id", pet_id).execute()
    data = response.data
    if data and len(data) > 0:
        return data[0]
    return None

def recommend_trainers(pet: dict) -> list:
    """
    Supabase를 사용하여 해당 강아지와 궁합이 좋은 트레이너를 추천합니다.
    각 트레이너는 MBTI가 중복되지 않으며 XGBoost 모델을 통한 예측 점수(score)를 기준으로 정렬됩니다.
    """
    response = supabase.table("trainers").select("id, trainer_mbti, experience, rating, users (name)").execute()
    trainers = response.data

    recommendations = []
    mbti_seen = set() 

    for trainer in trainers:
        trainer_mbti = trainer.get("trainer_mbti")
        if trainer_mbti in mbti_seen:
            continue 
        mbti_seen.add(trainer_mbti)

        # JOIN된 user 정보에서 이름 추출 (없으면 빈 문자열)
        user_info = trainer.get("user")
        trainer_name = user_info.get("name") if user_info else ""

        # 1️⃣ MBTI 궁합 점수 및 활동량 점수 계산
        mbti_score = get_mbti_match_score(pet.get("pet_mbti"), trainer_mbti)
        activity_match = calculate_activity_match(pet.get("pet_mbti"), trainer_mbti)

        # experience와 rating이 None인 경우 기본값 할당
        experience_value = int(trainer.get("experience")) if trainer.get("experience") is not None else 0
        rating_value = float(trainer.get("rating")) if trainer.get("rating") is not None else 0.0

        # 2️⃣ 예측 입력 데이터 구성 (원-핫 인코딩 전)
        input_data = {
            "mbti_score": [mbti_score],
            "activity_match": [activity_match],
            "experience": [experience_value]
        }

        # 3️⃣ pet_mbti 및 trainer_mbti에 대해 원-핫 인코딩 적용
        for col in train_columns:
            if col.startswith("pet_mbti_"):
                input_data[col] = [1 if col == f"pet_mbti_{pet.get('pet_mbti')}" else 0]
            elif col.startswith("trainer_mbti_"):
                input_data[col] = [1 if col == f"trainer_mbti_{trainer_mbti}" else 0]

        # 4️⃣ DataFrame 변환 후, 학습시 사용한 컬럼 순서에 맞게 정렬
        input_df = pd.DataFrame(input_data)
        input_df = input_df.reindex(columns=train_columns, fill_value=0)
        input_df["experience"] = input_df["experience"].astype(int)

        # 5️⃣ XGBoost 예측 실행
        dmatrix = xgb.DMatrix(input_df)
        score = model.predict(dmatrix)[0]

        recommendations.append({
            "id": trainer.get("id"),
            "name": trainer_name,
            "trainer_mbti": trainer_mbti,
            "experience": experience_value,
            "rating": rating_value,
            "score": score
        })

    # 6️⃣ 예측 점수를 기준으로 내림차순 정렬 후 상위 4명 추천
    recommendations = sorted(recommendations, key=lambda x: x["score"], reverse=True)[:4]
    return recommendations
