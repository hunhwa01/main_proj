"use client";

// React와 useState 훅을 가져옵니다.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// CSS 스타일을 가져옵니다.
import "./Walk3.css";

export default function Walk3() {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const isPastDate = (date, month) => {
    const today = new Date(2025, 1, 10); // 2025년 2월 10일을 오늘로 가정
    const checkDate = new Date(2025, month, date);
    return checkDate < today;
  };

  const isToday = (date) => {
    return date === 10; // 2025년 2월 10일을 오늘로 가정
  };

  const calendar = [
    [
      { date: 26, month: 0 },
      { date: 27, month: 0 },
      { date: 28, month: 0 },
      { date: 29, month: 0 },
      { date: 30, month: 0 },
      { date: 31, month: 0 },
      { date: 1, month: 1 },
    ],
    [
      { date: 2, month: 1 },
      { date: 3, month: 1 },
      { date: 4, month: 1 },
      { date: 5, month: 1 },
      { date: 6, month: 1 },
      { date: 7, month: 1 },
      { date: 8, month: 1 },
    ],
    [
      { date: 9, month: 1 },
      { date: 10, month: 1 },
      { date: 11, month: 1 },
      { date: 12, month: 1 },
      { date: 13, month: 1 },
      { date: 14, month: 1 },
      { date: 15, month: 1 },
    ],
    [
      { date: 16, month: 1 },
      { date: 17, month: 1 },
      { date: 18, month: 1 },
      { date: 19, month: 1 },
      { date: 20, month: 1 },
      { date: 21, month: 1 },
      { date: 22, month: 1 },
    ],
    [
      { date: 23, month: 1 },
      { date: 24, month: 1 },
      { date: 25, month: 1 },
      { date: 26, month: 1 },
      { date: 27, month: 1 },
      { date: 28, month: 1 },
      { date: 1, month: 2 },
    ],
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateClick = (date, month) => {
    if (!isPastDate(date, month) && month === 1) {
      setSelectedDate(date === selectedDate ? null : date);
    }
  };

  return (
    <div className="Walk3-container">
      <div className="Walk3-header">
        <button className="Walk3-back-button" onClick={() => navigate("/Walk2Page")}>
          <img
            src="/icons/back.png"
            alt="뒤로가기"
            className="Walk3-back-icon"
          />
        </button>
        <h1 className="Walk3-title">
          방문 날짜를
          <br />
          선택해주세요
        </h1>
      </div>

      <div className="Walk3-calendar-wrapper">
        <div className="Walk3-calendar-section">
          <div className="Walk3-month-selector">
            <button className="Walk3-month-arrow">‹</button>
            <span className="Walk3-month-text">2025년 2월</span>
            <button className="Walk3-month-arrow">›</button>
          </div>

          <div className="Walk3-calendar">
            <div className="Walk3-weekdays">
              {weekDays.map((day) => (
                <div key={day} className="Walk3-weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="Walk3-dates">
              {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="Walk3-week">
                  {week.map(({ date, month }) => (
                    <button
                      key={`${weekIndex}-${date}-${month}`}
                      className={`Walk3-date ${isPastDate(date, month) ? "Walk3-past" : ""} ${
                        selectedDate === date && month === 1 ? "Walk3-selected" : ""
                      } ${isToday(date) ? "Walk3-today" : ""} ${
                        month !== 1 ? "Walk3-other-month" : ""
                      }`}
                      onClick={() => handleDateClick(date, month)}
                      disabled={isPastDate(date, month) || month !== 1}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="Walk3-bottom-section">
        <div className="Walk3-bottom-content">
          <p className="Walk3-confirm-text">
            방문 날짜를
            <br />
            확인해주세요
          </p>
          <button
            className="Walk3-next-button"
            onClick={() => navigate("/Walk4Page")}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}