"use client";

import { useNavigate } from "react-router-dom"; // useNavigate를 올바르게 가져옵니다.
import DogCard from "../Dog";
import "./TemporaryCare.css";
import { dogs } from "../../app/data";

const TemporaryCare = () => {
  const navigate = useNavigate();

  return (
    <div className="TemporaryCare-temporary-care">
      <header className="TemporaryCare-header">
        <div className="TemporaryCare-header-content">
          <button 
            className="TemporaryCare-back-button"
            onClick={() => navigate("/")}
          >
            <img 
              src="/icons/back.png" 
              alt="뒤로가기" 
              className="TemporaryCare-back-icon" 
            />
          </button>
          <div className="TemporaryCare-title-description">
            <h1>임시 보호</h1>
            <p className="TemporaryCare-description">
              임시보호를 기다리는 작은 발자국들,
              <br />
              당신의 손길을 기다립니다
            </p>
          </div>
        </div>
      </header>

      <main className="TemporaryCare-main-content">
        <button className="TemporaryCare-matching-button"
          onClick={() => navigate("/TemporaryCare_RePage")}
          >
          당신과 찰떡인 강아지 맞춤추천
        </button>

        <div className="dogs-grid">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemporaryCare;
