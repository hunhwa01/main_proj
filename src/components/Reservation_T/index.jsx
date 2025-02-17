"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Reservation_T.css"

function Reservation_T() {
  const [reservationlist, setReservationlist] = useState([
    {
      id: "1",
      date: "2023년 06월 15일",
      dogName: "멍멍이",
      DBTI: "ISFP",
      trainerName: "김트레이너",
      trainerMBTI: "ENFJ",
    },
    {
      id: "2",
      date: "2023년 06월 16일",
      dogName: "왈왈이",
      DBTI: "ENTP",
      trainerName: "이트레이너",
      trainerMBTI: "ISFJ",
    },
  ])
  const navigate = useNavigate()

  const handleDelete = (id) => {
    setReservationlist((prevList) => prevList.filter((reservation) => reservation.id !== id))
  }

  return (
    <div className="reservation-t-container">
      <header className="reservation-t-header">
        <div className="reservation-t-header-content">
          <h1>예약내역</h1>
          <div className="reservation-t-header-buttons">
            <button className="reservation-t-header-button active">진행 예약</button>
            <Link
              to="/Last_TPage"
              className="reservation-t-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>
      <main className="reservation-t-main">
        {reservationlist.length > 0 ? (
          <div className="reservation-t-match-content">
            {reservationlist.map((reservation) => (
              <div key={reservation.id} className="reservation-t-match-card">
                <div className="reservation-t-match-date">{reservation.date}</div>
                <div className="reservation-t-match-status">매칭완료!</div>
                <div className="reservation-t-match-players">
                  <div className="reservation-t-player">
                    <div className="reservation-t-player-avatar">
                      <img src="/dogprofile/dog.jpg" alt="강아지 사진" className="reservation-t-avatar-image" />
                    </div>
                    <div className="reservation-t-player-name">{reservation.dogName}</div>
                    <div className="reservation-t-player-detail">{reservation.DBTI}</div>
                  </div>
                  <div className="reservation-t-match-image">
                    <img src="/reservationicons/matching.png" alt="Matching" className="reservation-t-match-icon" />
                  </div>
                  <div className="reservation-t-player">
                    <div className="reservation-t-player-avatar">
                      <img
                        src="/trainerprofile/trainer.jpg"
                        alt="트레이너 사진"
                        className="reservation-t-avatar-image"
                      />
                    </div>
                    <div className="reservation-t-player-name">{reservation.trainerName}</div>
                    <div className="reservation-t-player-detail">{reservation.trainerMBTI}</div>
                  </div>
                </div>
                <div className="reservation-t-match-confirmation">
                  <p className="reservation-t-match-question">매칭하시겠습니까?</p>
                  <div className="reservation-t-match-buttons">
                    <button
                      onClick={() => navigate("/Live_TPage")}
                      className="reservation-t-match-button reservation-t-match-button-yes"
                    >
                      예
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="reservation-t-match-button reservation-t-match-button-no"
                    >
                      아니오
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="reservation-t-chat-message">
            <div>아직 예약이 없습니다.</div>
          </div>
        )}
      </main>
      <div className="reservation-t-bottom-space"></div>
    </div>
  )
}

export default Reservation_T

