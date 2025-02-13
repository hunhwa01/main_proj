import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, password: password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패! 아이디 또는 비밀번호를 확인해주세요.");
      }

      const data = await response.json();

      // ✅ 로그인 성공 시, user_id 및 token 저장
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("token", data.token);

      alert("로그인 성공!");
      navigate("/"); // 로그인 후 메인 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container" style={{ height: "100%", overflowY: "auto" }}>
      <div className="login-header">
        <a href="/" className="login-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="login-back-icon" />
        </a>
        <h1>
          <img src="/icons/logo.png" alt="로고" className="login-logo" />
        </h1>
      </div>

      <div className="login-content">
        <h1 className="login-title">로그인 하시겠어요?</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            <input
              type="text"
              id="username"
              placeholder="아이디"
              className="login-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-login-button">
            로그인
          </button>
        </form>

        <div className="login-signup-container">
          <a href="/SignupPage" className="login-signup-link">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
