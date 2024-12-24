import React, { useState } from 'react';
import styles from './ScheduleModal.module.css';

const ScheduleModal = ({ teamName, teamLogo, onBack, onClose, onSubmit }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleDayClick = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeClick = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = () => {
    if (selectedDays.length === 0 || selectedTimes.length === 0) {
      alert('활동 요일과 시간을 선택해주세요.');
      return;
    }
    onSubmit({ days: selectedDays, times: selectedTimes });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {/* 팀 로고 및 이름 */}
        <div className={styles.header}>
          <img src={teamLogo} alt="팀 로고" className={styles.logo} />
          <h2 className={styles.teamName}>{teamName}</h2>
        </div>

        {/* 제목 */}
        <p className={styles.title}>주로 언제 운동하나요?</p>
        <p className={styles.subtitle}>
          정확하지 않아도 괜찮아요. 자주 차는 시간과 요일을 알려주세요.
        </p>

        {/* 활동 요일 선택 */}
        <div className={styles.selectionGroup}>
          <label>활동 요일</label>
          <div className={styles.buttons}>
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
              <button
                key={day}
                className={`${styles.selectionButton} ${
                  selectedDays.includes(day) ? styles.selected : ''
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 활동 시간대 선택 */}
        <div className={styles.selectionGroup}>
          <label>활동 시간대</label>
          <div className={styles.buttons}>
            {['아침 6~10시', '낮 10~18시', '저녁 18~24시', '심야 24~6시'].map((time) => (
              <button
                key={time}
                className={`${styles.selectionButton} ${
                  selectedTimes.includes(time) ? styles.selected : ''
                }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onBack}>
            뒤로
          </button>
          <button className={styles.nextButton} onClick={handleSubmit}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
