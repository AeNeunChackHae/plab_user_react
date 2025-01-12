import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    login_password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // ★ 로그인 상태라면 메인 페이지로 이동
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`로그인 실패: ${error.message}`);
        return;
      }

      const data = await response.json();

      // 로그인 성공 시 토큰과 사용자 정보 저장
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("id", data.id);

      alert(`로그인 성공! 환영합니다: ${data.username}`);

      // 이전 경로로 이동 (state에서 가져오기)
      const redirectPath = location.state?.from || "/"; 
      navigate(redirectPath);
    } catch (err) {
      alert(`네트워크 오류가 발생했습니다: ${err.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div>
            <label id="label-title" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="label-email"
              placeholder="이메일 주소를 입력하세요"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label id="label-title" htmlFor="login_password">
              비밀번호
            </label>
            <input
              type="password"
              name="login_password"
              id="label-password"
              placeholder="비밀번호를 입력하세요"
              value={formData.login_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">로그인</button>
          <div className="footer-links">
            <a className="footer-links-text" href="/auth/find-email">
              아이디/비밀번호 찾기
            </a>
            <a className="footer-links-text" href="/auth/register">
              회원 가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
