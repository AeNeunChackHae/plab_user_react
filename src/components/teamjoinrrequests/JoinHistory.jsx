import React, { useState } from 'react';
import styles from './JoinHistory.module.css';
import joinHistory from '../../data/joinHistory.json';
import JoinDetailModal from './modals/JoinDetailModal.jsx';

const JoinHistory = () => {
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [hoveredId, setHoveredId] = useState(null); // 호버된 상태 확인용

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCancelRequest = () => {
    alert('가입 신청이 취소되었습니다.');
    setShowModal(false);
  };

  // 상태에 따라 메시지 설정
  const getStatusMessage = (status) => {
    if (status === '대기') return '승인을 기다리고 있어요';
    if (status === '취소') return '가입 신청을 취소했어요';
    if (status === '거절') return '승인이 거절됐어요';
    return '';
  };

  return (
    <div className={styles.container}>
      <h2>나의 가입신청 내역</h2>
      <ul>
        {joinHistory.joinHistory.map((item) => (
          <li key={item.id} className={styles.historyItem}>
            {/* 왼쪽에 표시될 정보 */}
            <div className={styles.info}>
              <span>{item.name}</span>
              <p>{getStatusMessage(item.status)}</p>
            </div>

            {/* 오른쪽에 신청 확인 버튼 */}
            <div
              className={`${styles.menuWrapper} ${
                hoveredId === item.id ? styles.hover : ''
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.menuButton}>⋮</div>
              <button
                className={styles.checkButton}
                onClick={() => handleOpenModal(item)}
              >
                신청 확인
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 모달 */}
      {showModal && (
        <JoinDetailModal
          data={selectedItem}
          onClose={() => setShowModal(false)}
          onCancel={handleCancelRequest}
        />
      )}
    </div>
  );
};

export default JoinHistory;
