"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LastReview.css"

function LastReview() {
  const [rating, setRating] = useState("")
  const navigate = useNavigate()

  // 예시 트레이너 데이터https://github.com/ShinHyoJinn/MainProj/commits/main/
  const trainerData = {
    name: "김철수",
  }

  const handleBackClick = () => {
    window.history.back()
  }

  const handleRatingChange = (e) => {
    const value = e.target.value
    if (/^[0-5](\.[0-9])?$/.test(value) || value === "") {
      setRating(value)
    }
  }

  const handleSubmitReview = () => {
    navigate("/LastPage")
  }

  return (
    <div className="lastreview-container" style={{ height: "100%", overflowY: "auto" }}>
      <header className="lastreview-header">
        <div className="lastreview-header-content">
          <img src="/icons/back.png" alt="뒤로가기" className="lastreview-back-icon" onClick={handleBackClick} />
          <h1>트레이너 후기</h1>
        </div>
      </header>

      <div className="lastreview-scrollable-container">
        <div className="lastreview-review-card">
          <div className="lastreview-trainer-profile">
            <div className="lastreview-trainer-image">
              <img src={`/trainerprofile/${trainerData.name}.jpg`} alt={`${trainerData.name} 트레이너 프로필`} />
            </div>
            <div className="lastreview-trainer-info">
              <span className="lastreview-trainer-name">{trainerData.name} 트레이너</span>
              <div className="lastreview-rating-input">
                <label htmlFor="rating" className="lastreview-rating-label">
                  평점 :{" "}
                </label>
                <input
                  type="number"
                  id="rating"
                  className="lastreview-rating-number"
                  value={rating}
                  onChange={handleRatingChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          <div className="lastreview-review-input-container">
            <textarea
              className="lastreview-review-textarea"
              placeholder="다른 고객들이 참고할 수 있도록 트레이너님에 대한 경험을 적어주세요"
            />
          </div>
        </div>

        <button className="lastreview-submit-review-btn" onClick={handleSubmitReview}>
          후기 작성하기
        </button>
      </div>
    </div>
  )
}

export default LastReview

