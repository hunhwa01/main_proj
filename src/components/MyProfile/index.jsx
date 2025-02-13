import { useNavigate } from "react-router-dom"
import "./MyProfile.css"

function MyProfile() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/ProfilePage")
  }

  return (
    <div className="myprofile-container" style={{ height: "100%", overflowY: "auto" }}>
      {/* 헤더 (고정) - 변경 없음 */}
      <header className="myprofile-header">
        <div className="myprofile-header-content">
          <img src="/icons/back.png" alt="뒤로가기" className="myprofile-back-icon" onClick={handleBackClick} />
          <div className="myprofile-title-container">
            <h1>
              사용자아이디님,
              <br />
              안녕하세요!
            </h1>
            <img src="/dogprofile/dog.jpg" alt="프로필 아바타" className="myprofile-avatar-icon" />
          </div>
        </div>
      </header>

      {/* 스크롤 가능한 컨테이너 */}
      <div className="myprofile-scrollable-container">
        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">아이디</span>
            <div className="myprofile-input-button-container">
              <input type="text" className="myprofile-input" placeholder="사용자 아이디" readOnly />
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">휴대폰 번호</span>
            <div className="myprofile-input-button-container">
              <input type="tel" className="myprofile-input" placeholder="휴대폰 번호를 입력하세요" />
              <button className="myprofile-change-button">번호변경</button>
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">내 주소</span>
            <div className="myprofile-input-button-container">
              <input type="text" className="myprofile-input" placeholder="주소를 입력하세요" />
              <button className="myprofile-change-button">주소변경</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile

