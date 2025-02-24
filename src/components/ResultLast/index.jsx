import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultLast.css";

function ResultLast() {
  const navigate = useNavigate();
  const [walkReports, setWalkReports] = useState([]);

  const handleBackClick = () => {
    navigate("/ProfilePage");
  };

  // ✅ `walking_routes` 테이블에서 데이터 가져오기
  useEffect(() => {
    const fetchWalkReports = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/walk/reports");
        console.log("📥 불러온 산책 리포트 데이터:", response.data);
        setWalkReports(response.data); // 가져온 데이터 저장
      } catch (error) {
        console.error("🚨 산책 리포트 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchWalkReports();
  }, []);

  return (
    <div className="resultlast-container" style={{height: '100%', overflowY: 'auto'}}>
      <header className="resultlast-header">
        <div className="resultlast-header-content">
          <img
            src="/resultlasticons/back.png"
            alt="뒤로가기"
            className="resultlast-back-icon"
            onClick={handleBackClick}
          />
          <h1>지난 산책 리포트</h1>
        </div>
      </header>

      <div className="resultlast-scrollable-container">
        {/* 산책 리포트 카드 (반복) */}
        {walkReports.length > 0 ? (
          walkReports.map((report, index) => (
            <div className="resultlast-walk-report-card" key={index}>
              <div className="resultlast-report-date">{new Date(report.created_at).toLocaleDateString}</div>
              <div className="resultlast-report-title">○○이 산책 리포트</div>

              <div className="resultlast-profile-section">
                <div className="resultlast-profile-circle resultlast-dog-photo">
                  <img src="/dogprofile/dog.jpg" alt="강아지사진" />
                </div>
                <div className="resultlast-paw-prints">
                  <img
                    src="/resultlasticons/paw.png"
                    alt="발자국"
                    className="resultlast-paw-icon"
                  />
                </div>
                <div className="resultlast-profile-circle resultlast-user-photo">
                  <img src="/trainerprofile/trainer.jpg" alt="프로필" />
                </div>
              </div>

              <div className="resultlast-walk-details">
                <div className="resultlast-detail-item">
                  <h3>걸음수</h3>
                  <p>{report.estimated_steps}</p>

                </div>

                <div className="resultlast-detail-item">
                  <h3>시간</h3>
                  <p>{report.estimated_time}</p>
                </div>

                <div className="resultlast-detail-item">
                  <h3>특이사항</h3>
                  <div className="resultlast-notes-box">
                    <p>{report.feedback || "기록된 특이사항이 없습니다."}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="Resultlast-no-data">불러올 산책 리포트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default ResultLast;