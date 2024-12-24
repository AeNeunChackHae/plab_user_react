import React, { useState } from 'react';
import styles from './JoinTeamModal.module.css';

const JoinTeamModal = ({ onClose, onSubmit }) => {
  const [message, setMessage] = useState(''); // 입력 메시지 상태 관리

  const handleSubmit = () => {
    const finalMessage = message.trim() === '' ? '팀 가입 신청합니다.' : message.trim();
    onSubmit(finalMessage); // 입력된 메시지 또는 기본 메시지 전달
    setMessage(''); // 입력 필드 초기화
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* 상단 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>
            ×
        </button>

        {/* 제목 */}
        <h2 className={styles.title}>가입 신청</h2>

        {/* 안내 문구 */}
        <span className={styles.description}>
          개인 정보 보호를 위해 연락처를 작성하지 마세요.
          <br />
          팀에게 내 프로필이 공개되고, 신청을 수락하면 내 연락처를 볼 수 있어요.
        </span>

        {/* 입력 필드 */}
        <textarea
          id="joinMessage"
          className={styles.textarea}
          placeholder="팀 가입 신청합니다."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 추가 안내 사항 */}
        <div className={styles.infoBox}>
          <p>이런 내용이 포함되면 좋아요 😊</p>
          <ul>
            <li>살고 있는 지역</li>
            <li>포지션</li>
            <li>나이</li>
            <li>실력 및 경력</li>
          </ul>
        </div>

        {/* 가입 신청 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          가입 신청하기
        </button>
      </div>
    </div>
  );
};

export default JoinTeamModal;