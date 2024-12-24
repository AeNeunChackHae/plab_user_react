import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    age: false,
    sms: false,
    email: false,
  });

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

  return (
    <div className="signup-container">
      <div className="register-header">
        <h1 className="signup-title">스포츠가 주는</h1>
        <h1 className="signup-title">다양한 감정을 즐기며 살아가도록</h1>
      </div>
      <form className="signup-form">
        <label>
          <b>이메일</b>
          <input type="email" placeholder="이메일을 입력하세요" required />
        </label>

        <label>
          <b>비밀번호</b>
          <input type="password" placeholder="비밀번호를 입력하세요" required />
        </label>

        <label>
          <b>비밀번호 확인</b>
          <input
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요"
            required
          />
        </label>

        <label>
          <b>이름</b>
          <input type="text" placeholder="이름을 입력하세요" required />
          <p className="age-notice">
            2자 이상 10자 이하의 한글/영어로 설정해주세요
          </p>
        </label>

        <label>
          <b>성별</b>
          <select id="placeholder" required>
            <option value="">성별을 선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </label>

        <label className="birthdate-label">
          <b>생년월일</b>
          <div className="birthdate-selects">
            <select required>
              <option value="">년</option>
              {Array.from({ length: 100 }, (_, i) => 1924 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select required>
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select required>
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
            <input type="tel" placeholder="예) 01012345678" required />
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
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              자세히
            </a>
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
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              자세히
            </a>
          </label>
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.age}
              onChange={() => handleIndividualChange("age")}
              required
            />
            <span className="checkbox-custom"></span>만 14세 이상입니다 (필수)
            <a href="/age" target="_blank" rel="noopener noreferrer">
              자세히
            </a>
          </label>
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.sms}
              onChange={() => handleIndividualChange("sms")}
            />
            <span className="checkbox-custom"></span>
            이벤트, 프로모션 등 SMS 알림 정보 받기 (선택)
            <a href="/sms" target="_blank" rel="noopener noreferrer">
              자세히
            </a>
          </label>
          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.email}
              onChange={() => handleIndividualChange("email")}
            />
            <span className="checkbox-custom"></span>
            이벤트, 프로모션 등 이메일 알림 정보 받기 (선택)
            <a href="/email" target="_blank" rel="noopener noreferrer">
              자세히
            </a>
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
