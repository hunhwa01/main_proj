import React, { useState } from "react";
import "./LiveResert.css";

function LiveResert() {
  const [activeTab, setActiveTab] = useState("walk"); // 'walk' 또는 'chat'

  return (
    <div className="liveresert-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="liveresert-header">
        <div className="liveresert-header-content">
          <h1>라이브</h1>
          <div className="liveresert-header-buttons">
          <button
              className={`liveresert-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`liveresert-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>
      {/* 산책경로 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "walk" && <div className="liveresert-container">
        <div className="liveresert-walk-report-card">
            <div className="liveresert-report-date">0000년 00월 00일</div>
            <div className="liveresert-report-title">○○이 산책 리포트</div>

            <div className="liveresert-profile-section">
              <div className="liveresert-profile-circle liveresert-dog-photo">
                <img src="/dogprofile/dog.jpg" alt="강아지사진" />
              </div>
              <div className="liveresert-paw-prints">
                <img
                  src="/livereserticons/paw.png"
                  alt="발자국"
                  className="liveresert-paw-icon"
                />
              </div>
              <div className="liveresert-profile-circle liveresert-user-photo">
                <img src="/trainerprofile/trainer.jpg" alt="프로필" />
              </div>
            </div>

            <div className="liveresert-walk-details">
              <div className="liveresert-detail-item">
                <h3>걸음수</h3>
                <p>00</p>

              </div>

              <div className="liveresert-detail-item">
                <h3>시간</h3>
                <p>00시00분 ~ 00시00분</p>
              </div>

              <div className="liveresert-detail-item">
                <h3>특이사항</h3>
                <div className="liveresert-notes-box"></div>
              </div>
            </div>
          </div>



        </div>}
      
      {/* 채팅하기 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "chat" && <div className="liveresert-chat-message">채팅하기 페이지 아직 미완성</div>}
    </div>
  );
}

export default LiveResert;
