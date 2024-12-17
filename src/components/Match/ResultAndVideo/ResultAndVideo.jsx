import React, { useState } from 'react';
import { matchData } from '../../dummyData/dummyData';
import styles from './ResultAndVideo.module.css';
import { FaPlay, FaDownload } from 'react-icons/fa';

const ResultAndVideo = ({ showIcons = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getResult = (team1Score, team2Score) => {
    if (team1Score > team2Score) return '승';
    if (team1Score < team2Score) return '패';
    return '무';
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h4 className={styles.title}>일정 및 결과</h4>
      </div>
      <div className={styles.content}>
        {matchData.results.map((match, index) => (
          <div key={index} className={styles.resultRow}>
            <div className={`${styles.teamInfo} ${styles.teamInfoLeft}`}>
              <img
                src={match.team1.emblem}
                alt={`${match.team1.name} emblem`}
                className={styles.teamEmblem}
              />
              <span className={styles.teamText}>
                {match.team1.name} ({getResult(match.team1.score, match.team2.score)})
              </span>
            </div>
            <div className={styles.scoreBlock}>
              <span className={styles.score}>
                {match.team1.score} : {match.team2.score}
              </span>
            </div>
            <div className={`${styles.teamInfo} ${styles.teamInfoRight}`}>
              <span className={styles.teamText}>
                {match.team2.name} ({getResult(match.team2.score, match.team1.score)})
              </span>
              <img
                src={match.team2.emblem}
                alt={`${match.team2.name} emblem`}
                className={styles.teamEmblem}
              />
            </div>
            {showIcons && (
              <div className={styles.iconBlock}>
                <FaPlay className={styles.icon} onClick={openModal} />
                <FaDownload className={styles.icon} onClick={openModal} />
              </div>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span>매치평가 알림</span>
              <button
                className={styles.modalCloseButton}
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <p>영상을 시청 및 다운로드 하시려면 상호평가를 완료해야 합니다.</p>
            <div className={styles.modalButtons}>
              <button className={styles.evaluateButton}>평가하러 가기</button>
              <button className={styles.backButton} onClick={closeModal}>
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultAndVideo;
