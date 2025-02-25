"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./Walk5.css";

export default function Walk5() {
  const navigate = useNavigate();
  const [requestText, setRequestText] = useState(""); // 요청사항 입력
  const [selectedPet, setSelectedPet] = useState(null); // 선택된 반려동물 ID
  const [latestAddress, setLatestAddress] = useState(null);

  // ✅ 현재 로그인한 사용자 UUID 가져오기
  const getUserUUID = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      console.error("🚨 사용자 세션을 가져올 수 없습니다.", error);
      return null;
    }
    console.log("🔑 현재 로그인된 사용자 UUID:", data.session.user.id);
    return data.session.user.id;
  };

  // ✅ 가장 최근 주소 가져오기
  const fetchLatestAddress = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/address/latest");
      const data = await response.json();

      if (response.ok && data) {
        console.log("📌 최신 주소 데이터:", data);
        setLatestAddress(data);
      } else {
        console.warn("⚠️ 최신 주소 데이터를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("🚨 주소 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchLatestAddress();
  }, []);

  // ✅ 버튼 클릭 시 reservations 테이블에 데이터 저장 후 페이지 이동
  const handleNext = async () => {
    const userUUID = await getUserUUID();
    if (!userUUID) {
      console.error("🚨 로그인된 사용자가 없습니다.");
      return;
    }

    if(!latestAddress) {
      console.error("최신 주소 정보가 없습니다.");
    }

    const requestData = {
      uuid_id: userUUID, // 로그인한 사용자 UUID
      pet_id: 140, // 🐶 실제 선택된 반려동물 ID (테스트용)
      trainer_id: 107, // 👨‍🏫 트레이너 ID (테스트용)
      schedule: new Date().toISOString().split("Z")[0], // 🗓️ 예약 시간 (현재 시간)
      status: "pending",
      address: latestAddress.address,
      latitude: latestAddress.latitude,
      longitude: latestAddress.longitude,
    };

    console.log("📤 서버로 전송할 데이터:", requestData); // 🚀 디버깅용

    try {
      const response = await fetch("http://localhost:8000/api/reservations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("✅ 예약 생성 완료! 예약 ID:", result.reservation_id);
        localStorage.setItem("reservation_id", result.reservation_id);
        // ✅ 데이터 저장 성공하면 페이지 이동
        navigate("/Reservation2Page");
      } else {
        console.error("🚨 예약 생성 실패:", result);
      }
    } catch (error) {
      console.error("🚨 API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="Walk5-container">
      <div className="Walk5-header">
        <button className="Walk5-back-button" onClick={() => navigate("/Walk4Page")}>
          <img src="/icons/back.png" alt="뒤로가기" className="Walk5-back-icon" />
        </button>
        <h1 className="Walk5-title">
          반려동물에 대해
          <br />
          알려주세요
        </h1>
      </div>

      <div className="Walk5-content">
        <div className="Walk5-profile-card">
          <div className="Walk5-profile-image">
            <img src="/dogprofile/dog.jpg" alt="반려동물 프로필" width={64} height={64} />
          </div>
          <div className="Walk5-profile-info">
            <div className="Walk5-name">이름</div>
            <div className="Walk5-details">소형견 · 개월수 · 성별</div>
          </div>
          <button className="Walk5-edit-button">
            <input 
              type="checkbox" 
              className="Walk5-checkbox" 
              checked={!!selectedPet}
              onChange={() => setSelectedPet(1)} />
          </button>
        </div>

        <div className="Walk5-request-section">
          <h2 className="Walk5-section-title">요청사항</h2>
          <textarea 
            className="Walk5-request-input" 
            placeholder="요청사항을 꼼꼼하게 적어주세요!" 
            rows={6}
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}></textarea>
        </div>
      </div>

      <div className="Walk5-bottom-section">
        <button className="Walk5-next-button" onClick={handleNext}>다음으로</button>
      </div>
    </div>
  );
}
