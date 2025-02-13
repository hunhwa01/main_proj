import { useNavigate } from "react-router-dom"
import "./Review.css"

// 예시 후기 데이터 수정 (tags를 빈 배열로 유지)
const reviewsData = [
  {
    id: 1,
    trainerName: "김트레이너",
    rating: 4.5,
    content: "트레이닝 세션이 매우 효과적이었습니다. 김트레이너님의 전문성과 친절함에 감사드립니다.",
    tags: [],
  },
  {
    id: 2,
    trainerName: "이트레이너",
    rating: 5.0,
    content:
      "이트레이너님과의 세션은 항상 즐겁고 유익합니다. 개인의 니즈를 잘 파악하고 맞춤형 운동을 제공해주셔서 감사합니다.",
    tags: [],
  },
  {
    id: 3,
    trainerName: "박트레이너",
    rating: 4.8,
    content: "박트레이너님의 꼼꼼한 자세 교정과 다양한 운동 프로그램 덕분에 큰 효과를 볼 수 있었습니다.",
    tags: [],
  },
]

function Review() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/")
  }

  // 평점을 문자열로 변환하는 함수
  const getRating = (rating) => {
    return `평점: ${rating.toFixed(1)}`
  }

  return (
    <div className="review-container">
      {/* 헤더 (고정) */}
      <header className="review-header">
        <div className="review-header-content">
          <img src="/reviewicons/back.png" alt="뒤로가기" className="review-back-icon" onClick={handleBackClick} />
          <h1>후기</h1>
        </div>
      </header>

      {/* 스크롤 가능한 컨테이너 */}
      <div className="review-scrollable-container">
        {/* 태그 부분 (원래대로 유지) */}
        <div className="review-tags">
          <button className="review-tag">소통 원활성</button>
          <button className="review-tag">청결도</button>
          <button className="review-tag">상황 공유</button>
        </div>

        {/* 리뷰 카드 (예시 데이터 사용) */}
        {reviewsData.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-profile">
              <img
                src={`/trainerprofile/${review.trainerName.replace("트레이너", "")}.jpg`}
                alt={`${review.trainerName} 프로필`}
                className="review-avatar-image"
              />
              <div className="review-info">
                <span className="reviewer-name">{review.trainerName}님</span>
                <div className="review-rating">{getRating(review.rating)}</div>
              </div>
            </div>
            <div className="review-content-box">
              <p>{review.content}</p>
              {/* 각 리뷰의 태그 렌더링 부분은 유지하되, 현재는 빈 배열이므로 아무것도 표시되지 않습니다 */}
              <div className="review-tags">
                {review.tags.map((tag, index) => (
                  <span key={index} className="review-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review

