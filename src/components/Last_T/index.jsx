"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Last_T.css"

function Last_T() {
  const [showYears, setShowYears] = useState(false)
  const [selectedYear, setSelectedYear] = useState(2025)
  const years = [2025, 2024, 2023]
  const [reservations, setReservations] = useState({})
  const navigate = useNavigate()

  const fetchReservations = () => {
    return {
      2024: [
        {
          id: 1,
          date: "2024-05-15",
          time: "12:00",
          trainer: "김트레이너",
          hasReview: false,
          dog: "멍멍이"
        },
        {
          id: 2,
          date: "2024-08-22",
          time: "15:30",
          trainer: "이트레이너",
          hasReview: true,
          dog: "바둑이"
        },
      ],
      2023: [
        {
          id: 3,
          date: "2023-11-30",
          time: "14:00",
          trainer: "박트레이너",
          hasReview: false,
          dog: "초코"
        },
      ],
    }
  }

  useEffect(() => {
    const data = fetchReservations()
    setReservations(data)
  }, [])

  const handleYearClick = (year) => {
    setSelectedYear(year)
    setShowYears(false)
  }

  const handleMeetAgainClick = (reservationId) => {
    console.log(`다시만나기 클릭: ${reservationId}`)
  }

  const renderReservationCards = () => {
    const yearReservations = reservations[selectedYear] || []
    if (yearReservations.length > 0) {
      const sortedReservations = [...yearReservations].sort((a, b) => new Date(b.date) - new Date(a.date))
      return (
        <div className="last-t-reservation-list">
          {sortedReservations.map((reservation) => (
            <div key={reservation.id} className="last-t-reservation-card">
              <div className="last-t-reservation-time">{reservation.date}</div>
              <div className="last-t-trainer-info">
                <div className="last-t-trainer-profile">
                  <div className="last-t-trainer-avatar">
                    <img
                      src={`/dogprofile/${reservation.dog.replace("강아지", "")}.jpg`}
                      alt={`${reservation.dog} profile`}
                    />
                  </div>
                  <div className="last-t-trainer-name">{reservation.dog}님</div>
                </div>
                <button
                  className="last-t-action-button last-t-meet-again-button"
                  onClick={() => handleMeetAgainClick(reservation.id)}
                >
                  다시만나기
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className="last-t-chat-message">
          <div>
            {selectedYear}년의 예약이 없어요
            <br />
            <br />
            다른 연도를 선택해보세요
          </div>
        </div>
      )
    }
  }

  return (
    <div className="last-t-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header className="last-t-header">
        <div className="last-t-header-content">
          <h1>예약내역</h1>
          <div className="last-t-header-buttons">
            <Link
              to="/Reservation_TPage"
              className="last-t-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              진행 예약
            </Link>
            <button className="last-t-header-button active" style={{ background: "none", border: "none" }}>
              지난 예약
            </button>
          </div>
        </div>
      </header>
      <div style={{ position: "relative" }}>
        <button className="last-t-year-button" onClick={() => setShowYears(!showYears)}>
          <img src="/lasticons/calendar.png" alt="Calendar" className="last-t-year-button-icon" />
          {selectedYear}년 예약
        </button>
        {showYears && (
          <div className="last-t-year-dropdown">
            {years.map((year) => (
              <div key={year} className="last-t-year-option" onClick={() => handleYearClick(year)}>
                {year}년
              </div>
            ))}
          </div>
        )}
      </div>
      {renderReservationCards()}
    </div>
  )
}

export default Last_T