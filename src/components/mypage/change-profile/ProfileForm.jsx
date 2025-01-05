import React, { useState, useEffect } from "react";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    username: "",
    introduce: "",
    gender: "", // 0 or 1
    prefer_position: "", // 0, 1, 2
    ability: "", // 0, 1, 2, 3, 4, 5, 6
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

      const response = await fetch("http://127.0.0.1:8080/mypage/change/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("✅ 사용자 데이터 불러오기 성공:", userData);

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
      console.error("🔴 프로필 정보 불러오기 오류:", error);
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ 입력 필드 변경 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;

    const numericFields = ["gender", "prefer_position", "ability"];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;

    setProfile((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // ✅ 버튼을 사용한 선택 핸들러
  const handleButtonClick = (name, value) => {
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
    } else {
      setSelectedImage(null);
    }
  };

  // ✅ 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // 메시지 초기화

    try {
      const token = getToken();
      if (!token) {
        setMessage("로그인이 필요합니다.");
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

      console.log("🔍 FormData 확인:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

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
        console.log("✅ 응답 데이터:", data);
        setMessage("✅ 프로필이 성공적으로 저장되었습니다.");
      } else {
        setMessage(`오류: ${data.message || "서버 오류"}`);
      }
    } catch (error) {
      console.error("🔴 요청 중 오류:", error);
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <form id="profile-form" onSubmit={handleSubmit} className="profile-form">
      {/* ✅ 프로필 이미지 섹션 */}
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
          id="profile_path"
          name="profile_path"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* ✅ 입력 필드 */}
      <div className="form-section">
        <label>
          이름
          <input
            id="username"
            name="username"
            type="text"
            value={profile.username}
            onChange={handleChange}
          />
        </label>
        <label>
          소개
          <input
            id="introduce"
            name="introduce"
            type="text"
            value={profile.introduce}
            onChange={handleChange}
            maxLength="100"
          />
        </label>
      </div>

      {/* ✅ 성별 */}
      <label>성별</label>
      <div>
        <button type="button" onClick={() => handleButtonClick("gender", 0)}>남자</button>
        <button type="button" onClick={() => handleButtonClick("gender", 1)}>여자</button>
      </div>

      {/* ✅ 선호 포지션 */}
      <label>좋아하는 스타일</label>
      <div>
        <button type="button" onClick={() => handleButtonClick("prefer_position", 0)}>공격</button>
        <button type="button" onClick={() => handleButtonClick("prefer_position", 1)}>밸런스</button>
        <button type="button" onClick={() => handleButtonClick("prefer_position", 2)}>수비</button>
      </div>

      {/* ✅ 자신있는 능력 */}
      <label>자신있는 능력</label>
      <div>
        {["슛", "패스", "드리블", "체력", "스피드", "피지컬", "골키퍼"].map((option, index) => (
          <button key={index} type="button" onClick={() => handleButtonClick("ability", index)}>
            {option}
          </button>
        ))}
      </div>

      <button type="submit">저장하기</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ProfileForm;
