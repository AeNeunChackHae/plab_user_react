import React from "react";
import "./EmailInput.css";

const EmailInput = ({ email, onChange, onRequestCode, onRequestReAuth }) => {
  return (
    <div>
      <div className="info_text">
        <label htmlFor="email">등록된 이메일</label>
      </div>
      <div className="input-group">
        <div className="input-email">
          <input
            type="text"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="이메일 입력"
          />
          <div className="button-group">
            <button className="btn-inline" onClick={onRequestCode}>
              인증 요청
            </button>
            <button className="btn-inline" onClick={onRequestReAuth}>
              다시 인증
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
