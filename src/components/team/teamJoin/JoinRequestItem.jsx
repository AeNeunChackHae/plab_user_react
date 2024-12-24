import React, { useState } from 'react';
import styles from './JoinRequestItem.module.css';
import RejectReasonModal from './RejectReasonModal';

const JoinRequestItem = ({ request, onApprove, onReject }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleReject = (reason) => {
    onReject(request.id, reason);
    setShowRejectModal(false);
  };

  return (
    <div className={styles.item}>
      {/* 상태 메시지 */}
      {request.status === '승인대기' && (
        <p className={`${styles.statusMessage} ${styles.pending}`}>
          가입을 기다리고 있어요
        </p>
      )}

      {/* 프로필 정보 */}
      <div className={styles.profile}>
        <img
          src={request.profileImage || '/images/default-profile.png'}
          alt="프로필"
          className={styles.profileImage}
        />
        <div className={styles.details}>
          <span className={styles.name}>{request.name}</span>
          <span className={styles.info}>
            {request.gender} · {request.region} · {request.age} · {request.level}
          </span>
        </div>
      </div>

      {/* 신청 메시지 */}
      <div className={styles.message}>
        <span>{request.message || '가입 신청 메시지가 없습니다.'}</span>
      </div>

      {/* 승인/거절 버튼 */}
      {request.status === '승인대기' && (
        <div className={styles.actions}>
          <button
            className={styles.rejectButton}
            onClick={() => setShowRejectModal(true)}
          >
            거절하기
          </button>
          <button
            className={styles.approveButton}
            onClick={() => onApprove(request.id)}
          >
            승인하기
          </button>
        </div>
      )}

      {/* 거절 사유 모달 */}
      {showRejectModal && (
        <RejectReasonModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleReject}
        />
      )}
    </div>
  );
};

export default JoinRequestItem;
