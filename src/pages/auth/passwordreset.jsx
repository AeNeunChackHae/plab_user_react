import React, { useState } from "react";
import EmailInput from "../Components/EmailInput";
import VerificationCodeInput from "../Components/VerificationCodeInput";
import "./passwordreset.css";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestCode = () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    alert("인증번호가 발송되었습니다. 이메일을 확인하세요.");
    setIsCodeSent(true);
  };

  const handleResendCode = () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    alert("인증번호가 다시 발송되었습니다. 이메일을 확인하세요.");
  };

  const handleVerify = () => {
    if (!verificationCode.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    alert("인증이 확인되었습니다. 다음 페이지로 이동합니다.");
    // Navigate to the next page
  };

  return (
    <div className="container">
      <h2>비밀번호 찾기</h2>
      <EmailInput
        email={email}
        onChange={(e) => setEmail(e.target.value)}
        onRequestCode={handleRequestCode}
        onRequestReAuth={handleResendCode}
      />
      <VerificationCodeInput
        code={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        onResendCode={handleResendCode}
        onRequestCode={handleRequestCode}
        handleVerify={handleVerify}
        isCodeSent={isCodeSent}
      />
    </div>
  );
};

export default PasswordReset;
