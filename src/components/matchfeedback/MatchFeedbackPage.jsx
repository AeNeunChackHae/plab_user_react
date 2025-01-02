import React, { useState } from 'react';
import StadiumEvaluationModal from './StadiumEvaluationModal';
import PlayerEvaluationModal from './PlayerEvaluationModal';
import styles from '../matchfeedback/MatchFeedbackPage.module.css';

const players = [
  { id: 1, name: '이승만', team: '빨강', number: 1 },
  { id: 2, name: '윤보선', team: '노랑', number: 2 },
  { id: 3, name: '박정희', team: '파랑', number: 3 },
  { id: 4, name: '최규하', team: '빨강', number: 4 },
];

const FeedbackPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const openModal = (modalType, player = null) => {
    console.log(`모달 열림: ${modalType}, 선택된 선수: ${player?.name}`);
    setSelectedPlayer(player);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPlayer(null);
    setSelectedPlayers([]);
    setCurrentStep(0);
    setCompleted(false);
  };

  const handleSelectPlayer = (player) => {
    if (selectedPlayers.length < 3 && !selectedPlayers.includes(player)) {
      setSelectedPlayers(prev => [...prev, player]);
      console.log('선택된 선수:', player);
      openModal('playerPraise', player); // 칭찬 모달 열기
    } else {
      console.log('선수 선택 제한 초과 또는 이미 선택된 선수입니다.');
    }
  };

  const handleNextStep = () => {
    if (currentStep < selectedPlayers.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('모든 단계 완료');
      setCompleted(true);
      setActiveModal(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>12월 29일 금요일 20:00</h1>
      <p>서울 명동 SKY 풋살파크 A구장</p>

      <div className={styles.feedbackSection}>
        {/* 플레이어 평가 */}
        <div className={styles.feedbackItem}>
          <p>플레이어들을 평가해주세요!</p>
          <small>
            비매너 신고, 이용 평가 모두 진행할 수 있어요.
            <br />
            개인 경기 관리에 도움을 드리니, 적극적인 평가 부탁해요.
          </small>
          <div className={styles.buttons}>
            <button onClick={() => openModal('playerEvaluation')}>비매너가 있어요</button>
            <button onClick={() => openModal('playerEvaluations')}>평가해주세요</button>
          </div>
        </div>

        {/* 구장 평가 */}
        <div className={styles.feedbackItem}>
          <p>이용 구장은 어땠나요?</p>
          <div className={styles.buttons}>
            <button onClick={() => openModal('facilityBad')}>아쉬워요</button>
            <button onClick={() => openModal('facilityGood')}>좋았어요</button>
          </div>
        </div>
      </div>

      <button className={styles.completeButton}>평가 완료하기</button>

      {activeModal === 'facilityBad' || activeModal === 'facilityGood' ? (
        <StadiumEvaluationModal type={activeModal} onClose={closeModal} />
      ) : null}

      {activeModal === 'playerEvaluation' && (
        <PlayerEvaluationModal
          players={players}
          onSelect={handleSelectPlayer}
          onClose={closeModal}
        />
      )}

      {completed && (
        <div className={styles.modal}>
          <h2>평가 완료!</h2>
          <p>선수 칭찬 평가가 성공적으로 제출되었습니다.</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
