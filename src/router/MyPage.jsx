import React from "react";
import { Routes, Route } from "react-router-dom";
import PersonalSettingsPage from "../pages/mypage/PersonalSettingsPage";
import SettingsPage from "../pages/mypage/SettingPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import MyPlabPage from "../pages/mypage/MyPlabPage";
import MyLevelPage from "../pages/mypage/MyLevelPage";
import BlacklistManager from "../pages/mypage/BlackListPage";
import "../pages/mypage/page-style.css";
import PasswordChange from "../pages/mypage/PasswordChangePage";
import UserFeedbackPage from "../pages/mypage/UserFeedbackPage";
import StadiumFeedbackPage from "../pages/mypage/StadiumFeedbackPage";

function Mypage() {
  return (
    <Routes>
      <Route path="/" element={<PersonalSettingsPage />} />
      <Route path="/myplab" element={<MyPlabPage />} />
      <Route path="/change/profile" element={<ProfilePage />} />
      <Route path="/blacklist" element={<BlacklistManager />} />
      <Route path="/change/pw" element={<PasswordChange />} />
      <Route path="/change/general" element={<SettingsPage />} />
      <Route path="/mylevel" element={<MyLevelPage />} />
      <Route path="/feedback/:matchId/user" element={<UserFeedbackPage />} />
      <Route path="/feedback/:matchId/stadium" element={<StadiumFeedbackPage />} />
    </Routes>
  );
}

export default Mypage;
