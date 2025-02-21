import React, { useState } from "react";
import "./LiveResert_T.css";

function LiveResert_T() {
  const [activeTab, setActiveTab] = useState("walk");
  const [notes, setNotes] = useState(""); // ✅ 특이사항 입력 상태 추가

  // ✅ 저장 버튼 클릭 시 실행될 함수
  const handleSaveNotes = () => {
    console.log("특이사항 저장:", notes);
    alert("특이사항이 저장되었습니다!"); // ✅ 저장 완료 알림
  };

  return (
    <div className="LiveResert_T-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header className="LiveResert_T-header">
        <div className="LiveResert_T-header-content">
          <h1>라이브</h1>
          <div className="LiveResert_T-header-buttons">
            <button
              className={`LiveResert_T-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`LiveResert_T-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>

      {/* 산책 경로 탭 */}
      {activeTab === "walk" && (
        <div className="LiveResert_T-container">
          <div className="LiveResert_T-walk-report-card">
            <div className="LiveResert_T-report-date">0000년 00월 00일</div>
            <div className="LiveResert_T-report-title">○○이 산책 리포트</div>

            <div className="LiveResert_T-profile-section">
              <div className="LiveResert_T-profile-circle LiveResert_T-dog-photo">
                <img src="/dogprofile/dog.jpg" alt="강아지사진" />
              </div>
              <div className="LiveResert_T-paw-prints">
                <img
                  src="/livereserticons/paw.png"
                  alt="발자국"
                  className="LiveResert_T-paw-icon"
                />
              </div>
              <div className="LiveResert_T-profile-circle LiveResert_T-user-photo">
                <img src="/trainerprofile/trainer.jpg" alt="프로필" />
              </div>
            </div>

            <div className="LiveResert_T-walk-details">
              <div className="LiveResert_T-detail-item">
                <h3>걸음수</h3>
                <p>00</p>
              </div>

              <div className="LiveResert_T-detail-item">
                <h3>시간</h3>
                <p>00시00분 ~ 00시00분</p>
              </div>

              <div className="LiveResert_T-detail-item">
                <h3>특이사항</h3>
                <textarea
                  className="LiveResert_T-notes-box"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="산책 중 있었던 일을 입력해주세요"
                ></textarea>
              </div>
            </div>

            {/* ✅ 저장 버튼 추가 */}
            <button className="LiveResert_T-save-button" onClick={handleSaveNotes}>
              저장
            </button>
          </div>
        </div>
      )}

      {/* 채팅하기 탭 */}
      {activeTab === "chat" && <div className="LiveResert_T-chat-message">채팅하기 페이지 아직 미완성</div>}
    </div>
  );
}

export default LiveResert_T;