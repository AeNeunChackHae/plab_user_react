import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileForm.module.css";

const ProfileForm = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    introduce: "",
    gender: "",
    prefer_position: "",
    ability: "",
    profile_path:
      "https://d31wz4d3hgve8q.cloudfront.net/static/img/img_profile_default.png",
  });

  const [selectedImage, setSelectedImage] = useState(null); // 이미지 파일 객체

  // 토큰
  const getToken = () => localStorage.getItem("authToken");

  // 서버에서 사용자 정보를 불러오는 함수
  const fetchUserProfile = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://127.0.0.1:8080/mypage/change/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        setProfile((prev) => ({
          ...prev,
          username: userData.username || "",
          introduce: userData.introduce || "",
          gender: Number(userData.gender) || 0,
          prefer_position: Number(userData.prefer_position) || 0,
          ability: Number(userData.ability) || 0,
          profile_path: userData.profile_path || prev.profile_path,
        }));
      } else {
        const errorData = await response.json();
        alert(`오류: ${errorData.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("프로필 정보 불러오기 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  }, [navigate]);
  
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // 입력 필드 변경 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericFields = ["gender", "prefer_position", "ability"];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;

    setProfile((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // 버튼 선택 핸들러 (성별, 포지션, 능력)
  const handleButtonClick = (name, value) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProfile((prev) => ({
        ...prev,
        profile_path: URL.createObjectURL(file),
      }));
    } else {
      setSelectedImage(null);
    }
  };

  // 필수 값 검증 함수
  const areAllFieldsFilled = () => {
    const { username, introduce, gender, prefer_position, ability } = profile;
    return (
      username.trim() !== "" &&
      introduce.trim() !== "" &&
      gender !== "" &&
      prefer_position !== "" &&
      ability !== ""
    );
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!areAllFieldsFilled()) {
      alert("모든 값을 입력해 주세요.");
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const formElement = document.getElementById("profile-form");
      const formData = new FormData(formElement);

      formData.set("gender", Number(profile.gender));
      formData.set("prefer_position", Number(profile.prefer_position));
      formData.set("ability", Number(profile.ability));

      if (selectedImage) {
        formData.set("profile_path", selectedImage);
      } else if (profile.profile_path.startsWith("http")) {
        formData.set("profile_path", profile.profile_path);
      } else {
        formData.set("profile_path", "");
      }

      // 디버깅용 메시지
      // console.log("FormData 확인:");
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const target_url = "http://127.0.0.1:8080/mypage/change/profile";

      const response = await fetch(target_url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("저장이 완료되었습니다.");
        navigate("/mypage");
      } else {
        alert(`오류: ${data.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("요청 중 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <form 
      id="profile-form"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      {/* 프로필 이미지 섹션 */}
    <div className={styles.profileImageSection}>
      <img
        src={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : profile.profile_path
        }
        alt="프로필 이미지"
        className={styles.profileImage}
      />
      <br />
      <label htmlFor="profile_path" className={styles.imageUploadButton}>
        사진 바꾸기
      </label>
      <input
        id="profile_path"
        name="profile_path"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.hiddenFileInput}
      />
    </div>


      {/* 입력 필드 */}
      <div className={styles.inputField}>
        <label className={styles.labelTitle}>이름</label>
        <input
          id="username"
          name="username"
          type="text"
          value={profile.username}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.labelTitle}>소개</label>
        <input
          id="introduce"
          name="introduce"
          type="text"
          value={profile.introduce}
          onChange={handleChange}
          maxLength="100"
        />
      </div>

      {/* 성별 */}
      <div>
        <label className={styles.labelTitle}>성별</label>
        <div className={styles.genderButtonGroup}>
          <button 
            type="button"
            onClick={() => handleButtonClick("gender", 0)}
            className={`${profile.gender === 0 ? styles.active : ''}`}  
          >
            남자
          </button>
          <button 
            type="button" 
            onClick={() => handleButtonClick("gender", 1)}
            className={`${profile.gender === 1 ? styles.active : ''}`}
          >
            여자
          </button>
        </div>
      </div>

      {/* 선호 포지션 */}
      <div>
        <label className={styles.labelTitle}>좋아하는 스타일</label>
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={() => handleButtonClick("prefer_position", 0)}
            className={`${profile.prefer_position === 0 ? styles.active : ''}`}
          >
            공격
          </button>
          <button 
            type="button" 
            onClick={() => handleButtonClick("prefer_position", 1)}
            className={`${profile.prefer_position === 1 ? styles.active : ''}`}
          >
            밸런스
          </button>
          <button 
            type="button" 
            onClick={() => handleButtonClick("prefer_position", 2)}
            className={`${profile.prefer_position === 2 ? styles.active : ''}`}
          >
            수비
          </button>
        </div>
      </div>

      {/* 자신있는 능력 */}
      <div>
        <label className={styles.labelTitle}>자신있는 능력</label>
        <div className={styles.buttonGroup}>
          {["슛", "패스", "드리블", "체력", "스피드", "피지컬", "골키퍼"].map((option, index) => (
            <button 
              key={index} 
              type="button" 
              onClick={() => handleButtonClick("ability", index)}
              className={`${profile.ability === index ? styles.active : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>저장하기</button>
    </form>
  );
};

export default ProfileForm;
