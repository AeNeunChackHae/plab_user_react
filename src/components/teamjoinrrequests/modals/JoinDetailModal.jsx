import React from 'react';
import styles from './JoinDetailModal.module.css';

const JoinDetailModal = ({ data, onClose, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>내 신청</h3>
          <span className={styles.date}>{data.date} 신청</span>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <div className={styles.content}>
          <p>{data.message}</p>
          {data.status === '대기' && (
            <button className={styles.cancelButton} onClick={onCancel}>
              신청 취소하기
            </button>
          )}
          {data.status === '거절' && (
            <div className={styles.reason}>
              <p className={styles.reasonTitle}>취소 사유</p>
              <p>{data.reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinDetailModal;
