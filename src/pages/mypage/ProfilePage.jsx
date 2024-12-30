import React, { useState } from "react";
import ProfileForm from "../../components/mypage/change-profile/ProfileForm";
import ImageUploadModal from "../../components/mypage/change-profile/ImageUploadModal";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageUpload = () => {
    setModalVisible(true);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="profile-image-container">
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/img_profile_default.png"
            alt="프로필 이미지"
            className="profile-image"
          />
          <button className="change-image-button" onClick={handleImageUpload}>
            사진 바꾸기
          </button>
        </div>
        <ProfileForm />
        {modalVisible && (
          <ImageUploadModal onClose={() => setModalVisible(false)} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

// fetch는 components/mypage/change-profile/ProfileForm.js 에서 함
