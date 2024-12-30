import React, { useState, useEffect } from "react";
import ModalBirthdate from "../../components/mypage/change-general/ModalBirthdate";
import "./SettingPage.css";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    username: "", // 기본값 설정
    id: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalField, setModalField] = useState("");

  useEffect(() => {
    // DB에서 데이터 가져오기
    fetch("/api/user/profile")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("유저 데이터를 가져오는 중 오류 발생:", error);
        setError("유저 데이터를 불러오는 데 실패했습니다.");
        setLoading(false); // 로딩 상태 해제
      });
  }, []);

  const openModal = (field) => {
    setModalField(field);
    setShowModal(true);
  };

  const handleSave = (newValue) => {
    const updatedData = { ...userData, [modalField]: newValue };
    setUserData(updatedData);

    fetch(`/api/user/${modalField}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [modalField]: newValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터 업데이트 중 오류 발생");
        }
        console.log(`${modalField}이(가) 성공적으로 업데이트되었습니다.`);
      })
      .catch((error) => {
        console.error("데이터 업데이트 중 오류 발생:", error);
      });

    setShowModal(false);
  };

  const handleLogout = () => {
    console.log("로그아웃되었습니다.");
    localStorage.removeItem("authToken"); // 토큰 삭제
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className="settings-page">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* 기본 설정 */}
          <section className="section">
            <h2 className="section-title">기본 설정</h2>
            <div className="setting-item">
              <div>
                <span className="setting-label">
                  {userData.username || "사용자 이름 없음"}님의 계정
                </span>
                <span className="setting-detail">
                  {userData.accountNumber || "N/A"}
                </span>
              </div>
            </div>
            <div className="setting-item">
              <div>
                <span className="setting-label">생년월일</span>
                <span className="setting-detail">
                  {userData.birthdate || "입력되지 않음"}
                </span>
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
                <span className="setting-label">비밀번호 바꾸기</span>
              </div>
              <button
                className="edit-button"
                onClick={() =>
                  (window.location.href = "/auth/register/correctpw")
                }
              >
                수정
              </button>
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
              </button>
            </div>
          </section>
        </>
      )}

      {/* 수정 모달 */}
      {showModal && modalField === "birthdate" && (
        <ModalBirthdate
          currentValue={userData.birthdate}
          onSave={(newValue) => handleSave(newValue)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;
