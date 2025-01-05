import React from "react";
import ProfileForm from "../../components/mypage/change-profile/ProfileForm.jsx";
import styles from "./ProfilePage.module.css"

const ProfilePage = () => {
  return (
    <div className={styles.container}>
        <ProfileForm />
    </div>
  );
};

export default ProfilePage;
