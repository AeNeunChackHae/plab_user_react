import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignUp from "../pages/auth/SignUp";
import SignUpComplete from "../pages/auth/SignupCompletionPage";
import PasswordReset from "../pages/auth/PasswordChangePage";
import EmailCertification from "../pages/auth/EmailCertification";
import PasswordCertification from "../pages/auth/PasswordCertification";

function Auth() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/register/complete" element={<SignUpComplete />} />
      <Route path="/register/correctpw" element={<PasswordReset />} />
      <Route path="/find-email" element={<EmailCertification />} />
      <Route path="/find-password" element={<PasswordCertification />} />
    </Routes>
  );
}

export default Auth;
