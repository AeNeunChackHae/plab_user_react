import React, { useState } from 'react';
import styles from './JoinTeamModal.module.css';

const JoinTeamModal = ({ onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() === '') {
      alert('가입 신청 메시지를 작성해주세요.');
      return;
    }
    onSubmit(message);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>가입 신청</h2>
        <p>
          개인 정보 보호를 위해 연락처를 작성하지 마세요.  
          팀에게 내 프로필이 공개되고, 신청을 수락하면 연락처를 볼 수 있어요.
        </p>
        <div className={styles.messageBox}>
          <p>팀 가입 신청합니다.</p>
          <div className={styles.info}>
            <p className={styles.highlight}>
              이런 내용이 포함되면 좋아요 😊
            </p>
            <ul>
              <li>살고 있는 지역</li>
              <li>포지션</li>
              <li>나이</li>
              <li>실력 및 경력</li>
            </ul>
          </div>
          <textarea
            placeholder="가입 신청 메시지를 작성해주세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <button onClick={handleSubmit} className={styles.submitButton}>
          가입 신청하기
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
      </div>
    </div>
  );
};

export default JoinTeamModal;
