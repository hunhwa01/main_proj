"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Last.css"

function Last() {
  const [showYears, setShowYears] = useState(false)
  const [selectedYear, setSelectedYear] = useState(2025)
  const years = [2025, 2024, 2023]
  const [reservations, setReservations] = useState({})
  const navigate = useNavigate()

  // 예약 데이터를 가져오는 함수
  const fetchReservations = () => {
    // 예시 데이터
    return {
      2024: [
        {
          id: 1,
          date: "2024-05-15",
          time: "12:00",
          trainer: "김트레이너",
          hasReview: false,
        },
        {
          id: 2,
          date: "2024-08-22",
          time: "15:30",
          trainer: "이트레이너",
          hasReview: true,
        },
      ],
      2023: [
        {
          id: 3,
          date: "2023-11-30",
          time: "14:00",
          trainer: "박트레이너",
          hasReview: false,
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

  const handleReviewClick = (reservationId) => {
    navigate(`/LastReviewPage?id=${reservationId}`)
  }

  const handleMeetAgainClick = (reservationId) => {
    // 여기에 다시만나기 로직 추가
    console.log(`다시만나기 클릭: ${reservationId}`)
  }

  const renderReservationCards = () => {
    const yearReservations = reservations[selectedYear] || []
    if (yearReservations.length > 0) {
      // 날짜를 기준으로 내림차순 정렬
      const sortedReservations = [...yearReservations].sort((a, b) => new Date(b.date) - new Date(a.date))
      return (
        <div className="reservation-list">
          {sortedReservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-time">{reservation.date}</div>
              <div className="trainer-info">
                <div className="trainer-profile">
                  <div className="trainer-avatar">
                    <img
                      src={`/trainerprofile/${reservation.trainer.replace("트레이너", "")}.jpg`}
                      alt={`${reservation.trainer} profile`}
                    />
                  </div>
                  <div className="trainer-name">{reservation.trainer}님</div>
                </div>
                {!reservation.hasReview ? (
                  <button className="action-button review-button" onClick={() => handleReviewClick(reservation.id)}>
                    후기 작성
                  </button>
                ) : (
                  <button
                    className="action-button meet-again-button"
                    onClick={() => handleMeetAgainClick(reservation.id)}
                  >
                    다시만나기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className="last-chat-message">
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
    <div className="last-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header className="last-header">
        <div className="last-header-content">
          <h1>예약내역</h1>
          <div className="last-header-buttons">
            <Link
              to="/ReservationPage"
              className="last-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              진행 예약
            </Link>
            <button className="last-header-button active" style={{ background: "none", border: "none" }}>
              지난 예약
            </button>
          </div>
        </div>
      </header>
      <div style={{ position: "relative" }}>
        <button className="last-year-button" onClick={() => setShowYears(!showYears)}>
          <img src="/lasticons/calendar.png" alt="Calendar" className="last-year-button-icon" />
          {selectedYear}년 예약
        </button>
        {showYears && (
          <div className="year-dropdown">
            {years.map((year) => (
              <div key={year} className="year-option" onClick={() => handleYearClick(year)}>
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

export default Last

