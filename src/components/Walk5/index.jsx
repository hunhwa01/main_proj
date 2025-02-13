"use client"

import { useNavigate } from "react-router-dom"
import "./Walk5.css"

export default function Walk5() {
  const navigate = useNavigate()

  return (
    <div className="Walk5-container">
      <div className="Walk5-header">
        <button className="Walk5-back-button" onClick={() => navigate("/Walk4Page")}>
          <img src="/icons/back.png" alt="뒤로가기" className="Walk5-back-icon" />
        </button>
        <h1 className="Walk5-title">
          반려동물에 대해
          <br />
          알려주세요
        </h1>
      </div>

      <div className="Walk5-content">
        <div className="Walk5-profile-card">
          <div className="Walk5-profile-image">
            <img src="/placeholder.svg" alt="반려동물 프로필" width={64} height={64} />
          </div>
          <div className="Walk5-profile-info">
            <div className="Walk5-name">이름</div>
            <div className="Walk5-details">소형견 · 개월수 · 성별</div>
          </div>
          <button className="Walk5-edit-button">
            <img src="/placeholder.svg" alt="수정" width={24} height={24} />
          </button>
        </div>

        <div className="Walk5-request-section">
          <h2 className="Walk5-section-title">요청사항</h2>
          <textarea className="Walk5-request-input" placeholder="요청사항을 꼼꼼하게 적어주세요!" rows={6}></textarea>
        </div>
      </div>

      <div className="Walk5-bottom-section">
        <button className="Walk5-next-button" onClick={() => navigate("/NextPage")}>
          다음으로
        </button>
      </div>
    </div>
  )
}
