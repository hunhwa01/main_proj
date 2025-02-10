"use client"

import { useState } from "react"
import "./ReservationChoice.css"

function ReservationChoice() {
  const [activeTab, setActiveTab] = useState("now")

  return (
    <div className="reservationchoice-container">
      <header className="reservationchoice-header">
        <div className="reservationchoice-header-content">
          <h1>예약내역</h1>
          <div className="reservationchoice-header-buttons">
            <button
              className={`reservationchoice-header-button ${activeTab === "now" ? "active" : ""}`}
              onClick={() => setActiveTab("now")}
            >
              진행 예약
            </button>
            <button
              className={`reservationchoice-header-button ${activeTab === "last" ? "active" : ""}`}
              onClick={() => setActiveTab("last")}
            >
              지난 예약
            </button>
          </div>
        </div>
      </header>

      {activeTab === "now" && (
        <div className="reservationchoice-match-content">
          <div className="reservationchoice-match-card">
            <div className="reservationchoice-match-date">0000년 00월 00일</div>
            <div className="reservationchoice-match-status">매칭완료!</div>
            <div className="reservationchoice-match-players">
              <div className="reservationchoice-player">
                <div className="reservationchoice-player-avatar">
                  <img src="/dogprofile/마요.jpg" alt="강아지 사진" className="reservationchoice-avatar-image" />
                </div>
                <div className="reservationchoice-player-name">이름</div>
                <div className="reservationchoice-player-detail">멍BTI</div>
              </div>
              <div className="reservationchoice-match-image">
                <img src="/reservationmatchicons/matching.png" alt="Matching" className="reservationchoice-match-icon" />
              </div>
              <div className="reservationchoice-player">
                <div className="reservationchoice-player-avatar">
                  <img src="/trainerprofile/트레이너.jpg" alt="트레이너 사진" className="reservationchoice-avatar-image" />
                </div>
                <div className="reservationchoice-player-name">이름</div>
                <div className="reservationchoice-player-detail">MBTI</div>
              </div>
            </div>
          </div>
          <div className="reservationchoice-match-confirmation">
            <p className="reservationchoice-match-question">매칭하시겠습니까?</p>
            <div className="reservationchoice-match-buttons">
              <a href="/LivePage" className="reservationchoice-match-button-link">
                <button className="reservationchoice-match-button reservationchoice-match-button-yes">예</button>
              </a>
              <a href="/ReservationMatchPage" className="reservationchoice-match-button-link">
                <button className="reservationchoice-match-button reservationchoice-match-button-no">아니오</button>
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "last" && <div className="reservationmatch-chat-message">지난예약 페이지 아직 미완성</div>}
    </div>
  )
}

export default ReservationChoice