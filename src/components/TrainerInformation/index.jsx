"use client"

import { useState, useRef } from "react"
import "./TrainerInformation.css"

export default function TrainerInformation() {
  const [name, setName] = useState("")
  const [mbti, setMbti] = useState("")
  const [experience, setExperience] = useState("")

  const nameRef = useRef(null)
  const mbtiRef = useRef(null)
  const experienceRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, mbti, experience })
  }

  const handleInput = (setter) => (e) => {
    const text = e.target.innerText
    setter(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      e.target.blur()
    }
  }

  return (
    <div className="trainerinformation-container">
      <header className="trainerinformation-header">
        <a href="/Profile_TPage" className="trainerinformation-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="trainerinformation-back-icon" />
        </a>

        <div className="trainerinformation-image-container">
          <div className="trainerinformation-image">
            <span className="trainerinformation-text">사진 등록</span>
          </div>
        </div>
      </header>

      <div className="trainerinformation-content">
        <form className="trainerinformation-form" onSubmit={handleSubmit}>
          <h2 className="trainerinformation-form-title">기본 사항</h2>

          <div className="trainerinformation-form-group">
            <label className="trainerinformation-label">이름</label>
            <div
              ref={nameRef}
              className="trainerinformation-form-input"
              contentEditable
              onInput={handleInput(setName)}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{ __html: name }}
            />
          </div>

          <div className="trainerinformation-form-group">
            <label className="trainerinformation-label">MBTI</label>
            <div
              ref={mbtiRef}
              className="trainerinformation-form-input"
              contentEditable
              onInput={handleInput(setMbti)}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{ __html: mbti }}
            />
          </div>

          <div className="trainerinformation-form-group">
            <label className="trainerinformation-label">경력</label>
            <div
              ref={experienceRef}
              className="trainerinformation-form-input"
              contentEditable
              onInput={handleInput(setExperience)}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{ __html: experience }}
            />
          </div>

          <button type="submit" className="trainerinformation-submit-button">
            등록 완료
          </button>
        </form>
      </div>
    </div>
  )
}

