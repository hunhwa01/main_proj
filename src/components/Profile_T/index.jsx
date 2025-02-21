import React from 'react';
import './Profile_T.css';

function Profile_T() {
  return (
    <div className="profile-t-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      <header className="profile-t-header">
        <div className="profile-t-header-top">
          <h1>더보기</h1>
          <a href="/MyProfilePage" className="profile-t-link">내 프로필</a>
        </div>
        <div className="profile-t-header-bottom">
          <a href="/TrainerInformationPage" className="profile-t-link-container">
            <div className="profile-t-avatar">
              <img src="/trainerprofile/trainer.jpg" alt="프로필 이미지" />
            </div>
            <div className="profile-t-details">
              <span>트레이너 프로필</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="profile-t-arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      <a href="/Review_TPage" className="profile-t-report">
        <div className="profile-t-report-card">
          <img src="/profileicons/myreview.png" alt="내 리뷰 아이콘" />
          <span>내 후기 확인하기</span>
        </div>
      </a>

      <a href="/" className="profile-t-footer">
        <span className="profile-t-trainer-mode-text">견주 모드로 전환</span>
        <img
          src="/profileicons/switch.png"
          alt="전환 아이콘"
          className="profile-t-trainer-mode-icon"
        />
      </a>
    </div>
  );
}

export default Profile_T;