import React, { useState, useEffect } from 'react';
import styles from './CreateTeamModal.module.css';
import LogoUploadModal from './LogoUploadModal';
import ScheduleModal from './ScheduleModal';
import AgeGenderModal from './AgeGenderModal';
import teamData from '../../../dummydata/dummyTeamData';

const CreateTeamModal = ({ onClose }) => {
  // 모달 상태 관리
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamSchedule, setTeamSchedule] = useState({ days: [], times: [] });
  const [teamAgeGender, setTeamAgeGender] = useState({ ageGroups: {}, gender: {} });

  const [showLogoUploadModal, setShowLogoUploadModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAgeGenderModal, setShowAgeGenderModal] = useState(false);

  // 팀 생성 완료 상태 관리
  const [isCompleted, setIsCompleted] = useState(false);

  // 에러 상태
  const [teamNameError, setTeamNameError] = useState('');
  const [teamCodeError, setTeamCodeError] = useState('');

  // 팀 이름 검증 함수
  const validateTeamName = (name, isSubmit = false) => {
    if (!name.trim()) {
      return isSubmit ? '이름을 입력해주세요' : '1자 이상이어야 해요';
    }
    return ''; // 에러 없음
  };

  // 팀 코드 검증 함수
  const validateTeamCode = (code) => {
    if (!code.trim()) {
      return '코드를 입력해주세요';
    }
    if (code.trim().length < 2) {
      return '2자 이상이어야 해요';
    }
    if (teamData.teams.some((team) => team.code === code.trim())) {
      return '동일한 코드가 이미 존재해요';
    }
    return '';
  };

  // 팀 이름 입력 핸들러
  const handleTeamNameChange = (e) => {
    const name = e.target.value;
    setTeamName(name);

    const error = validateTeamName(name);
    setTeamNameError(error);
  };

  // 팀 코드 입력 핸들러
  const handleTeamCodeChange = (e) => {
    const code = e.target.value;
    setTeamCode(code);

    const error = validateTeamCode(code);
    setTeamCodeError(error);
  };

  // 다음 단계 이동
  const handleNext = () => {
    let hasError = false;

    // 팀 이름 검증
    const nameError = validateTeamName(teamName, true);
    if (nameError) {
      setTeamNameError(nameError);
      hasError = true;
    } else {
      setTeamNameError('');
    }

    // 팀 코드 검증
    const codeError = validateTeamCode(teamCode);
    if (codeError) {
      setTeamCodeError(codeError);
      hasError = true;
    } else {
      setTeamCodeError('');
    }

    if (hasError) return;

    setShowLogoUploadModal(true);
  };

  // 팀 로고 업로드 단계
  const handleLogoUpload = (file) => {
    setTeamLogo(URL.createObjectURL(file)); // 로컬 미리보기 URL
    setShowLogoUploadModal(false);
    setShowScheduleModal(true);
  };

  // 팀 일정 설정 단계
  const handleScheduleSubmit = (schedule) => {
    setTeamSchedule(schedule);  // 선택한 스케줄 저장
    setShowScheduleModal(false);
    setShowAgeGenderModal(true);
  };

  useEffect(() => {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      const parsedTeams = JSON.parse(storedTeams);
      teamData.teams = parsedTeams;
    }
  }, []);


  // 나이대, 성별 설정 단계
  const handleAgeGenderSubmit = (ageGender) => {
    setTeamAgeGender(ageGender)

    const newTeam = {
      name: teamName,
      code: teamCode,
      logo: teamLogo,
      schedule: teamSchedule,
      ageGender,
    };

    try {
      // 더미 데이터에 팀 추가
      teamData.teams.push(newTeam);
      console.log('더미 데이터에 팀 추가됨:', newTeam);

      alert('팀이 성공적으로 생성되었습니다.');
      setIsCompleted(true); // 독립적인 닫기 상태 설정
    } catch (error) {
      console.error('더미 데이터 업데이트 실패:', error);
      alert('팀 생성 중 오류가 발생했습니다.');
    }
  };

  // 팀 생성 완료 시 모달 닫기
  useEffect(() => {
    if (isCompleted) {
      onClose(); // alert 없이 닫기
    }
  }, [isCompleted, onClose]);

  // X 버튼 클릭 시 모달 닫기 (alert 포함)
  const handleClose = () => {
    if (!isCompleted) {
      const confirmClose = window.confirm('창을 닫으면 저장된 내용이 삭제돼요.\n\n창을 닫으시겠습니까?');
      if (confirmClose) {
        onClose();
      }
    }
  };

  return (
    <>
      {showLogoUploadModal ? (
        <LogoUploadModal
          teamName={teamName}
          onBack={() => setShowLogoUploadModal(false)}  // 뒤로 버튼
          onClose={handleClose} // 닫기 버튼
          onLogoUpload={handleLogoUpload}
        />
      ) : showScheduleModal ? (
        <ScheduleModal
          teamName={teamName}
          teamLogo={teamLogo}
          selectedSchedule={teamSchedule} // 선택한 스케줄 상태 전달
          onBack={() => {
            setShowScheduleModal(false);
            setShowLogoUploadModal(true); // 이전 모달 이동
          }}
          onClose={handleClose} // 닫기 버튼
          onSubmit={handleScheduleSubmit}
        />
      ) : showAgeGenderModal ? (
        <AgeGenderModal
          teamName={teamName}
          teamLogo={teamLogo}
          selectedAgeGender={teamAgeGender} // 선택한 나이대 및 성별 상태 전달
          onBack={() => {
            setShowAgeGenderModal(false);
            setShowScheduleModal(true); // 이전 모달 이동
          }}
          onClose={handleClose} // 닫기 버튼
          onSubmit={handleAgeGenderSubmit}
        />
      ) : (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button 
              className={styles.closeButton} 
              onClick={handleClose}
            >
              ×
            </button>
            <h2>팀 만들기</h2>
            <p className={styles.p}>팀 이름과 코드를 작성해주세요</p>
            <div>
              <label>팀 이름</label>
              <input
                type="text"
                value={teamName}
                onChange={handleTeamNameChange}
              />
              {teamNameError && <span className={styles.error}>{teamNameError}</span>}
            </div>
            <div>
              <label>팀 코드</label>
              <input
                type="text"
                value={teamCode}
                onChange={handleTeamCodeChange}
              />
              {teamCodeError && <span className={styles.error}>{teamCodeError}</span>}
            </div>
            <span className={styles.info}>
              팀 코드는 플랩 팀페이지 URL 주소로 사용돼요 <br />
              https://www.plabfootball.com/team/
              <span className={styles.codePrev}>{teamCode.trim()}</span>
            </span>
            <button className={styles.nextButton} onClick={handleNext}>다음</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTeamModal;