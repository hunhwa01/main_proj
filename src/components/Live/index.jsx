import React, { useState, useEffect } from "react";
import "./Live.css";
import Map from "../Map"; // Map 컴포넌트를 올바른 경로에서 임포트

function Live() {
  const [activeTab, setActiveTab] = useState("walk"); // 'walk' 또는 'chat'
  const [coordinates, setCoordinates] = useState(null); // 좌표 상태 추가
  const [mapLoaded, setMapLoaded] = useState(false); // Google Maps API 로드 상태 추가

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) return; // id가 없으면 fetch 하지 않음

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get-address/${id}`);
        if (!response.ok) {
          throw new Error("좌표를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setCoordinates({ latitude: data.latitude, longitude: data.longitude });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates && !mapLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDibCdcK4JBV60aFaIFohHe3PXEeuDIBww`;
      script.async = true;
      script.onload = () => setMapLoaded(true);

      document.head.appendChild(script);
    }
  }, [coordinates, mapLoaded]);

  useEffect(() => {
    if (coordinates && mapLoaded) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: coordinates.latitude, lng: coordinates.longitude },
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: { lat: coordinates.latitude, lng: coordinates.longitude },
        map: map,
      });
    }
  }, [coordinates, mapLoaded]);

  return (
    <div className="live-container" style={{minHeight: '100%', overflowY: 'auto'}}>
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
      {/* 산책경로 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "walk" && <div className="live-map-container">
        <Map/>
        
        </div>}
      
      {/* 채팅하기 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "chat" && <div className="live-chat-message">채팅하기 페이지 아직 미완성</div>}
    </div>
  );
}

export default Live;
