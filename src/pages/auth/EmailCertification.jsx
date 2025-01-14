import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FindEmailAndPassword.module.css"; // 회원가입 페이지와 유사한 스타일 적용
import { config } from "../../config";

const FindEmail = () => {
  const api = config.aws.ec2_host_user
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFindEmail = async () => {
    try {
      const response = await fetch(`${api}/auth/find-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail(data.email);
        setError("");
        setIsModalOpen(true); // 모달 열기
      } else {
        setEmail("");
        setError(data.message || "사용자를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("이메일 찾기 오류:", err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div>
          <p className={styles.signupPageText}>이름</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <p className={styles.signupPageText}>전화번호</p>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button onClick={handleFindEmail} className={styles.button}>
          이메일 찾기
        </button>
      </form>
      
      {error && <p className={styles.error}>{error}</p>}

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>회원님의 이메일</h3>
            <p>당신의 이메일: {email}</p>
            <button onClick={closeModal} className={styles.modalButton}>
              확인
            </button>
          </div>
        </div>
      )}

      <button onClick={() => navigate("/auth/login")} className={styles.loginButton}>
        로그인 페이지로
      </button>
      <div className={styles.links}>
        <span onClick={() => navigate('/auth/find-password')} className={styles.linkButton}>
          비밀번호 재설정
        </span>
      </div>
      </div>
    </div>
  );
};

export default FindEmail;
