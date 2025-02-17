"use client"

import { useNavigate } from "react-router-dom"
import "./Intro.css"

export default function Intro() {
  const navigate = useNavigate()

  return (
    <div className="Intro-container">
      <div className="Intro-logo">
        <img src="/icons/intro-bg.png" alt="발바닥" className="Intro-paw-image" />
      </div>
      <div className="Intro-buttons">
        <button className="Intro-button" onClick={() => navigate("/")}>
          둘러보기
        </button>
        <button className="Intro-button" onClick={() => navigate("/LoginPage")}>
          로그인
        </button>
        <button className="Intro-button" onClick={() => navigate("/SignupPage")}>
          회원가입
        </button>
      </div>
    </div>
  )
}

