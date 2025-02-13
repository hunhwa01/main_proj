import "./Signup2.css";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

function Signup2() {
  const navigate = useNavigate();

  const handleNext = async (event) => {
    event.preventDefault();

    // 입력값 가져오기
    const userTel = event.target.usertel.value.trim();
    const userAddress = event.target.useraddress.value.trim();
    const userEmail = event.target.useremail.value.trim();
    const userId = localStorage.getItem("user_id");

    // 필수 입력값 확인
    if (!userTel || !userAddress || !userEmail) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      // 데이터 업데이트
      const { error } = await supabase
        .from("users")
        .update({
          phone_number: userTel,
          address: userAddress,
          email: userEmail,
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating data:", error);
        alert(`회원가입 중 문제가 발생했습니다: ${error.message}`);
        return;
      }

      // 성공 메시지 및 페이지 이동
      alert("회원가입이 완료되었습니다!");
      navigate("/LoginPage");
    } catch (error) {
      console.error("Unhandled error:", error);
      alert(`알 수 없는 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <div className="signup2-container" style={{ height: "100%", overflowY: "auto" }}>
      <div className="signup2-header">
        <a href="/SignupPage" className="signup2-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="signup2-back-icon" />
        </a>
        <h1>
          <img src="/icons/logo.png" alt="로고" className="signup2-logo" />
        </h1>
      </div>

      <div className="signup2-content">
        <h1 className="signup2-title">전화번호, 주소, 이메일을 입력하시오</h1>

        <form className="signup2-form" onSubmit={handleNext}>
          <div className="signup2-form-group">
            <input
              type="text"
              id="usertel"
              placeholder="전화번호"
              className="signup2-tel-input"
              required
            />
          </div>

          <div className="signup2-form-group">
            <input
              type="text"
              id="useraddress"
              placeholder="내 주소"
              className="signup2-address-input"
              required
            />
          </div>

          <div className="signup2-form-group">
            <input
              type="email"
              id="useremail"
              placeholder="이메일"
              className="signup2-email-input"
              required
            />
          </div>

          <button type="submit" className="signup2-button">
            회원가입
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup2;
