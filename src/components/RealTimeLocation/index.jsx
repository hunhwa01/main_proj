import { useEffect, useState } from "react";

export default function RealTimeLocation({ onLocationUpdate }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let intervalId; // 🔥 setInterval ID 저장

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

    // 🔥 30초마다 실행되는 setInterval (기존 interval 정리)
    intervalId = setInterval(fetchLocation, 30000);
    fetchLocation(); // 처음 한 번 즉시 실행

    return () => {
      console.log("🛑 실시간 위치 추적 중지");
      clearInterval(intervalId); // ✅ 컴포넌트 언마운트 시 interval 제거
    };
  }, []); // ✅ 의존성 배열을 빈 배열로 설정하여 최초 한 번만 실행

  return null; // UI를 렌더링하지 않는 컴포넌트
}
