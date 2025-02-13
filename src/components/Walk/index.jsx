"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Walk.css";

const walkOptions = [
  { duration: 30, price: 18000 },
  { duration: 60, price: 27000 },
  { duration: 120, price: 40500 },
];

export default function Walk() {
  const [selectedDuration, setSelectedDuration] = useState(30); // ✅ 기본값 30분 선택
  const [wantToday, setWantToday] = useState(false);
  const navigate = useNavigate();

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="Walk-container">
      <div className="Walk-top-section">
        <button
          className="Walk-back-button"
          onClick={() => navigate("/")}
        >
          <img
            src="/icons/back.png"
            alt="뒤로가기"
            className="Walk-back-icon"
          />
        </button>

        <div className="Walk-info-section">
          <div className="Walk-info-box-container">
            <div className="Walk-info-box">
              <p>GPS 경로로 함께</p>
              <p>산책 로드 확인</p>
            </div>
            <div className="Walk-info-box">
              <p>산책이 종료되면</p>
              <p>산책 카드 도착</p>
            </div>
          </div>
          <div className="Walk-divider"></div>
        </div>
      </div>

      <div className="Walk-time-section">
        <div className="Walk-time-header">
          <h2>산책 시간</h2>
          <span
            className="Walk-today-label"
            onClick={() => navigate("/PricePage")}
            style={{
              cursor: "pointer",
              color: "#006400",
              textDecoration: "underline",
            }}
          >
            요금표
          </span>
        </div>

        <div className="Walk-time-options">
          {walkOptions.map(({ duration, price }) => (
            <div key={duration} className="Walk-time-option-wrapper">
              <button
                className={`Walk-time-option ${selectedDuration === duration ? "selected" : ""}`}
                onClick={() => handleDurationSelect(duration)}
              >
                {duration}분
              </button>
              <span className={`Walk-price ${selectedDuration === duration ? "selected-price" : ""}`}>
                {price.toLocaleString()}원~
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="Walk-bottom-section">
        <label className="Walk-today-option">
          <div className="Walk-checkbox-wrapper">
            <input
              type="checkbox"
              checked={wantToday}
              onChange={(e) => setWantToday(e.target.checked)}
            />
            <span className="Walk-checkbox-custom"></span>
          </div>
          <span className="Walk-today-text">오늘 바로 방문 원해요</span>
          <span className="Walk-additional-price">+5,000원</span>
        </label>

        <button
          className="Walk-next-button"
          onClick={() => navigate("/Walk2Page")}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
