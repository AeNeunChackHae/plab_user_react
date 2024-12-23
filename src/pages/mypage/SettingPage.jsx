import React, { useState } from "react";
import ModalBirthdate from "../../components/mypage/change-general/ModalBirthdate";
import ModalPreferredLocation from "../../components/mypage//change-general/ModalPreferredLocation";
import "./SettingPage.css";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    username: "김정섭",
    accountNumber: "1234567890",
    birthdate: "1985-08-02",
    preferredLocation: "서울 종로구",
  });

  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [isLevelHidden, setIsLevelHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalField, setModalField] = useState("");

  const openModal = (field) => {
    setModalField(field);
    setShowModal(true);
  };

  const handleSave = (newValue) => {
    setUserData((prevData) => ({ ...prevData, [modalField]: newValue }));
    setShowModal(false);
  };

  const handleLogout = () => {
    console.log("로그아웃되었습니다.");
    localStorage.removeItem("authToken"); // 예시: 토큰 삭제
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  return (
    <div className="settings-page">
      {/* 기본 설정 */}
      <section className="section">
        <h2 className="section-title">기본 설정</h2>
        <div className="setting-item">
          <div>
            <span className="setting-label">김정섭님의 계정</span>
            <span className="setting-detail">{userData.accountNumber}</span>
          </div>
        </div>
        <div className="setting-item">
          <div>
            <span className="setting-label">생년월일</span>
            <span className="setting-detail">{userData.birthdate}</span>
          </div>
          <button
            className="edit-button"
            onClick={() => openModal("birthdate")}
          >
            수정
          </button>
        </div>
        <div className="setting-item">
          <div>
            <span className="setting-label">선호 지역</span>
            <span className="setting-detail">{userData.preferredLocation}</span>
          </div>
          <button
            className="edit-button"
            onClick={() => openModal("preferredLocation")}
          >
            수정
          </button>
        </div>
        <div className="setting-item">
          <div>
            <span className="setting-label">비밀번호 바꾸기</span>
          </div>
          <button
            className="edit-button"
            onClick={() => (window.location.href = "/mypage/change/password")}
          >
            수정
          </button>
        </div>
      </section>

      {/* 공개 설정 */}
      <section className="section">
        <h2 className="section-title">공개 설정</h2>
        <div className="setting-item">
          <div className="setting-label">프로필 공개</div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isProfilePublic}
              onChange={() => setIsProfilePublic(!isProfilePublic)}
            />
            <span className="slider round" />
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-label">레벨 가리기</div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isLevelHidden}
              onChange={() => setIsLevelHidden(!isLevelHidden)}
            />
            <span className="slider round" />
          </label>
        </div>
      </section>

      {/* 계정 설정 */}
      <section className="section">
        <h2 className="section-title">계정</h2>
        <div className="setting-item">
          <button className="link-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        <div className="setting-item">
          <button
            className="link-button"
            onClick={() => (window.location.href = "/mypage/withdrawal")}
          >
            탈퇴하기
          </button>{" "}
          {/*탈퇴 온클릭 이거 되려나 모르겟네*/}
        </div>
      </section>

      {/* 수정 모달 */}
      {showModal && modalField === "birthdate" && (
        <ModalBirthdate
          currentValue={userData.birthdate}
          onSave={(newValue) => handleSave(newValue)}
          onClose={() => setShowModal(false)}
        />
      )}
      {showModal && modalField === "preferredLocation" && (
        <ModalPreferredLocation
          currentValue={userData.preferredLocation}
          onSave={(newValue) => handleSave(newValue)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;
