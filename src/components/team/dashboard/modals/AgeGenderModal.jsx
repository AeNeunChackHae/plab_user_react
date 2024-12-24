import React, { useState } from 'react';
import styles from './AgeGenderModal.module.css';

const AgeGenderModal = ({ teamName, teamLogo, onBack, onClose, onSubmit }) => {
  const [ageGroups, setAgeGroups] = useState({
    '10대': 'N',
    '20대': 'N',
    '30대': 'N',
    '40대': 'N',
    '50대': 'N',
    '60대 이상': 'N',
  });

  const [gender, setGender] = useState({
    남자: 'N',
    여자: 'N',
    '남녀 모두': 'N',
  });

  // 나이대 버튼 클릭 (중복 가능)
  const handleAgeGroupClick = (ageGroup) => {
    setAgeGroups((prev) => ({
      ...prev,
      [ageGroup]: prev[ageGroup] === 'Y' ? 'N' : 'Y',
    }));
  };

  // 성별 버튼 선택 (중복 불가능)
  const handleGenderClick = (selectedGender) => {
    setGender({
      남자: 'N',
      여자: 'N',
      '남녀 모두': 'N',
      [selectedGender]: 'Y',
    });
  };

  // 데이터 검증 및 제출
  const handleSubmit = () => {
    const selectedAgeGroups = Object.values(ageGroups).some((value) => value === 'Y');
    const selectedGender = Object.values(gender).some((value) => value === 'Y');

    if (!selectedAgeGroups || !selectedGender) {
      alert('나이대와 성별을 선택해주세요.');
      return;
    }

    // 부모 컴포넌트로 데이터 전달
    onSubmit({ ageGroups, gender });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.header}>
          <img src={teamLogo} alt="팀 로고" className={styles.logo} />
          <h2 className={styles.teamName}>{teamName}</h2>
        </div>
        <p className={styles.title}>어떤 사람들이 모여있나요?</p>
        <p className={styles.subtitle}>
          정확하지 않아도 괜찮아요. 주변의 팀, 선수들과 매칭될 수 있게 도와드릴게요.
        </p>
        
        {/* 주요 나이대 선택 */}
        <div className={styles.selectionGroup}>
          <label>주요 나이대</label>
          <div className={styles.buttons}>
            {Object.keys(ageGroups).map((ageGroup) => (
              <button
                key={ageGroup}
                className={`${styles.selectionButton} ${
                  ageGroups[ageGroup] === 'Y' ? styles.selected : ''
                }`}
                onClick={() => handleAgeGroupClick(ageGroup)}
              >
                {ageGroup}
              </button>
            ))}
          </div>
        </div>
        
        {/* 성별 선택 */}
        <div className={styles.selectionGroup}>
          <label>성별</label>
          <div className={styles.buttons}>
            {Object.keys(gender).map((genderOption) => (
              <button
                key={genderOption}
                className={`${styles.selectionButton} ${
                  gender[genderOption] === 'Y' ? styles.selected : ''
                }`}
                onClick={() => handleGenderClick(genderOption)}
              >
                {genderOption}
              </button>
            ))}
          </div>
        </div>
        
        {/* 뒤로 및 등록 버튼 */}
        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onBack}>
            뒤로
          </button>
          <button className={styles.registerButton} onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeGenderModal;