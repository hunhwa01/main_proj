"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../../lib/supabaseClient";
import Map from "../Map";
import "./LiveResert_T.css";

export default function LiveResert_T({}) {
  const [activeTab, setActiveTab] = useState("walk");
  const [notes, setNotes] = useState(""); // ✅ 특이사항 입력 상태 추가
  const [walkData, setWalkData] = useState({
    uuidId: null,
    reservationId: null,
    distance: 0,
    steps: 0,
    time: 0,
    startLocation: null,
    endLocation: null,
  }); // ✅ Map에서 받아온 거리, 걸음 수, 시간 저장

  // ✅ Map에서 받은 데이터 저장
  const handleRouteData = (data) => {
    console.log("📥 Map에서 받은 데이터:", data);
    setWalkData({
      uuidId: data.uuidId,
      reservationId: data.reservationId,
      distance: data.distance,
      steps: data.steps,
      time: data.time,
      startLocation: data.startLocation,
      endLocation: data.endLocation,
    });
  };

  // ✅ 저장 버튼 클릭 시 산책 데이터 저장
  const saveWalkingRoute = async () => {
    try {
      if (!walkData.reservationId || !walkData.startLocation || !walkData.endLocation) {
        console.error("🚨 예약 ID 또는 경로 데이터가 없습니다. 데이터를 저장할 수 없습니다.");
        return;
      }

      const requestData = {
        uuid_id: walkData.uuidId,
        reservation_id: walkData.reservationId,
        start_latitude: walkData.startLocation.latitude,
        start_longitude: walkData.startLocation.longitude,
        end_latitude: walkData.endLocation.latitude,
        end_longitude: walkData.endLocation.longitude,
        distance_km: walkData.distance,
        estimated_steps: walkData.steps,
        estimated_time: walkData.time,
        notes: notes,
      };

      console.log("📤 저장할 산책 데이터:", requestData);

      const response = await axios.post(
        "http://localhost:8000/api/walk/save-walking-route",
        requestData
      );

      if (response.status === 200) {
        console.log("✅ 산책 경로 데이터 저장 완료:", response.data);
        alert("산책 데이터가 성공적으로 저장되었습니다!");
      }
    } catch (error) {
      console.error("🚨 산책 데이터를 저장하는 데 실패했습니다:", error);
    }
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
          <Map onDataReady={handleRouteData} />
          <div className="LiveResert_T-walk-report-card">
            <div className="LiveResert_T-report-date">{new Date().toLocaleDateString()}</div>
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
                <p>{walkData.steps} 걸음</p>
              </div>

              <div className="LiveResert_T-detail-item">
                <h3>시간</h3>
                <p>{walkData.time} 분</p>
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
            <button className="LiveResert_T-save-button" onClick={saveWalkingRoute}>
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
