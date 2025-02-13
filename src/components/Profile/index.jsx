import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="profile-header">
        <div className="profile-header-top">
          <h1>더보기</h1>
          <a href="/MyProfilePage" className="profile-link">내 프로필</a>
        </div>
        <div className="profile-header-bottom">
          <a href="/DogInformationPage" className="profile-link-container">
            <div className="profile-avatar">
              <img src="/dogprofile/dog.jpg" alt="프로필 이미지" />
            </div>
            <div className="profile-details">
              <span>반려동물 프로필</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="profile-arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      {/* 리포트 */}
      <a href="/ResultLastPage" className="profile-report">
        <div className="profile-report-card">
          <img src="/profileicons/report.png" alt="리포트 아이콘" />
          <span>지난 산책 리포트</span>
        </div>
      </a>
      {/* 트레이너 모드로 전환 */}
      <a href="/trainer-mode" className="profile-footer">
        <span className="profile-trainer-mode-text">트레이너 모드로 전환</span>
        <img
          src="/profileicons/switch.png"
          alt="전환 아이콘"
          className="profile-trainer-mode-icon"
        />
      </a>
    </div>
  );
}

export default Profile;