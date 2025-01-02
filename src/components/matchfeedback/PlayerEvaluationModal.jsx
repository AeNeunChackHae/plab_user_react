import React, { useState } from 'react';
import styles from './PlayerEvaluationModal.module.css';

const PlayerEvaluationModal = ({ myTeam, myNumber, onClose }) => {
  const teams = [
    { name: '빨강', color: '#FF6347', image: '/images/redVest.png' },
    { name: '노랑', color: '#FFD700', image: '/images/yellowVest.png' },
    { name: '파랑', color: '#1E90FF', image: '/images/blueVest.png' }
  ];
  const playersPerTeam = 6;

  const [currentStep, setCurrentStep] = useState(0);
  const [feedbackOptions, setFeedbackOptions] = useState({
    badBehavior: false,
    swearing: false,
    bossy: false,
    revengePlay: false,
    soloPlay: false,
    roughPlay: false,
    violence: false
  });

  const handleNextStep = () => {
    setCurrentStep(1); // 피드백 폼으로 이동
  };

  const handleCheckboxChange = (event) => {
    setFeedbackOptions({
      ...feedbackOptions,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmitFeedback = () => {
    console.log(feedbackOptions); // 여기서 보통 API로 전송
    setCurrentStep(2); // 확인 모달 표시
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {currentStep === 0 && (
          <>
            <h2>어떤 팀이었나요?</h2>
            <p>경기 중 비매너 유저를 선택해주세요</p>
            <div className={styles.teamsContainer}>
              {teams.map((team) => (
                <div key={team.name} className={styles.team}>
                  <img src={team.image} alt={`${team.name} 팀`} className={styles.teamImage} />
                  <h3 style={{ color: team.color }}>{team.name} 팀</h3>
                  {Array.from({ length: playersPerTeam }, (_, index) => {
                    const number = index + 1;
                    const isMe = team.name === myTeam && number === myNumber;
                    return (
                      <button
                        key={number}
                        className={styles.playerButton}
                        onClick={() => isMe ? null : console.log(`${team.name} 팀 ${number}번 선택됨`)}
                        style={{
                          backgroundColor: isMe ? '#32CD32' : team.color,
                          color: isMe ? 'white' : 'black'
                        }}
                      >
                        {isMe ? 'Me' : number}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <button className={styles.nextButton} onClick={handleNextStep}>
              다음 단계로 이동
            </button>
          </>
        )}
        {currentStep === 1 && (
          <>
            <h2>플레이어 평가</h2>
            <label><input type="checkbox" name="badBehavior" checked={feedbackOptions.badBehavior} onChange={handleCheckboxChange}/> 반말을 사용해요</label>
            <label><input type="checkbox" name="swearing" checked={feedbackOptions.swearing} onChange={handleCheckboxChange}/> 폭언, 욕설을 해요</label>
            <label><input type="checkbox" name="bossy" checked={feedbackOptions.bossy} onChange={handleCheckboxChange}/> 지시가 심해요</label>
            <label><input type="checkbox" name="revengePlay" checked={feedbackOptions.revengePlay} onChange={handleCheckboxChange}/> 보복성 플레이를 해요</label>
            <label><input type="checkbox" name="soloPlay" checked={feedbackOptions.soloPlay} onChange={handleCheckboxChange}/> 개인 플레이가 심해요</label>
            <label><input type="checkbox" name="roughPlay" checked={feedbackOptions.roughPlay} onChange={handleCheckboxChange}/> 플레이가 거칠어요</label>
            <label><input type="checkbox" name="violence" checked={feedbackOptions.violence} onChange={handleCheckboxChange}/> 폭행, 싸움이 있었어요</label>
            <button className={styles.nextButton} onClick={handleSubmitFeedback}>블랙리스트 등록하기</button>
            <button className={styles.nextButton} onClick={onClose}>제출하기</button>

          </>
        )}
        {currentStep === 2 && (
          <div>
            <p>백준규님이 블랙리스트로  등록되었습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerEvaluationModal;
