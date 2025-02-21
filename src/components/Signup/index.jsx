"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");

    const handleNext = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const signupData = {
            user_id: userId,
            password: password,
            nickname: nickname,
            name: name,
        };

        localStorage.setItem("signupData", JSON.stringify(signupData)); // ✅ LocalStorage에 저장
        navigate("/signup2Page"); // 다음 단계로 이동
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
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
                               placeholder="아이디" className="signup-input" required />
                    </div>
                    <div className="signup-form-group">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                               placeholder="이름" className="signup-input" required />
                    </div>
                    <div className="signup-form-group">
                        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}
                               placeholder="닉네임" className="signup-input" required />
                    </div>
                    <div className="signup-form-group">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                               placeholder="비밀번호" className="signup-input" required />
                    </div>
                    <div className="signup-form-group">
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                               placeholder="비밀번호 확인" className="signup-input" required />
                    </div>

                    <button type="submit" className="signup-button">
                        다음으로
                    </button>
                </form>
            </div>
        </div>
    );
}