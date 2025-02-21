"use client"

import { useState } from "react"
import "./Dog.css"

export default function DogCard({ dog }) {
  const [isLiked, setIsLiked] = useState(false)

  const handlePawClick = (e) => {
    e.stopPropagation() // 이벤트 버블링 방지
    setIsLiked(!isLiked)
  }

  const handleCardClick = () => {
    if (dog.URL) {
      window.open(dog.URL, "_blank")
    }
  }

  return (
    <div className="dog-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="dog-image">
        <img
          src={dog["이미지 URL"].split(";")[0] || "/placeholder.svg"}
          alt={`${dog["이름"]}의 프로필`}
          className="profile-image"
        />
      </div>
      <div className="dog-info">
        <h2 className="dog-name">{dog["이름"]}</h2>
        <p className="dog-details">
          {dog["몸무게"]} · {dog["성별"]}
        </p>
        <p className="dog-status">{dog["현 상황"]}</p>
      </div>
      <button
        className={`paw-button ${isLiked ? "paw-button-active" : ""}`}
        onClick={handlePawClick}
        aria-label="좋아요"
      >
        <img src="/temporarycareicons/paw.png" alt="발바닥 아이콘" width="24" height="24" />
      </button>
    </div>
  )
}