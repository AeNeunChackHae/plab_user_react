import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import RadioButton from "./RadioButton";
import SubmitButton from "./SubmitButton";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    email: "", // 서버에서 불러오는 이메일
    username: "",
    introduce: "",
    gender: "",
    prefer_position: "",
    ability: "",
  });

  const [message, setMessage] = useState(""); // 요청 결과 메시지

  // 서버에서 유저 데이터를 불러오는 함수
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/mypage/change/profile"
      ); // 서버에서 유저 데이터 가져오기
      if (response.ok) {
        const userData = await response.json();
        setProfile((prev) => ({
          ...prev,
          email: userData.email || "", // email
          username: userData.username || "",
          introduce: userData.introduce || "",
          gender: userData.gender || "",
          prefer_position: userData.prefer_position || "",
          ability: userData.ability || "",
        }));
      } else {
        setMessage("프로필 정보를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 정보 불러오기 오류:", error);
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  // 컴포넌트 마운트 시 유저 데이터를 불러옵니다.
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // 메시지 초기화

    try {
      // 서버로 JSON 데이터 전송
      const response = await fetch("/mypage/change/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile), // JSON 데이터로 변환
      });

      if (response.ok) {
        setMessage("프로필이 성공적으로 저장되었습니다.");
      } else {
        const errorData = await response.json();
        setMessage(`오류: ${errorData.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("요청 중 오류:", error);
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-section">
        <InputField
          type="text"
          label="이메일"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled // 이메일 필드를 완전히 비활성화
        />
        <p className="profile-description">이메일은 변경할 수 없습니다.</p>
        <InputField
          type="text"
          label="이름"
          name="username"
          value={profile.username}
          onChange={handleChange}
        />
        <p className="profile-description">프로필에 표시되는 이름이에요</p>
        <InputField
          type="text"
          label="소개"
          name="introduce"
          value={profile.introduce}
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
      <div className="gong100"></div>
      <RadioButton
        name="prefer_position"
        options={["공격", "밸런스", "수비"]}
        value={profile.prefer_position}
        onChange={handleChange}
        label="좋아하는 스타일"
      />
      <div className="gong100"></div>
      <RadioButton
        name="ability"
        options={["슛", "패스", "드리블", "체력", "스피드", "피지컬", "골키퍼"]}
        value={profile.ability}
        onChange={handleChange}
        label="자신있는 능력"
      />
      <SubmitButton label="저장하기" />
      {message && <p className="response-message">{message}</p>}
    </form>
  );
};

export default ProfileForm;
