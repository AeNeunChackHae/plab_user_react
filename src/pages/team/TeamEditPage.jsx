import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TeamEditPage.module.css';
import teamDummyData from '../../components/dummyData/dummyTeamEditData';

const TeamEditPage = () => {
  const { code } = useParams();

  const [teamData, setTeamData] = useState({
    teamName: '',
    teamCode: '',
    selectedDays: [],
    selectedTime: '',
    emblemPreview: '',
    selectedAges: [],
    selectedGender: '남녀 모두',
  });

  const [teamNameError, setTeamNameError] = useState('');
  const [teamCodeError, setTeamCodeError] = useState('');
  const [teamCodeExistError, setTeamCodeExistError] = useState('');

  useEffect(() => {
    const team = teamDummyData.find((team) => team.code === code);
    if (team) {
      setTeamData(team);
    }
  }, [code]);

  const toggleAge = (age) => {
    setTeamData((prev) => ({
      ...prev,
      selectedAges: prev.selectedAges.includes(age)
        ? prev.selectedAges.filter((a) => a !== age)
        : [...prev.selectedAges, age],
    }));
  };

  const toggleDay = (day) => {
    setTeamData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const validateTeamName = (value) => {
    if (value.trim().length < 1) {
      setTeamNameError('1자 이상이어야 해요');
    } else {
      setTeamNameError('');
    }
    setTeamData((prev) =>({ ...prev, teamName: value}));
  };

  const validateTeamCode = (value) => {
    if (value.length < 2) {
      setTeamCodeError('2자 이상이어야 해요');
    } else {
      setTeamCodeError('');
    }
    setTeamCodeExistError(''); 
    setTeamData((prev) => ({ ...prev, teamCode: value }));
  };

  const handleEmblemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTeamData((prev) => ({ ...prev, emblemPreview: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!teamData.teamName.trim()) {
      alert('팀 이름을 입력해주세요');
      return;
    }
    if (!teamData.teamCode.trim()) {
      alert('팀 코드를 입력해주세요');
      return;
    }
    if (teamDummyData.some((team) => team.teamCode === teamData.teamCode && team.code !== code)) {
      setTeamCodeExistError('이미 사용 중인 팀 코드입니다');
      return;
    } else {
      setTeamCodeExistError('');
    }
    if (teamData.selectedDays.length === 0) {
      alert('활동 요일을 선택해주세요');
      return;
    }
    if (!teamData.selectedTime) {
      alert('활동 시간대를 선택해주세요');
      return;
    }
    if (teamData.selectedAges.length === 0) {
      alert('나이대를 선택해주세요');
      return;
    }
    if (!teamData.selectedGender) {
      alert('성별을 선택해주세요');
      return;
    }
    if (teamCodeError) {
      alert('팀 코드 오류를 수정해주세요.');
      return;
    }
    alert('팀 정보가 저장되었습니다.');
  };

  const fileInputRef = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.emblemWrapper}>
        <img src={teamData.emblemPreview} alt="팀 엠블럼" className={styles.emblem} />
        <button
          type="button"
          className={styles.changeEmblem}
          onClick={() => fileInputRef.current.click()}
        >
          엠블럼 바꾸기
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleEmblemChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>팀 이름</label>
        <input
          type="text"
          value={teamData.teamName}
          onChange={(e) => validateTeamName(e.target.value)}
        />
        {teamNameError && <span className={styles.errorText}>{teamNameError}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label>팀 코드</label>
        <input
          type="text"
          value={teamData.teamCode}
          onChange={(e) => validateTeamCode(e.target.value)}
        />
        {teamCodeError && <span className={styles.errorText}>{teamCodeError}</span>}
        {teamCodeExistError && <span className={styles.errorText}>{teamCodeExistError}</span>}
      </div>

      <div className={styles.section}>
        <label className={styles.label}>활동 요일</label>
        <div className={styles.dayButtons}>
          {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={teamData.selectedDays.includes(day) ? styles.activeDay : ''}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>활동 시간대</label>
        <div className={styles.timeButtons}>
          {['아침', '낮', '저녁', '심야'].map((time) => (
            <button
              key={time}
              onClick={() => setTeamData({ ...teamData, selectedTime: time })}
              className={teamData.selectedTime === time ? styles.activeTime : ''}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>나이대 (중복 선택 가능)</label>
        <div className={styles.ageButtons}>
          {['10대', '20대', '30대', '40대', '50대', '60대 이상'].map((age) => (
            <button
              key={age}
              onClick={() => toggleAge(age)}
              className={teamData.selectedAges.includes(age) ? styles.activeAge : ''}
            >
              {age}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.saveButtonWrapper}>
        <button onClick={handleSave} className={styles.saveButton}>저장하기</button>
      </div>
    </div>
  );
};

export default TeamEditPage;
