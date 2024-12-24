import React, { useState } from "react";
import {
  InputField,
  Button,
} from "../../components/auth/register-correctpw/InputField";
import "./PasswordChangePage.css";

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = "dosmsckrgo@naver.com"; // Example email, replace with dynamic data if needed.

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      alert("비밀번호가 성공적으로 변경되었습니다. 로그인하세요.");
    } else {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  return (
    <div className="container-pwchange">
      <div className="form-box">
        <h1 className="email-display">{email}</h1>
        <InputField
          label="새 비밀번호"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="password-guidelines">
          <p>다른 개인정보와 비슷한 비밀번호는 사용할 수 없습니다.</p>
          <p>비밀번호는 최소 8자 이상이어야 합니다.</p>
          <p>비밀번호는 일상적으로 사용되는 비밀번호일 수 없습니다.</p>
          <p>비밀번호는 전부 숫자로 할 수 없습니다.</p>
        </div>
        <InputField
          label="새 비밀번호 (확인)"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSave}>저장하고 로그인하기</Button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
