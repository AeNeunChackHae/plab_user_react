import React from "react";
import ProfileForm from "../../components/mypage/change-profile/ProfileForm.jsx";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="body">
      <div className="container">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
