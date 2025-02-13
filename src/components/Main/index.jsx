import { useNavigate } from "react-router-dom"
import "./Main.css"
import Weather from "./weather";

function Main() {
  const navigate = useNavigate()

  const handleClick = (item) => {
    switch (item) {
      case "dbti":
        navigate("/DbtiPage")
        break
      case "walk":
        navigate("/WalkPage")
        break
      case "temporarycare":
        navigate("/TemporaryCarePage")
        break
      case "review":
        navigate("/ReviewPage")
        break
      default:
        console.log("Unknown item")
    }
  }

  return (
    <div className="main-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header>
        <h1>
          <img src="/mainicons/logo.png" alt="로고" className="main-logo" />
        </h1>
      </header>

      <main>
        <div className="main-weather-section">
          <Weather city="Seoul" />
        </div>

        <div className="main-mbti-card clickable-card" onClick={() => handleClick("dbti")}>
          <h2>우리 댕댕이의 멍BTI는?!</h2>
        </div>

        <div className="main-info-grid">
          <div className="main-info-card clickable-card" onClick={() => handleClick("walk")}>
            <h3>산책</h3>
            <p>GPS 경로로 함께</p>
            <p>산책 로드 확인</p>
          </div>
          <div className="main-info-card clickable-card" onClick={() => handleClick("temporarycare")}>
            <h3>임시보호</h3>
            <p>유기견에게</p>
            <p>임시 쉼터를</p>
          </div>
        </div>
        <div className="main-review-section clickable-card" onClick={() => handleClick("review")}>
          <h3>후기</h3>
          <div className="main-tags">
            <button className="main-tag">소통 원활성</button>
            <button className="main-tag">청결도</button>
            <button className="main-tag">상황 공유</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Main

