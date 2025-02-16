import React from "react";
import Map from "../Map"; // ✅ Map 컴포넌트 불러오기

const Live = () => {
  return (
    <div className="live-container">
      <h1>Tmap 지도 테스트</h1>
      <Map />
    </div>
  );
};

export default Live;
