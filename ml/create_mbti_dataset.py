import numpy as np
import pandas as pd
import random
import os

# MBTI 유형 리스트
mbti_types = ["ESTJ", "ENTJ", "ESFJ", "ENFJ",
              "ISTJ", "ISFJ", "INTJ", "INFJ",
              "ESTP", "ENTP", "ESFP", "ENFP",
              "ISTP", "ISFP", "INTP", "INFP"]

# 10,000개 데이터 생성
large_data = []
for _ in range(10000):
    pet_mbti = random.choice(mbti_types)
    trainer_mbti = random.choice(mbti_types)
    mbti_score = random.uniform(0.5, 0.9)  # (0.5~0.9)
    activity_match = random.choice([-5, 0, 5, 10])  # 활동량 매칭 점수
    experience = random.randint(1, 10)  
    
    # 새로운 total_score
    total_score = (mbti_score * 110) + (activity_match * 2) + (experience * 4) + np.random.normal(0, 6)
    total_score = min(max(total_score, 0), 95)

    # 데이터 추가
    large_data.append([pet_mbti, trainer_mbti, mbti_score, activity_match, experience, total_score])

# DataFrame 생성
df_large = pd.DataFrame(large_data, columns=["pet_mbti", "trainer_mbti", "mbti_score", "activity_match", "experience", "total_score"])

# 저장할 폴더 경로 설정
data_folder = "data"
os.makedirs(data_folder, exist_ok=True)  # 폴더가 없으면 생성
csv_filename = os.path.join(data_folder, "mbti_matching_data_large.csv")

# CSV 파일 저장
df_large.to_csv(csv_filename, index=False)

print(f"'{csv_filename}' 파일 생성됨.")