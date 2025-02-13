"use client"

import { useNavigate } from "react-router-dom"
import "./Walk4.css"

export default function Walk4() {
  const navigate = useNavigate()

  return (
    <div className="Walk4-container">
      <div className="Walk4-header">
        <button className="Walk4-back-button" onClick={() => navigate("/Walk3Page")}>
          <img src="/icons/back.png" alt="뒤로가기" className="Walk4-back-icon" />
        </button>
        <h1 className="Walk4-title">
          트레이너를
          <br />
          선택하시겠습니까?
        </h1>
      </div>

      <div className="Walk4-bottom-section">
        <button className="Walk4-next-button" onClick={() => navigate("/Walk5Page")}>
          다음으로
        </button>
      </div>
    </div>
  )
}
