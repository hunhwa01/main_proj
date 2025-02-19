import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const TMAP_API_KEY = process.env.REACT_APP_TMAP_API_KEY;

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/address/addresses");
      const data = await response.json();
      console.log("📌 받아온 주소 데이터:", data);

      if (!data || data.length < 2) {
        console.error("🚨 출발지와 목적지를 설정할 데이터가 부족합니다.");
        return;
      }

      const startLocation = data[0];
      const startPosition = new window.Tmapv2.LatLng(startLocation.latitude, startLocation.longitude);

      const endLocation = data[data.length - 1];
      const endPosition = new window.Tmapv2.LatLng(endLocation.latitude, endLocation.longitude);

      const newMap = new window.Tmapv2.Map(mapRef.current, {
        center: startPosition,
        width: "100%",
        height: "100%",
        zoom: 16,
      });

      setMap(newMap);
      console.log("🗺️ 지도 객체 생성 완료:", newMap);

      const startMarker = new window.Tmapv2.Marker({
        position: startPosition,
        map: newMap,
        label: "출발지",
      });

      const endMarker = new window.Tmapv2.Marker({
        position: endPosition,
        map: newMap,
        label: "목적지",
      });

      console.log("📍 출발지 마커 추가 완료:", startMarker);
      console.log("📍 목적지 마커 추가 완료:", endMarker);

      drawPedestrianRoute(startLocation, endLocation, newMap);
    } catch (error) {
      console.error("🚨 주소 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  // ✅ Tmap API를 이용한 보행자 경로 요청
  const drawPedestrianRoute = async (start, end, mapInstance) => {
    try {
      console.log("📌 start 데이터:", start);
      console.log("📌 end 데이터:", end);

      const requestData = {
        startX: String(start.longitude),
        startY: String(start.latitude),
        endX: String(end.longitude),
        endY: String(end.latitude),
        reqCoordType: "WGS84GEO",
        resCoordType: "EPSG3857", // Tmap API는 EPSG3857 좌표계 반환
      };

      console.log("📌 요청할 API 데이터:", requestData);

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&appKey=${TMAP_API_KEY}`,
        requestData,
        { headers }
      );

      const resultData = response.data.features;
      console.log("🛤️ Tmap API 응답 데이터:", resultData);

      if (!resultData || resultData.length === 0) {
        console.error("🚨 API 오류 또는 경로 데이터가 없습니다.", resultData);
        return;
      }

      // ✅ EPSG3857 좌표를 WGS84 좌표로 변환 후 폴리라인 그리기
      const drawInfoArr = [];
      for (let i = 0; i < resultData.length; i++) {
        const geometry = resultData[i].geometry;
        if (geometry.type === "LineString") {
          for (let j = 0; j < geometry.coordinates.length; j++) {
            const latlng = new window.Tmapv2.Point(
              geometry.coordinates[j][0],
              geometry.coordinates[j][1]
            );

            // ✅ 좌표 변환: EPSG3857 → WGS84
            const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
            const convertChange = new window.Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
            drawInfoArr.push(convertChange);
          }
        }
      }

      console.log("📌 변환된 폴리라인 좌표 개수:", drawInfoArr.length);
      console.log("📌 변환된 폴리라인 좌표 목록:", drawInfoArr);

      if (drawInfoArr.length === 0) {
        console.error("🚨 폴리라인을 그릴 좌표가 없습니다.");
        return;
      }

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

      newPolyline.setZIndex(1000);
      setPolyline(newPolyline);
      console.log("🛤️ 변환된 보행자 경로 폴리라인 추가 완료:", newPolyline);

      // ✅ 지도 자동 확대 조정
      const bounds = new window.Tmapv2.LatLngBounds();
      drawInfoArr.forEach((latLng) => bounds.extend(latLng));
      mapInstance.fitBounds(bounds);
    } catch (error) {
      console.error("🚨 경로 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%", borderRadius: "20px" }} />
    </div>
  );
};

export default Map;