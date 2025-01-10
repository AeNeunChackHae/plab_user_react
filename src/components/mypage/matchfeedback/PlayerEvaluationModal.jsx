import React, { useState, useEffect } from 'react';
import styles from './PlayerEvaluationModal.module.css';

const PlayerEvaluationModal = ({ matchId, currentUserId, onClose }) => {
  const [users, setUsers] = useState([]);

  const teamMapping = { 0: '레드', 1: '옐로우', 2: '블루' };

  const fetchMatchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/mypage/feedback/${matchId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error fetching users:', await response.json());
        return;
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchMatchUsers();
  }, [matchId]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>플레이어 평가</h2>
        <div className={styles.teamsContainer}>
          {Object.entries(teamMapping).map(([teamCode, teamName]) => (
            <div key={teamCode}>
              <h3>{teamName} 팀</h3>
              <ul>
                {users
                  .filter(user => user.user_team === parseInt(teamCode))
                  .map(user => {
                    let displayText = user.user_number + 1;
                    if (user.user_id === currentUserId) displayText = '나';
                    if (user.status_code === 2) displayText = '불참';
                    return (
                      <li key={user.user_id}>
                        <button
                          className={styles.playerButton}
                          style={{
                            backgroundColor:
                              teamName === '레드'
                                ? '#FF6347'
                                : teamName === '옐로우'
                                ? '#FFD700'
                                : '#1E90FF',
                            color: 'white',
                          }}
                        >
                          {displayText}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default PlayerEvaluationModal;
