import React, { useState } from "react";
import "./Live.css";
import Map from "../Map";

function Live() {
  const [activeTab, setActiveTab] = useState("walk");
  return (
    <div className="live-container" style={{ minHeight: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
      {/* 헤더 */}
      <header className="live-header">
        <div className="live-header-content">
          <h1>라이브</h1>
          <div className="live-header-buttons">
            <button
              className={`live-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`live-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>
      {/* 산책경로 탭이 활성화되었을 때 Map 컴포넌트 표시 */}
      {activeTab === "walk" && (
        <div className="live-map-container">
          <Map />
        </div>
      )}
      
      {/* 채팅하기 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "chat" && <div className="live-chat-message">채팅하기 페이지 아직 미완성</div>}
    </div>
  );
}

export default Live;