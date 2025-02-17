import pandas as pd

train_columns = pd.read_csv(
    "C:/Users/USER/Desktop/whoruGit/mainproj/backend/data/mbti_matching_data_large.csv",
    header=None
)

print(f"🚀 1. `train_columns` Type (Before squeeze): {type(train_columns)}")

train_columns = train_columns.squeeze("columns")  # DataFrame -> Series 변환
print(f"✅ 2. `train_columns` Type (After squeeze): {type(train_columns)}")

train_columns = train_columns.tolist()  # Series -> 리스트 변환
print(f"🔥 3. `train_columns` (First 5 values): {train_columns[:5]}")

