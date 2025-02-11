import React, { useState } from "react";
import "./Walk2.css"

export default function Walk2() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    if (!address.trim()) {
      alert("주소를 입력해주세요!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 주소 → 좌표 변환 API 호출
      const geoResponse = await fetch(
        `http://127.0.0.1:8000/api/convert-address?address=${address}`
      );
      if (!geoResponse.ok) throw new Error("주소 변환 실패");
      const geoData = await geoResponse.json();

      // DB에 저장할 데이터 준비
      const requestData = {
        address,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
      };

      // 주소 저장 API 호출
      const saveResponse = await fetch("http://127.0.0.1:8000/api/address/save-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!saveResponse.ok) throw new Error("주소 저장 실패");

      alert("주소가 정상적으로 저장되었습니다!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="walk2-container">
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
          <input type="text" id="address" className="input-field" placeholder="주소를 입력해주세요"
            value={address}
            onChange={handleInputChange}
          />

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
          <button className="next-button" onClick={handleSubmit} disabled={loading}>다음으로</button>
        </div>
      </div>
      {error && <p className="error-message">오류: {error}</p>}
    </div>
  );
}
