import { useEffect, useState } from "react";

export default function RealTimeLocation({ onLocationUpdate }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };

          console.log(`📍 30초마다 갱신됨! 현재 위치 - 위도: ${latitude}, 경도: ${longitude}`);
          setLocation(newLocation);
          onLocationUpdate(newLocation); // 부모 컴포넌트에 위치 전달
        },
        (error) => {
          console.error("🚨 위치 정보를 가져오는데 실패했습니다:", error);
        },
        { enableHighAccuracy: true }
      );
    };

    // 🔥 30초마다 위치를 가져옴 (위치 변화와 상관없이)
    const interval = setInterval(fetchLocation, 30000);
    fetchLocation(); // 처음 한 번 즉시 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [onLocationUpdate]);

  return null; // UI를 렌더링하지 않는 컴포넌트
}
