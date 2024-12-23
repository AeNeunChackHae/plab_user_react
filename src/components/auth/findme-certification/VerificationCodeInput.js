import React from "react";
import "../Components/VerificationCodeInput.css";

const VerificationCodeInput = ({
  code,
  onChange,
  onResendCode,
  handleVerify,
  isCodeSent,
}) => {
  const verify = () => {
    handleVerify();
  };

  return (
    <div>
      <div className="info_text">
        <label htmlFor="verification-code">인증번호</label>
      </div>
      <div className="input-group-certify">
        <div className="input-certify">
          <input
            type="text"
            id="verification-code"
            value={code}
            onChange={onChange}
            placeholder="인증번호 입력"
          />
          <div className="btn-certify">
            <button
              className="btn-verify"
              onClick={verify}
              disabled={!isCodeSent}
            >
              인증 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
