"use client"
import "./Walk2.css"

export default function Walk2() {
  return (
    <div className="walk2-container">
      {/* Header and Input Section */}
      <div className="white-section">
        <div className="header">
          <button className="back-button">←</button>
          <h1 className="title">
            어디로
            <br />
            방문하면 될까요?
          </h1>
        </div>
        <div className="input-group">
          <label htmlFor="address" className="input-label">
            주소
          </label>
          <input type="text" id="address" className="input-field" placeholder="주소를 입력해주세요" />

          <label htmlFor="contact" className="input-label">
            연락처
          </label>
          <input type="text" id="contact" className="input-field" placeholder="연락처를 입력해주세요" />
        </div>
      </div>

      {/* Q&A Section */}
      <div className="qa-section">
        <h2 className="qa-title">Q. 예약이 불가능한 주소라고 떠요</h2>
        <p className="qa-content">
          현재 고객님께서 계신 지역은 아쉽게도 아직 서비스
          <br />
          가능 지역에 포함되지 않아 서비스 이용이 어렵습니다.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="bottom-content">
          <p className="confirm-text">
            방문 주소를
            <br />
            확인해주세요
          </p>
          <button className="next-button">다음으로</button>
        </div>
      </div>
    </div>
  )
}