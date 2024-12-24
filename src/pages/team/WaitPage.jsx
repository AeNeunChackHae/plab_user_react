import React, { useState } from 'react';
import styles from './WaitPage.module.css';
import joinHistory from '../../components/dummydata/joinHistory.js';
import JoinDetailModal from '../../components/team/teamJoinRequests/modals/JoinDetailModal.jsx';

const JoinHistory = () => {
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [dropdownId, setDropdownId] = useState(null); // 드롭다운 상태

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
    if (status === '취소') return '신청을 취소했어요';
    if (status === '거절') return '팀에서 가입을 거절했어요';
    return '';
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>나의 가입 신청 내역</h2>
      <ul className={styles.list}>
      {joinHistory.joinHistory.map((item) => (
          <li key={item.id} className={styles.historyItem}>
            {/* 팀 로고 */}
            <div className={styles.logoWrapper}>
              <img src={item.logo} alt='팀 로고' className={styles.logo} />
            </div>
            {/* 정보 */}
            <div className={styles.info}>
              <span
                className={`${styles.statusMessage} ${
                  item.status === '대기'
                    ? styles.pending
                    : item.status === '거절'
                    ? styles.rejected
                    : ''
                }`}
              >
                {getStatusMessage(item.status)}
              </span> <br />
              <span className={styles.name}>{item.name}</span>
            </div>
            {/* 메뉴 버튼 */}
            <div
              className={styles.menuWrapper}
              onMouseEnter={() => setDropdownId(item.id)}
              onMouseLeave={() => setDropdownId(null)}
            >
              <div className={styles.menuButton}>⋮</div>
              {/* 드롭다운 메뉴 */}
              {dropdownId === item.id && (
                <div
                  className={styles.menuDropdown}
                  onMouseEnter={() => setDropdownId(item.id)} // 메뉴에 커서 올리면 유지
                  onMouseLeave={() => setDropdownId(null)}   // 메뉴에서 벗어나면 닫힘
                >
                  <button
                    className={styles.checkButton}
                    onClick={() =>
                      handleOpenModal(
                        joinHistory.joinHistory.find((historyItem) => historyItem.id === item.id)
                      )
                    }
                  >
                    신청 확인
                  </button>
                </div>
              )}
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
