import React, { useState, useEffect } from "react";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    username: "",
    introduce: "",
    gender: "",
    prefer_position: "",
    ability: "",
    profile_path:
      "https://d31wz4d3hgve8q.cloudfront.net/static/img/img_profile_default.png",
  });

  const [message, setMessage] = useState(""); // 요청 결과 메시지
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 파일 객체

  // ✅ 토큰 가져오기
  const getToken = () => localStorage.getItem("authToken");

  // ✅ 서버에서 사용자 정보를 불러오는 함수
  const fetchUserProfile = async () => {
    try {
      const token = getToken();
      if (!token) {
        setMessage("로그인이 필요합니다.");
        return;
      }

      const response = await fetch("/mypage/change/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setProfile({
          username: userData.username || "",
          introduce: userData.introduce || "",
          gender: userData.gender || "",
          prefer_position: userData.prefer_position || "",
          ability: userData.ability || "",
          profile_path: userData.profile_path || profile.profile_path,
        });
      } else {
        const errorData = await response.json();
        setMessage(`오류: ${errorData.message || "서버 오류"}`);
      }
    } catch (error) {
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ 입력 필드 변경 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProfile((prev) => ({
        ...prev,
        profile_path: URL.createObjectURL(file),
      }));
    }
  };

  // ✅ 폼 제출 핸들러 (PUT 요청)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // 메시지 초기화

    try {
      const token = getToken();
      if (!token) {
        setMessage("로그인이 필요합니다.");
        return;
      }

      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("introduce", profile.introduce);
      formData.append("gender", profile.gender);
      formData.append("prefer_position", profile.prefer_position);
      formData.append("ability", profile.ability);

      // 이미지 파일이 있을 경우 추가
      if (selectedImage) {
        formData.append("profile_path", selectedImage);
      }

      const response = await fetch("/mypage/change/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("프로필이 성공적으로 저장되었습니다.");
      } else {
        const errorData = await response.json();
        setMessage(`오류: ${errorData.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("🔴 요청 중 오류:", error);
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {/* ✅ 프로필 이미지 섹션 (상단 배치) */}
      <div className="profile-image-section">
        <h3>프로필 이미지 수정</h3>
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : profile.profile_path
          }
          alt="프로필 이미지"
          className="profile-image"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-image-input"
        />
      </div>

      {/* ✅ 입력 필드 */}
      <div className="form-section">
        <label>
          이름
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </label>
        <label>
          소개
          <input
            type="text"
            name="introduce"
            value={profile.introduce}
            onChange={handleChange}
            maxLength="100"
          />
        </label>
      </div>

      {/* ✅ 성별 선택 */}
      <div className="radio-group">
        <label>성별</label>
        {["남자", "여자"].map((option) => (
          <button
            key={option}
            type="button"
            className={`radio-button ${
              profile.gender === option ? "selected" : ""
            }`}
            onClick={() =>
              handleChange({ target: { name: "gender", value: option } })
            }
          >
            {option}
          </button>
        ))}
      </div>

      {/* ✅ 좋아하는 스타일 */}
      <div className="radio-group">
        <label>좋아하는 스타일</label>
        {["공격", "밸런스", "수비"].map((option) => (
          <button
            key={option}
            type="button"
            className={`radio-button ${
              profile.prefer_position === option ? "selected" : ""
            }`}
            onClick={() =>
              handleChange({ target: { name: "prefer_position", value: option } })
            }
          >
            {option}
          </button>
        ))}
      </div>

      {/* ✅ 자신있는 능력 */}
      <div className="radio-group">
        <label>자신있는 능력</label>
        {["슛", "패스", "드리블", "체력", "스피드", "피지컬", "골키퍼"].map(
          (option) => (
            <button
              key={option}
              type="button"
              className={`radio-button ${
                profile.ability === option ? "selected" : ""
              }`}
              onClick={() =>
                handleChange({ target: { name: "ability", value: option } })
              }
            >
              {option}
            </button>
          )
        )}
      </div>

      <button type="submit" className="submit-button">
        저장하기
      </button>
      {message && <p className="response-message">{message}</p>}
    </form>
  );
};

export default ProfileForm;
