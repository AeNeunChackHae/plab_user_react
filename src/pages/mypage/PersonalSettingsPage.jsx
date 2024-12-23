import React, { useState } from "react";
import Sidebar from "../../components/mypage/SideBar";
import MainMenu from "../../components/mypage/MainMenu";
import "./PersonalSettingsPage.css";

const PersonalSettingsPage = () => {
  const [hideLevel, setHideLevel] = useState(false);

  const user = {
    name: "김정섭",
    number: "1234567890",
    level: "R",
    levelName: "루키",
  };

  return (
    <div className="personal-settings-page">
      <Sidebar
        userName={user.name}
        userNumber={user.number}
        level={user.level}
        levelName={user.levelName}
        hideLevel={hideLevel}
        setHideLevel={setHideLevel} // setHideLevel만 전달
      />
      <MainMenu />
    </div>
  );
};

export default PersonalSettingsPage;
