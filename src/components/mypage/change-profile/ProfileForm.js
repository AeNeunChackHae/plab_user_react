import React, { useState } from "react";
import InputField from "./InputField";
import RadioButton from "./RadioButton";
import SubmitButton from "./SubmitButton";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    bio: "",
    gender: "",
    style: "",
    skill: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-section">
        <InputField
          type="text"
          label="이름"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
        <p className="profile-description">프로필에 표시되는 이름이에요</p>
        <InputField
          type="text"
          label="사용자 이름(닉네임)"
          name="username"
          value={profile.username}
          onChange={handleChange}
        />
        <p className="profile-description">
          사용자 이름은 프로필 페이지 주소로 사용돼요
        </p>
        <InputField
          type="text"
          label="소개"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          maxLength="100"
        />
      </div>
      <RadioButton
        name="gender"
        options={["남자", "여자"]}
        value={profile.gender}
        onChange={handleChange}
        label="성별"
        extraClass="gender"
      />
      <RadioButton
        name="style"
        options={["공격", "밸런스", "수비"]}
        value={profile.style}
        onChange={handleChange}
        label="좋아하는 스타일"
      />
      <RadioButton
        name="skill"
        options={["슛", "패스", "드리블", "체력", "스피드", "피지컬", "골키퍼"]}
        value={profile.skill}
        onChange={handleChange}
        label="자신있는 능력"
      />
      <SubmitButton label="저장하기" />
    </form>
  );
};

export default ProfileForm;
