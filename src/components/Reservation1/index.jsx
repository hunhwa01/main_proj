"use client"

import { Link } from "react-router-dom"
import "./Reservation1.css"

function Reservation1() {
  return (
    <div className="reservation1-container">
      <header className="reservation1-header">
        <div className="reservation1-header-content">
          <h1>예약내역</h1>
          <div className="reservation1-header-buttons">
            <button className="reservation1-header-button active">진행 예약</button>
            <Link
              to="/LastPage"
              className="reservation1-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>

      <div className="reservation1-match-content">
        <div className="reservation1-match-card">
          <div className="reservation1-match-date">0000년 00월 00일</div>
          <div className="reservation1-match-status">매칭중...</div>
          <div className="reservation1-match-players">
            <div className="reservation1-player">
              <div className="reservation1-player-avatar">
                <img src="/dogprofile/dog.jpg" alt="강아지 사진" className="reservation1-avatar-image" />
              </div>
              <div className="reservation1-player-name">이름</div>
              <div className="reservation1-player-detail">멍BTI</div>
            </div>
            <div className="reservation1-match-image">
              <img src="/reservationicons/matching.png" alt="Matching" className="reservation1-match-icon" />
            </div>
            <div className="reservation1-trainer">
              <div className="reservation1-trainer-avatar">
                <div className="reservation1-question-mark">?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation1

