import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import "./Walk2.css";

export default function Walk2() {
  const [address, setAddress] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
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
      // 선택된 주소에서 place_id 가져오기
      const placeId = selectedPlace?.value?.place_id;
      if (!placeId) throw new Error("유효한 주소를 선택해주세요!");
      
      const geoData = await geocodeByPlaceId(placeId);
      if (!geoData || geoData.length === 0) {
          throw new Error("좌표 데이터를 찾을 수 없습니다.");
      }
      const location = geoData[0].geometry.location;

      const requestData = {
        address: selectedPlace.label,
        latitude: location.lat(),
        longitude: location.lng(),
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

          {/* Google Places Autocomplete 입력 필드 */}
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            selectProps={{
              value: selectedPlace || null,
              onChange: (place) => {
                setSelectedPlace(place); // 전체 객체 저장 (주소 변환용)
                setAddress(place.label); // 문자열만 저장 (입력 필드 표시용)
              },
              placeholder: "주소를 입력하세요",
            }}
          />

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
