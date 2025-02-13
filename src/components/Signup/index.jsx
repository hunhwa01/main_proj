import "./Signup.css";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleNext = async (event) => {
    event.preventDefault();

    const userId = event.target.userId.value.trim();
    const name = event.target.name.value.trim();
    const nickname = event.target.nickname.value.trim();
    const password = event.target.password.value;
    const confirmPassword = event.target["confirm-password"].value;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 로컬 스토리지 초기화
    localStorage.clear();

    try {
      // 중복 확인
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("user_id, nickname")
        .or(`user_id.eq.${userId},nickname.eq.${nickname}`);

      if (checkError) {
        console.error("중복 확인 오류:", checkError);
        alert("회원가입 중 문제가 발생했습니다.");
        return;
      }

      if (existingUser.length > 0) {
        if (existingUser.some((user) => user.user_id === userId)) {
          alert("이미 사용 중인 아이디입니다.");
        } else if (existingUser.some((user) => user.nickname === nickname)) {
          alert("이미 사용 중인 닉네임입니다.");
        }
        return;
      }

      // 데이터베이스에 초기 데이터 삽입
      const { error: insertError } = await supabase.from("users").insert([
        {
          user_id: userId,
          name,
          nickname,
          password, // 비밀번호는 평문으로 저장
        },
      ]);

      if (insertError) {
        console.error("데이터 삽입 오류:", insertError);
        alert("회원가입 중 문제가 발생했습니다.");
        return;
      }

      // `user_id`를 localStorage에 저장
      localStorage.setItem("user_id", userId);
      alert("1단계 회원가입이 완료되었습니다!");
      navigate("/Signup2Page");
    } catch (error) {
      console.error("예기치 못한 오류:", error);
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container" style={{ height: "100%", overflowY: "auto" }}>
      <div className="signup-header">
        <a href="/LoginPage" className="signup-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="signup-back-icon" />
        </a>
        <h1>
          <img src="/icons/logo.png" alt="로고" className="signup-logo" />
        </h1>
      </div>

      <div className="signup-content">
        <h1 className="signup-title">아이디와<br />비밀번호를 입력하시오</h1>

        <form className="signup-form" onSubmit={handleNext}>
          <div className="signup-form-group">
            <input type="text" id="userId" placeholder="아이디" className="login-input" required />
          </div>
          <div className="signup-form-group">
            <input type="text" id="name" placeholder="이름" className="login-input" required />
          </div>
          <div className="signup-form-group">
            <input type="text" id="nickname" placeholder="닉네임" className="login-input" required />
          </div>
          <div className="signup-form-group">
            <input type="password" id="password" placeholder="비밀번호" className="login-input" required />
          </div>
          <div className="signup-form-group">
            <input
              type="password"
              id="confirm-password"
              placeholder="비밀번호 확인"
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="signup-button">
            다음으로
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
