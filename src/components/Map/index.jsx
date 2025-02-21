import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const TMAP_API_KEY = process.env.REACT_APP_TMAP_API_KEY;

const Map = ({ userId }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(null);
  const [steps, setSteps] = useState(null);
  const [time, setTime] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [reservationId, setReservationId] = useState(null);

  useEffect(() => {
    fetchReservationId(userId)
    fetchAddresses();
  }, [userId]);

  // ✅ `user_id` 기반으로 `reservation_id` 조회
  const fetchReservationId = async (userId) => {
    try {
      if (!userId) {
        console.error("🚨 로그인된 사용자 ID가 없습니다.");
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/reservations/latest?user_id=${userId}`);
      if (response.data && response.data.id) {
        setReservationId(response.data.id);
        console.log("✅ 가져온 예약 ID:", response.data.id);
      } else {
        console.error("🚨 현재 사용자에 대한 예약 데이터를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("🚨 예약 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/address/addresses");
      const data = await response.json();
      console.log("📌 받아온 주소 데이터:", data);

      if (!data || data.length < 2) {
        console.error("🚨 출발지와 목적지를 설정할 데이터가 부족합니다.");
        return;
      }

      const startLocation = data[0]; // 출발지
      const endLocation = data[1]; // 목적지

      initializeMap(startLocation, endLocation);
      fetchWalkingDistance(startLocation, endLocation);
      saveWalkingRoute(startLocation, endLocation); // ✅ API 호출 추가
    } catch (error) {
      console.error("🚨 주소 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  const initializeMap = (startLocation, endLocation) => {
    const startPosition = new window.Tmapv2.LatLng(startLocation.latitude, startLocation.longitude);
    const endPosition = new window.Tmapv2.LatLng(endLocation.latitude, endLocation.longitude);

    const newMap = new window.Tmapv2.Map(mapRef.current, {
      center: startPosition,
      width: "100%",
      height: "100%",
      zoom: 16,
    });

    setMap(newMap);
    console.log("🗺️ 지도 객체 생성 완료:", newMap);

    new window.Tmapv2.Marker({ position: startPosition, map: newMap, label: "출발지" });
    new window.Tmapv2.Marker({ position: endPosition, map: newMap, label: "목적지" });

    drawPedestrianRoute(startLocation, endLocation, newMap);
  };

  const fetchWalkingDistance = async (start, end) => {
    try {
      const requestData = {
        startX: start.longitude.toFixed(6),
        startY: start.latitude.toFixed(6),
        endX: end.longitude.toFixed(6),
        endY: end.latitude.toFixed(6),
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "출발지",
        endName: "목적지",
      };

      const headers = { "Content-Type": "application/json", "appKey": TMAP_API_KEY };

      const response = await axios.post(
        `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1`,
        JSON.stringify(requestData),
        { headers }
      );

      const resultData = response.data.features;
      console.log("🚶 Tmap API 응답 데이터:", resultData);

      let totalDistance = 0;
      let totalTime = 0;

      resultData.forEach((feature) => {
        if (feature.properties.distance) totalDistance += feature.properties.distance;
        if (feature.properties.time) totalTime += feature.properties.time;
      });

      const distanceKm = (totalDistance / 1000).toFixed(2); // km 단위 변환
      const estimatedSteps = Math.round(totalDistance / 0.7); // 걸음 수 (1걸음 = 약 0.7m)
      const estimatedTime = Math.ceil(totalTime / 60); // 분 단위 변환

      setDistance(totalDistance);
      setTime(Math.round(totalTime / 60));
      setSteps(Math.round(totalDistance / 0.7));

      console.log(`📏 거리: ${distanceKm} km`);
      console.log(`🚶‍♂️ 걸음 수: ${estimatedSteps} 걸음`);
      console.log(`⏳ 예상 소요 시간: ${estimatedTime} 분`);


    } catch (error) {
      console.error("🚨 거리 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  // ✅ 산책 경로 데이터 저장 API 호출
  const saveWalkingRoute = async (start, end) => {
    try {
      if (!reservationId) {
        console.error("🚨 예약 ID가 없습니다. 데이터를 저장할 수 없습니다.");
        return;
      }

      const requestData = {
        reservation_id: reservationId,
        start_latitude: start.latitude,
        start_longitude: start.longitude,
        end_latitude: end.latitude,
        end_longitude: end.longitude,
        distance_km: distance,
        estimated_steps: steps,
        estimated_time: time,
      };

      const response = await axios.post("http://localhost:8000/api/walk/save-walking-route", requestData);
      console.log("✅ 산책 경로 데이터 저장 완료:", response.data);
    } catch (error) {
      console.error("🚨 산책 데이터를 저장하는 데 실패했습니다:", error);
    }
  };

  // ✅ Tmap API를 이용한 보행자 경로 요청
  const drawPedestrianRoute = async (start, end, mapInstance) => {
    try {
      console.log("📌 출발지:", start);
      console.log("📌 목적지:", end);

      const requestData = {
        startX: start.longitude.toFixed(6),
        startY: start.latitude.toFixed(6),
        endX: end.longitude.toFixed(6),
        endY: end.latitude.toFixed(6),
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "출발지",
        endName: "목적지",
      };

      console.log("📌 요청할 API 데이터:", requestData);

      const headers = {
        "Content-Type": "application/json",
        "appKey": TMAP_API_KEY,
      };

      const response = await axios.post(
        `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1`,
        JSON.stringify(requestData),
        { headers }
      );

      const resultData = response.data.features;
      console.log("🚶 Tmap API 응답 데이터:", resultData);

      if (!resultData || resultData.length === 0) {
        console.error("🚨 API 오류 또는 경로 데이터가 없습니다.", resultData);
        return;
      }

      const drawInfoArr = [];
      for (let i = 0; i < resultData.length; i++) {
        const geometry = resultData[i].geometry;
        if (geometry.type === "LineString") {
          for (let j = 0; j < geometry.coordinates.length; j++) {
            const latLng = new window.Tmapv2.LatLng(
              geometry.coordinates[j][1],
              geometry.coordinates[j][0]
            );
            drawInfoArr.push(latLng);
          }
        }
      }

      console.log("📌 변환된 폴리라인 좌표 개수:", drawInfoArr.length);
      console.log("📌 변환된 폴리라인 좌표 목록:", drawInfoArr);

      if (polyline) polyline.setMap(null);

      // ✅ 기존 폴리라인 삭제
      if (polyline) {
        console.log("🛑 기존 폴리라인 삭제");
        polyline.setMap(null);
        setPolyline(null);
      }

      // ✅ 새로운 폴리라인 추가
      const newPolyline = new window.Tmapv2.Polyline({
        path: drawInfoArr,
        strokeColor: "#0000FF",
        strokeWeight: 6,
        map: mapInstance,
        zIndex: 1000,
      });

      setPolyline(newPolyline);
      console.log("🛤️ 변환된 보행자 경로 폴리라인 추가 완료:", newPolyline);

    } catch (error) {
      console.error("🚨 경로 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "80%", borderRadius: "20px" }} />
    </div>
  );
};

export default Map;
