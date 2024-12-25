import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    login_password: "",
    login_password_confirm: "",
    username: "",
    gender: "",
    year: "",
    month: "",
    day: "",
    phone_number: "",
  });

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    age: false,
    sms: false,
    email: false,
  });

  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAllChange = () => {
    const newState = !agreements.all;
    setAgreements({
      all: newState,
      terms: newState,
      privacy: newState,
      age: newState,
      sms: newState,
      email: newState,
    });
  };

  const handleIndividualChange = (key) => {
    setAgreements((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      const allChecked =
        updated.terms &&
        updated.privacy &&
        updated.age &&
        updated.sms &&
        updated.email;
      return { ...updated, all: allChecked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = { ...formData };

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("회원가입 실패 응답:", error);
        alert(`회원가입 실패: ${error.message}`);
        return;
      }

      const data = await response.json();
      console.log("회원가입 성공:", data);
      alert(`회원가입 성공! 이메일: ${data.email}`);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/auth/login");
    } catch (err) {
      console.error("네트워크 오류:", err);
      alert(`네트워크 오류가 발생했습니다: ${err.message}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="register-header">
        <h1 className="signup-title">스포츠가 주는</h1>
        <h1 className="signup-title">다양한 감정을 즐기며 살아가도록</h1>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          <b>이메일</b>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          <b>비밀번호</b>
          <input
            type="password"
            name="login_password"
            id="login_password"
            placeholder="비밀번호를 입력하세요"
            value={formData.login_password}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          <b>비밀번호 확인</b>
          <input
            type="password"
            name="login_password_confirm"
            id="login_password_confirm"
            placeholder="비밀번호를 한 번 더 입력하세요"
            value={formData.login_password_confirm}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          <b>이름</b>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="이름을 입력하세요"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <p className="age-notice">
            2자 이상 10자 이하의 한글/영어로 설정해주세요
          </p>
        </label>

        <label>
          <b>성별</b>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">성별을 선택하세요</option>
            <option value="0">남성</option>
            <option value="1">여성</option>
          </select>
        </label>

        <label className="birthdate-label">
          <b>생년월일</b>
          <div className="birthdate-selects">
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            >
              <option value="">년</option>
              {Array.from({ length: 100 }, (_, i) => 1924 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              required
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              required
            >
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label>
          <b>휴대폰 번호</b>
          <div className="phone-input">
            <input
              type="tel"
              name="phone_number"
              placeholder="예) 01012345678"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>
        </label>

        <div className="agreements">
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={handleAllChange}
            />
            <span className="checkbox-custom"></span>
            전체 동의
          </label>
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => handleIndividualChange("terms")}
              required
            />
            <span className="checkbox-custom"></span>
            이용약관 동의 (필수)
          </label>
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => handleIndividualChange("privacy")}
              required
            />
            <span className="checkbox-custom"></span>
            개인정보 수집 및 이용 동의 (필수)
          </label>
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.age}
              onChange={() => handleIndividualChange("age")}
              required
            />
            <span className="checkbox-custom"></span>
            만 14세 이상입니다 (필수)
          </label>
        </div>
        <button type="submit" className="signup-button">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUp;
