import React from "react"
import { Link } from "react-router-dom"
import "./Reservation.css"

function Reservation() {
  return (
    <div className="reservation-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      {/* 헤더 */}
      <header className="reservation-header">
        <div className="reservation-header-content">
          <h1>예약내역</h1>
          <div className="reservation-header-buttons">
            <button className="reservation-header-button active">
              진행 예약
            </button>
            <Link 
              to="/LastPage" 
              className="reservation-header-button"
              style={{ background: 'none', border: 'none', textDecoration: 'none' }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>
      {/* 메인 컨텐츠 */}
      <div className="reservation-chat-message">
        <div>아직 예약이 없습니다.</div>
        <Link to="/Reservation1Page" className="reservation-match-button">
          산책예약
        </Link>
      </div>
    </div>
  )
}

export default Reservation