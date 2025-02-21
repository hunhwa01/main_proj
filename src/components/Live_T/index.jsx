import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Live_T.css";
import Map from "../Map";
import WalkEndPopup from "../WalkEndPopup";

function Live_T() {
  const [activeTab, setActiveTab] = useState("walk");
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEndingWalk, setIsEndingWalk] = useState(false); // ✅ 종료 버튼을 눌렀는지 확인
  const navigate = useNavigate();

  const handleStartWalk = () => {
    setPopupMessage("산책을 시작하시겠습니까?");
    setIsPopupVisible(true);
    setIsEndingWalk(false); // ✅ 시작 버튼 클릭 시 이동 방지
  };

  const handleEndWalk = () => {
    setPopupMessage("산책을 종료하시겠습니까?");
    setIsPopupVisible(true);
    setIsEndingWalk(true); // ✅ 종료 버튼 클릭 시 이동 허용
  };

  const handlePopupConfirm = () => {
    setIsPopupVisible(false);
    if (isEndingWalk) {
      navigate("/LiveResert_TPage"); // ✅ 산책 종료 시에만 이동
    }
  };

  const handlePopupCancel = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="live-T-container">
      <header className="live-T-header">
        <div className="live-T-header-content">
          <h1>라이브</h1>
          <div className="live-T-header-buttons">
            <button
              className={`live-T-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`live-T-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>

      {activeTab === "walk" && <div className="live-T-map-container"><Map /></div>}
      {activeTab === "chat" && <div className="live-T-chat-message">채팅하기 페이지 아직 미완성</div>}

      {activeTab === "walk" && (
        <div className="live-T-button-container">
          <button className="live-T-start-button" onClick={handleStartWalk}>산책 시작</button>
          <button className="live-T-end-button" onClick={handleEndWalk}>산책 종료</button>
        </div>
      )}

      {isPopupVisible && (
        <WalkEndPopup
          message={popupMessage}
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}
    </div>
  );
}

export default Live_T;