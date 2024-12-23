import React from "react";
import UserInfo from "../Components/UserInfo";
import ChangePasswordButton from "../Components/ChangePasswordButton";

const EmailVerifiedPage = () => {
  const email = "abcd@naver.com"; // 인증된 이메일 예시

  return (
    <div>
      <UserInfo email={email} />
      <ChangePasswordButton />
    </div>
  );
};

export default EmailVerifiedPage;
