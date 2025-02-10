"use client"
import "./Walk2.css"

export default function Walk2() {
  const [address, setAddress] = useState(""); // 주소 상태
  const [coordinates, setCoordinates] = useState(null); // 좌표 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 주소 입력 핸들러
  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  // 좌표 변환 API 호출 핸들러
  const handleSubmit = async () => {
    if (!address.trim()) {
      alert("주소를 입력해주세요!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/convert-address?address=${address}`
      );

      if (!response.ok) {
        throw new Error("주소 변환 실패");
      }

      const data = await response.json();
      setCoordinates({ latitude: data.latitude, longitude: data.longitude });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 지도 초기화 및 마커 표시
  useEffect(() => {
    if (coordinates) {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(coordinates.latitude, coordinates.longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

      new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(coordinates.latitude, coordinates.longitude),
      });
    }
  }, [coordinates]);

  return (
    <div className="walk2-container">
      {/* 주소 입력 섹션 */}
      <div className="white-section">
        <div className="header">
          <button className="back-button">←</button>
          <h1 className="title">
            어디로
            <br />방문하면 될까요?
          </h1>
        </div>

        <div className="input-group">
          <label htmlFor="address" className="input-label">
            주소
          </label>
          <input
            type="text"
            id="address"
            className="input-field"
            placeholder="주소를 입력해주세요"
            value={address}
            onChange={handleInputChange}
          />

          <button className="next-button" onClick={handleSubmit} disabled={loading}>
            {loading ? "변환 중..." : "좌표 변환"}
          </button>
        </div>
      </div>

      {/* 지도 표시 섹션 */}
      {error && <p className="error-message">오류: {error}</p>}
      <div id="map" className="map-container"></div>
    </div>
  );
}
