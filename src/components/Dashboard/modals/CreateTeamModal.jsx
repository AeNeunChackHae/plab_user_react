import React, { useState } from 'react';
import styles from './CreateTeamModal.module.css';
import LogoUploadModal from './LogoUploadModal';
import ScheduleModal from './ScheduleModal';
import AgeGenderModal from './AgeGenderModal';
import teamList from '../../../data/teamList.json';

const CreateTeamModal = ({ onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamSchedule, setTeamSchedule] = useState(null);

  const [showLogoUploadModal, setShowLogoUploadModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAgeGenderModal, setShowAgeGenderModal] = useState(false);

  const handleNext = () => {
    const isCodeDuplicate = teamList.team.some((team) => team.code === teamCode.trim());
    if (isCodeDuplicate) {
      alert('동일한 url이 이미 존재해요');
      return;
    }

    if (!teamName.trim() || !teamCode.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setShowLogoUploadModal(true);
  };

  const handleLogoUpload = (file) => {
    setTeamLogo(URL.createObjectURL(file)); // 로컬 미리보기 URL
    setShowLogoUploadModal(false);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (schedule) => {
    setTeamSchedule(schedule);
    setShowScheduleModal(false);
    setShowAgeGenderModal(true);
  };

  const handleAgeGenderSubmit = (ageGender) => {
    const newTeam = {
      name: teamName,
      code: teamCode,
      logo: teamLogo,
      schedule: teamSchedule,
      ageGender,
    };

    console.log('새로운 팀 데이터:', JSON.stringify(newTeam, null, 2));

    // TODO: 백엔드 API 호출 부분 (팀 생성 데이터 전송)
    /*
      fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeam),
      })
        .then((response) => response.json())
        .then((data) => console.log('팀 생성 성공:', data))
        .catch((error) => console.error('팀 생성 실패:', error));
    */

    alert('팀이 성공적으로 생성되었습니다.');
    onClose();
  };

  return (
    <>
      {showLogoUploadModal ? (
        <LogoUploadModal
          teamName={teamName}
          onBack={() => setShowLogoUploadModal(false)}
          onClose={onClose}
          onLogoUpload={handleLogoUpload}
        />
      ) : showScheduleModal ? (
        <ScheduleModal
          teamName={teamName}
          teamLogo={teamLogo}
          onBack={() => {
            setShowScheduleModal(false);
            setShowLogoUploadModal(true);
          }}
          onSubmit={handleScheduleSubmit}
        />
      ) : showAgeGenderModal ? (
        <AgeGenderModal
          teamName={teamName}
          teamLogo={teamLogo}
          onSubmit={handleAgeGenderSubmit}
        />
      ) : (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>팀 만들기</h2>
            <p>팀 이름과 코드를 입력하세요.</p>
            <input
              type="text"
              placeholder="팀 이름"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              type="text"
              placeholder="팀 코드"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
            />
            <button onClick={handleNext}>다음</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTeamModal;
