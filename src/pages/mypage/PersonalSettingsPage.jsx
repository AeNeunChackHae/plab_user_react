import React from "react";
import Sidebar from "../../components/mypage/SideBar";
import MainMenu from "../../components/mypage/MainMenu";
import "./PersonalSettingsPage.css";

const PersonalSettingsPage = () => {
  return (
    <div className="personal-settings-page">
      <Sidebar />
      <MainMenu />
    </div>
  );
};

export default PersonalSettingsPage;
