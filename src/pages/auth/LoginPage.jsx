import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <form>
          <div>
            <label id="label-title" htmlFor="email">
              이메일
            </label>
            <input
              type="text"
              id="label-email"
              placeholder="이메일 주소를 입력하세요"
            />
          </div>
          <div>
            <label id="label-title" htmlFor="password">
              비밀번호
            </label>
            <input
              type="password"
              id="label-password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" id="remember-id">
              아이디 저장
            </label>
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
