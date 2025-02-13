"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Price.css";

const priceData = {
  30: {
    small: 18000,
    large: 23500,
    title: "산책 30분",
  },
  60: {
    small: 27000,
    large: 32500,
    title: "산책 60분",
  },
  120: {
    small: 41500,
    large: 46000,
    title: "산책 120분",
  },
};

export default function Price() {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const navigate = useNavigate();

  return (
    <div className="Price-container">
      {/* 헤더 섹션 */}
      <div className="Price-header">
        <button
          className="Price-back-button"
          onClick={() => navigate("/WalkPage")}
        >
          <img
            src="/icons/back.png"
            alt="뒤로가기"
            className="Price-back-button-image"
          />
        </button>
        <h1 className="Price-title">이용 요금</h1>
      </div>

      {/* 시간 선택 버튼 */}
      <div className="Price-duration-buttons">
        {Object.keys(priceData).map((duration) => (
          <button
            key={duration}
            className={`Price-duration-button ${
              selectedDuration === Number(duration) ? "selected" : ""
            }`}
            onClick={() => setSelectedDuration(Number(duration))}
          >
            {duration}분
          </button>
        ))}
      </div>

      {/* 가격 정보 섹션 */}
      <div className="Price-info-section">
        <h2 className="Price-info-title">{priceData[selectedDuration].title}</h2>

        <div className="Price-price-row">
          <div className="Price-dog-type">
            <img
              src="/placeholder.svg"
              alt="소형견"
              className="Price-dog-icon"
              width={24}
              height={24}
            />
            <span>소형견</span>
            <span className="Price-size-desc">15키로 미만</span>
          </div>
          <span className="Price-amount">
            {priceData[selectedDuration].small.toLocaleString()}원
          </span>
        </div>

        <div className="Price-price-row">
          <div className="Price-dog-type">
            <img
              src="/placeholder.svg"
              alt="대형견"
              className="Price-dog-icon"
              width={24}
              height={24}
            />
            <span>대형견</span>
            <span className="Price-size-desc">15키로 이상</span>
          </div>
          <span className="Price-amount">
            {priceData[selectedDuration].large.toLocaleString()}원
          </span>
        </div>

        <div className="Price-notice">
          <p>
            • 산책 30분은 가벼운 산책이 필요한 소형견에게 적합합니다.
          </p>
          <p>
            • 산책이 시작된 후에도, 추가 시간이 필요한 경우 시간 연장(30분/50분) 요청이 가능합니다.
          </p>
        </div>

        <div className="Price-additional-service">
          <h3 className="Price-section-title">추가 서비스</h3>

          <div className="Price-service-row">
            <div className="Price-service-info">
              <img
                src="/placeholder.svg"
                alt="시간"
                className="Price-clock-icon"
                width={24}
                height={24}
              />
              <span>시간 연장(30분)</span>
            </div>
            <span className="Price-amount">9,000원</span>
          </div>

          <div className="Price-service-row">
            <div className="Price-service-info">
              <img
                src="/placeholder.svg"
                alt="시간"
                className="Price-clock-icon"
                width={24}
                height={24}
              />
              <span>시간 연장(60분)</span>
            </div>
            <span className="Price-amount">13,500원</span>
          </div>

          <p className="Price-service-notice">
            • 시간 연장 서비스는, 산책 진행중에만 가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
