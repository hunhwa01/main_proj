"use client"

import { Link } from "react-router-dom"
import "./Reservation2.css"

function Reservation2() {
  return (
    <div className="reservation2-container">
      <header className="reservation2-header">
        <div className="reservation2-header-content">
          <h1>예약내역</h1>
          <div className="reservation2-header-buttons">
            <button className="reservation2-header-button active">진행 예약</button>
            <Link
              to="/LastPage"
              className="reservation2-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>

      <div className="reservation2-match-content">
        <div className="reservation2-match-card">
          <div className="reservation2-match-date">0000년 00월 00일</div>
          <div className="reservation2-match-status">매칭완료!</div>
          <div className="reservation2-match-players">
            <div className="reservation2-player">
              <div className="reservation2-player-avatar">
                <img src="/dogprofile/dog.jpg" alt="강아지 사진" className="reservation2-avatar-image" />
              </div>
              <div className="reservation2-player-name">이름</div>
              <div className="reservation2-player-detail">멍BTI</div>
            </div>
            <div className="reservation2-match-image">
              <img src="/reservationicons/matching.png" alt="Matching" className="reservation2-match-icon" />
            </div>
            <div className="reservation2-player">
              <div className="reservation2-player-avatar">
                <img src="/trainerprofile/trainer.jpg" alt="트레이너 사진" className="reservation2-avatar-image" />
              </div>
              <div className="reservation2-player-name">이름</div>
              <div className="reservation2-player-detail">MBTI</div>
            </div>
          </div>
        </div>
        <div className="reservation2-match-confirmation">
          <p className="reservation2-match-question">매칭하시겠습니까?</p>
          <div className="reservation2-match-buttons">
            <Link to="/LivePage" className="reservation2-match-button-link">
              <button className="reservation2-match-button reservation2-match-button-yes">예</button>
            </Link>
            <Link to="/Reservation1Page" className="reservation2-match-button-link">
              <button className="reservation2-match-button reservation2-match-button-no">아니오</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation2

