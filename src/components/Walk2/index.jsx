"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import "./Walk2.css";

export default function Walk2() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");

  // ✅ API Key가 undefined인지 확인 (환경변수에서 불러오기)
  useEffect(() => {
    if (!process.env.REACT_APP_GOOGLE_API_KEY) {
      console.error("🚨 Google API Key가 설정되지 않았습니다!");
      setError("Google API Key가 누락되었습니다.");
    } else {
      setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
      console.log("✅ Google API Key 로드됨:", process.env.REACT_APP_GOOGLE_API_KEY);
    }
  }, []);

  // 📌 주소 선택 시 좌표 변환
  const handlePlaceSelect = async (place) => {
    setSelectedPlace(place);
    setError(null);

    if (place && place.value && place.value.place_id) {
      try {
        const geoData = await geocodeByPlaceId(place.value.place_id);
        if (geoData.length > 0) {
          const location = geoData[0].geometry.location;
          setCoordinates({ lat: location.lat(), lng: location.lng() });
        }
      } catch (error) {
        console.error("좌표 변환 오류:", error);
        setError("좌표 변환에 실패했습니다.");
      }
    }
  };

  // 📌 FastAPI 서버로 주소 저장 요청
  const handleSubmit = async () => {
    if (!selectedPlace || !coordinates) {
      alert("주소를 선택해주세요!");
      return;
    }

    setLoading(true);
    setError(null);

    const requestData = {
      address: selectedPlace.label,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    console.log("📤 서버로 보낼 데이터:", requestData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/address/save-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("서버 오류: 응답이 실패함");
      }

      alert("✅ 주소가 정상적으로 저장되었습니다!");
      navigate("/Walk3Page");
    } catch (error) {
      console.error("주소 저장 실패:", error);
      setError("주소 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Walk2-container">
      <h1>주소 자동완성 + 좌표 변환 + 서버 전송</h1>

      {/* ✅ Google Places Autocomplete (API Key 체크 추가) */}
      {apiKey ? (
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          selectProps={{
            value: selectedPlace,
            onChange: handlePlaceSelect,
            placeholder: "주소를 입력하세요...",
          }}
        />
      ) : (
        <p style={{ color: "red" }}>⚠️ Google API Key가 설정되지 않았습니다.</p>
      )}

      {selectedPlace && (
        <div>
          <h3>선택된 주소:</h3>
          <p>{selectedPlace.label}</p>
        </div>
      )}

      {coordinates && (
        <div>
          <h3>위도: {coordinates.lat}</h3>
          <h3>경도: {coordinates.lng}</h3>
        </div>
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "저장 중..." : "주소 저장"}
      </button>

      {error && <p style={{ color: "red" }}>오류: {error}</p>}
    </div>
  );
}
