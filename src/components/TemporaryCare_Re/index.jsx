"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate를 올바르게 가져옵니다.
import DogCard from "../Dog";
import "./TemporaryCare_Re.css";


const TemporaryCare_Re = () => {
  const navigate = useNavigate();
  // 강아지 데이터를 저장할 state
  const [dogs, setDogs] = useState([]);

  // JSON 파일 불러오기
  useEffect(() => {
    fetch("data/animal_data.json") // public 폴더의 animal_data.json을 불러옴
      .then((response) => response.json())
      .then((data) => setDogs(data))
      .catch((error) => console.error("JSON 데이터를 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <div className="TemporaryCare_Re-temporary-care">
      <header className="TemporaryCare_Re-header">
        <div className="TemporaryCare_Re-header-content">
          <button className="TemporaryCare_Re-back-button">
            <img
              src="/icons/back.png"
              alt="뒤로가기"
              className="TemporaryCare_Re-back-icon"
              onClick={() => navigate("/TemporaryCarePage")}
            />
          </button>
          <div className="TemporaryCare_Re-title-description">
            <h1>맞춤추천</h1>
            <p className="TemporaryCare_Re-description">
              당신의 마음과 맞는 강아지를 찾아보세요
              <br />
              특별한 인연을 맺고, 함께 행복한 추억을 만들어가요!
            </p>
          </div>
        </div>
      </header>

      <main className="TemporaryCare_Re-main-content">
        <div className="TemporaryCare_Re-dogs-grid">
        {dogs.length > 0 ? (
            dogs.map((dog, index) => <DogCard key={index} dog={dog} />)
          ) : (
            <p>강아지 데이터를 불러오는 중...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TemporaryCare_Re;
