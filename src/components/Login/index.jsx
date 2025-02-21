import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";  // ✅ Supabase 추가

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // 1️⃣ `user_id`로 이메일 찾기
    const { data: users, error: userError } = await supabase
      .from("users")  // ✅ Supabase `users` 테이블에서 검색
      .select("email")
      .eq("user_id", userId)
      .single();
  
    if (userError || !users) {
      console.error("🚨 아이디를 찾을 수 없습니다.");
      alert("아이디가 존재하지 않습니다.");
      return;
    }
  
    const email = users.email;
  
    // 2️⃣ Supabase 로그인 실행
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,  // ✅ 찾은 이메일을 사용하여 로그인
      password: password,
    });
  
    if (error) {
      console.error("🚨 로그인 실패:", error.message);
      alert("로그인 실패: " + error.message);
      return;
    }
  
    console.log("✅ 로그인 성공! 세션:", data.session);
  
    // 3️⃣ JWT 저장 (Supabase에서 발급된 토큰 저장)
    localStorage.setItem("supabaseToken", data.session.access_token);
  
    alert("로그인 성공!");
    navigate("/");
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