"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Review_T.css"

function Review_T() {
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
          hasReview: true,
          dog: "멍멍이",
          rating: 4.5,
          review: "산책하는 방법을 자세히 알려주셔서 감사합니다. 다음에도 함께 산책하고 싶어요!"
        },
        {
          id: 2,
          date: "2024-08-22",
          time: "15:30",
          trainer: "이트레이너",
          hasReview: true,
          dog: "바둑이",
          rating: 4.1,
          review: "바둑이가 처음에는 낯을 가렸는데 트레이너님이 잘 달래주셔서 즐겁게 산책했어요."
        },
      ],
      2023: [
        {
          id: 3,
          date: "2023-11-30",
          time: "14:00",
          trainer: "박트레이너",
          hasReview: true,
          dog: "초코",
          rating: 4.8,
          review: "산책하면서 배변 교육하는 방법도 알려주시고 좋은 시간이었습니다!"
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

  const handleBackClick = () => {
    navigate("/Profile_TPage");
  };

  const renderReservationCards = () => {
    const yearReservations = reservations[selectedYear] || []
    if (yearReservations.length > 0) {
      const sortedReservations = [...yearReservations].sort((a, b) => new Date(b.date) - new Date(a.date))
      return (
        <div className="reservation-list">
          {sortedReservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-time">{reservation.date}</div>
              <div className="dog-info">
                <div className="dog-profile">
                  <div className="dog-avatar">
                    <img
                      src={`/dogprofile/${reservation.dog.replace("강아지", "")}.jpg`}
                      alt={`${reservation.dog} profile`}
                    />
                  </div>
                  <div className="dog-details">
                    <div className="dog-name">{reservation.dog}님</div>
                    <div className="dog-rating">평점: {reservation.rating}</div>
                  </div>
                </div>
              </div>
              <div className="review-box">
                {reservation.review}
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className="review-t-chat-message">
          <div>
            {selectedYear}년의 리뷰가 없어요
            <br />
            <br />
            다른 연도를 선택해보세요
          </div>
        </div>
      )
    }
  }

  return (
    <div className="review-t-container" style={{height: '100%', overflowY: 'auto'}}>
      <header className="review-t-header">
        <div className="review-t-header-content">
          <img
            src="/icons/back.png"
            alt="뒤로가기"
            className="review-t-back-icon"
            onClick={handleBackClick}
          />
          <h1>내 후기들</h1>
        </div>
      </header>
      <div style={{ position: "relative" }}>
        <button className="review-t-year-button" onClick={() => setShowYears(!showYears)}>
          <img src="/lasticons/calendar.png" alt="Calendar" className="review-t-year-button-icon" />
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

export default Review_T