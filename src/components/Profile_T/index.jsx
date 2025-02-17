import React from 'react';
import './Profile_T.css';

function Profile_T() {
  return (
    <div className="profile-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="profile-header">
        <div className="profile-header-top">
          <h1>더보기</h1>
          <a href="/MyProfilePage" className="profile-link">내 프로필</a>
        </div>
        <div className="profile-header-bottom">
          <a href="/TrainerInformationPage" className="profile-link-container">
            <div className="profile-avatar">
              <img src="/trainerprofile/trainer.jpg" alt="프로필 이미지" />
            </div>
            <div className="profile-details">
              <span>트레이너 프로필</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="profile-arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      {/* 리포트 */}
      <a href="/Review_TPage" className="profile-report">
        <div className="profile-report-card">
          <img src="/profileicons/myreview.png" alt="내 리뷰 아이콘" />
          <span>내 후기 확인하기</span>
        </div>
      </a>
      {/* 견주 모드로 전환 */}
      <a href="/" className="profile-footer">
        <span className="profile-trainer-mode-text">견주 모드로 전환</span>
        <img
          src="/profileicons/switch.png"
          alt="전환 아이콘"
          className="profile-trainer-mode-icon"
        />
      </a>
    </div>
  );
}

export default Profile_T;