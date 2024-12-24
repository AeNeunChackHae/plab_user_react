import React, { useState } from 'react';
import styles from './RejectReasonModal.module.css';

const RejectReasonModal = ({ onClose, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    '가입하지 않기로 했어요',
    '연락이 안돼요',
    '플레이 스타일이 맞지 않아요',
    '실력이 맞지 않아요',
    '나이가 맞지 않아요',
    '모집이 마감됐어요',
  ];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleConfirm = () => {
    if (!selectedReason) {
      alert('거절 사유를 선택해주세요.');
      return;
    }
    onConfirm(selectedReason);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>거절 사유를 선택해주세요</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.reasonList}>
          {reasons.map((reason, index) => (
            <label key={index} className={styles.reasonItem}>
              <input
                type="checkbox"
                checked={selectedReason === reason}
                onChange={() => handleReasonSelect(reason)}
              />
              {reason}
            </label>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectReasonModal;
