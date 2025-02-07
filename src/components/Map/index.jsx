import React, { useEffect, useState } from "react";

const Map = ({ latitude, longitude }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=1a4c825ee54297f08eea51788c4ac917&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 좌표: 서울
          level: 3,
        };
        const createdMap = new window.kakao.maps.Map(container, options);
        setMap(createdMap);
      });
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (latitude && longitude && map) {
      const coords = new window.kakao.maps.LatLng(latitude, longitude);

      // 지도 중심 이동
      map.setCenter(coords);

      // 기존 마커 제거
      if (marker) marker.setMap(null);

      // 새로운 마커 추가
      const newMarker = new window.kakao.maps.Marker({
        map: map,
        position: coords,
      });
      setMarker(newMarker);
    }
  }, [latitude, longitude, map]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "450px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    />
  );
};

export default Map;
