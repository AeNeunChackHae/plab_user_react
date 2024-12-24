import React from "react";
import MainButton from "../../components/auth/register-complete/MainButton";
import "./SignupCompletionPage.css";
const SignupCompletionPage = () => {
  const handleGoToMain = () => {
    // Logic to navigate to the main page
    console.log("Navigating to the main page");
  };

  return (
    <div className="signup-completion-page">
      <div className="image-placeholder">
        {/* Replace this with the actual image path or URL */}
        <img
          src="https://static.wanted.co.kr/images/company/15911/mdvnimnvfv0sb35a__1080_790.jpg"
          alt="Signup Completion"
        />
        <div className="complete">
          <h2>회원가입이 완료되었습니다!</h2>
          <p className="complete-p">서로를 존중하는 풋볼러가 됩시다!</p>
        </div>
      </div>
      <main className="main-content">
        <MainButton onClick={handleGoToMain}>메인으로 가기</MainButton>
      </main>
    </div>
  );
};

export default SignupCompletionPage;
