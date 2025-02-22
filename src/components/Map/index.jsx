import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { supabase } from "../../lib/supabaseClient";

const TMAP_API_KEY = process.env.REACT_APP_TMAP_API_KEY;

const Map = ({ onDataReady }) => {
  const mapRef = useRef(null);
  const reservationIdRef = useRef(null);
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(null);
  const [steps, setSteps] = useState(null);
  const [time, setTime] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [uuidId, setUuidId] = useState(null);  // ✅ uuidId 상태 추가
  const [reservationId, setReservationId] = useState(null);

  useEffect(() => {
    const fetchUserUUID = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error("🚨 UUID 가져오기 실패:", error);
        return;
      }

      console.log("✅ Supabase에서 가져온 uuid_id:", session.user.id);
      setUuidId(session.user.id);
    };

    fetchUserUUID();
  }, []);

  // ✅ `uuid_id`가 설정된 후 데이터 가져오기
  useEffect(() => {
    console.log("가져온 uuidId:", uuidId)
    if (uuidId) {
      const fetchData = async () => {
        await fetchReservationId(uuidId).then(()=> fetchAddresses());
      };
      fetchData();
    }
  }, [uuidId]);

  // ✅ `uuid_id` 기반으로 `reservation_id` 조회
  const fetchReservationId = async (uuidId) => {
    console.log("가져온 uuidId:", uuidId)
    try {
      if (!uuidId) {
        console.error("🚨 로그인된 사용자 UUID가 없습니다.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/reservations/latest?uuid_id=${uuidId}`
      );
      console.log("📌 예약 데이터 응답:", response.data);

      if (response.data && response.data.id) {
        setReservationId(response.data.id); // ✅ reservationId 설정
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

      setDistance(distanceKm);
      setTime(estimatedTime);
      setSteps(estimatedSteps);

      console.log(`📏 거리: ${distanceKm} km`);
      console.log(`🚶‍♂️ 걸음 수: ${estimatedSteps} 걸음`);
      console.log(`⏳ 예상 소요 시간: ${estimatedTime} 분`);

      // ✅ 부모 컴포넌트로 데이터 전달
      onDataReady({ 
        uuidId,
        distance: distanceKm, 
        steps: estimatedSteps, 
        time: estimatedTime,
        startLocation: start,
        endLocation: end,
       
      });

      console.log("📡 Map에서 보내는 데이터:", {
        uuidId,
        distance: distanceKm,
        steps: estimatedSteps,
        time: estimatedTime,
        startLocation: start,
        endLocation: end,
      });

    } catch (error) {
      console.error("🚨 거리 데이터를 불러오는데 실패했습니다:", error);
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
