import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    login_password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token: ", token, typeof token);
    if (token) {
      console.log(` if (token)`)
      navigate("/");
    }
  },[navigate]);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`입력 변경 - ${name}: ${value}`); // 입력 값 변경 로그
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("로그인 요청 데이터:", formData); // 전송 데이터 디버깅

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("응답 상태 코드:", response.status); // 응답 상태 디버깅
      console.log("응답 헤더:", response.headers); // 응답 헤더 디버깅

      if (!response.ok) {
        const error = await response.json();
        console.error("로그인 실패 JSON 응답:", error);
        alert(`로그인 실패: ${error.message}`);
        return;
      }

      const data = await response.json();
      console.log("로그인 성공 데이터:", data); // 성공 응답 데이터 디버깅

      // 토큰과 사용자 정보 저장
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("id", data.id);

      alert(`로그인 성공! 환영합니다: ${data.id} `);
      navigate("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      console.error("네트워크 오류:", err); // 네트워크 오류 디버깅
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
            <a className="footer-links-text" href="/find-id-password">
              아이디/비밀번호 찾기
            </a>
            <a className="footer-links-text" href="/signup">
              회원 가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
