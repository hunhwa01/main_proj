import pandas as pd
import numpy as np
import joblib
import os
import psutil
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# 1. CSV 데이터 불러오기
df = pd.read_csv("C:/Users/USER/Desktop/whoruGit/mainproj/backend/data/mbti_matching_data_large.csv")

# 2. 범주형 데이터(MBTI) 원-핫 인코딩
df = pd.get_dummies(df, columns=["pet_mbti", "trainer_mbti"])

# 3. 학습할 때 사용한 컬럼 저장
train_columns = df.drop(columns=["total_score"]).columns
pd.Series(train_columns).to_csv("ml/xgboost_features.csv", index=False)

# 4. Train/Test 데이터 분리
X = df[train_columns]
y = df["total_score"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, shuffle=True)

# 5. XGBoost 모델 학습
xgb_model = XGBRegressor(n_estimators=50, learning_rate=0.08, max_depth=3, random_state=42)
xgb_model.fit(X_train, y_train)

# 6. 평가
y_pred = xgb_model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)  
print(f"(평균 절대 오차): {mae:.2f}")
print(f"(정확도 개념): {r2:.4f}")

# 7. 모델 저장
xgb_model.save_model("ml/xgboost_mbti.json")
print("✅ 모델 저장 완료!")
