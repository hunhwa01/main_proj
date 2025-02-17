import React, { useEffect, useRef, useState } from "react";

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

      // ✅ 출발지 (첫 번째 값)
      const startLocation = data[0];
      const startPosition = new window.Tmapv2.LatLng(startLocation.latitude, startLocation.longitude);

      // ✅ 목적지 (마지막 값)
      const endLocation = data[data.length - 1];
      const endPosition = new window.Tmapv2.LatLng(endLocation.latitude, endLocation.longitude);

      // ✅ 지도 생성 (출발지를 중심으로)
      const newMap = new window.Tmapv2.Map(mapRef.current, {
        center: startPosition, // 지도 중심
        width: "100%",
        height: "500px",
        zoom: 16,
      });

      setMap(newMap);
      console.log("🗺️ 지도 객체 생성 완료:", newMap);

      // ✅ 출발지 마커 추가
      const startMarker = new window.Tmapv2.Marker({
        position: startPosition,
        map: newMap,
        label: "출발지",
      });

      // ✅ 목적지 마커 추가
      const endMarker = new window.Tmapv2.Marker({
        position: endPosition,
        map: newMap,
        label: "목적지",
      });

      console.log("📍 출발지 마커 추가 완료:", startMarker);
      console.log("📍 목적지 마커 추가 완료:", endMarker);

      // ✅ 보행자 경로 요청
      drawPedestrianRoute(startLocation, endLocation, newMap);
    } catch (error) {
      console.error("🚨 주소 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  const drawPedestrianRoute = async (start, end, mapInstance) => {
    try {
      const response = await fetch(
        `http://localhost:8000/proxy/tmap-route?start=${start.longitude},${start.latitude}&goal=${end.longitude},${end.latitude}`
      );
      const result = await response.json();

      console.log("🛤️ Tmap 경로 데이터:", result);

      if (!result.features || result.features.length === 0) {
        console.error("🚨 경로 데이터가 없습니다.");
        return;
      }

      // ✅ 폴리라인 좌표 배열
      const path = result.features
        .filter((feature) => feature.geometry.type === "LineString")
        .flatMap((feature) =>
          feature.geometry.coordinates.map(([lon, lat]) => new window.Tmapv2.LatLng(lat, lon))
        );

      // ✅ 기존 폴리라인 제거
      if (polyline) {
        polyline.setMap(null);
      }

      // ✅ 새로운 폴리라인 추가
      const newPolyline = new window.Tmapv2.Polyline({
        path: path,
        strokeColor: "#FF0000",
        strokeWeight: 4,
        map: mapInstance,
      });

      setPolyline(newPolyline);
      console.log("🛤️ 보행자 경로 폴리라인 추가 완료:", newPolyline);
    } catch (error) {
      console.error("🚨 경로 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Map;
