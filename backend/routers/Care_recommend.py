from fastapi import APIRouter, Query
import json
import os
from collections import Counter  # Counter 추가

router = APIRouter()

# ✅ JSON 파일 로드
json_file_path = os.path.abspath("C:/Users/USER/Desktop/proh/main_proj/backend/data/animal_data_updated.json")

if not os.path.exists(json_file_path):
    raise FileNotFoundError(f"JSON 파일을 찾을 수 없습니다: {json_file_path}")

with open(json_file_path, "r", encoding="utf-8") as file:
    dogs_data = json.load(file)

# ✅ 추천 API (id 없이 강아지 정보 전체 반환)
@router.get("/api/recommend_dogs")
def recommend_dogs(tags: str = Query(..., description="사용자가 선택한 태그 목록")):
    user_tags = tags.split(",")  
    user_tags = [tag.strip().replace("'", "").replace(" ", "") for tag in user_tags]  # ✅ 공백 및 따옴표 제거

    # ✅ 터미널에서 사용자가 선택한 태그 확인
    print(f"\n🔹 사용자가 선택한 태그: {user_tags}\n")

    recommended_dogs = []
    matching_tags_list = []  # 일치하는 태그들을 저장할 리스트

    for dog in dogs_data:
        dog_tags = [tag.strip().replace("'", "").replace(" ", "") for tag in dog["태그"]]  
        matching_tags = list(set(user_tags) & set(dog_tags))  # 일치하는 태그들
        match_count = len(matching_tags)  # ✅ 태그 매칭 개수 확인

        if match_count > 0:
            dog_data = {**dog, "match_count": match_count, "matching_tags": matching_tags}
            recommended_dogs.append(dog_data)
            matching_tags_list.extend(matching_tags)  # 일치하는 태그들을 리스트에 추가

    recommended_dogs.sort(key=lambda x: x["match_count"], reverse=True)

    # ✅ 가장 많이 겹치는 태그 3개 계산
    tag_counter = Counter(matching_tags_list)
    top_3_tags = tag_counter.most_common(3)

    # ✅ 터미널에서 추천된 강아지 확인
    print(f"✅ 추천된 강아지 리스트 ({len(recommended_dogs)}마리):")
    for dog in recommended_dogs:
        print(f"이름: {dog['이름']}, 일치 태그 개수: {dog['match_count']}")
        print(f"일치하는 태그: {dog['matching_tags']}\n")

    # ✅ 가장 많이 겹치는 태그 3개 출력
    print("\n🔹 가장 많이 겹치는 태그 TOP 3:")
    for tag, count in top_3_tags:
        print(f"태그: {tag}, 빈도: {count}회")
    print("\n")

    return {
    "recommended_dogs": recommended_dogs,
    "top_3_tags": top_3_tags
    }