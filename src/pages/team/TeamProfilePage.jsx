import teamData from '../../components/dummydata/dummyTeamData';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Overview from '../../components/team/teamProfile/Overview';
import Schedule from '../../components/team/teamProfile/Schedule';
import Members from '../../components/team/teamProfile/Members';
import Tabs from '../../components/team/teamProfile/Tabs';
import styles from './TeamProfilePage.module.css';
import JoinTeamModal from '../../components/team/teamProfile/JoinTeamModal';

const TeamProfilePage = () => {
  const { teamCode } = useParams();
  const navigate = useNavigate();
  // 오버뷰, 일정, 멤버 탭 useState
  const [activeTab, setActiveTab] = useState('overview');
  // 팀 더미 데이터 불러오기
  const team = teamData.teams.find((team) => team.code === teamCode);
  // 비팀원 가입하기 모달 useState  
  const [showModal, setShowModal] = useState(false);
  // 비팀원 가입하기, 신청 확인하기 버튼 useState
  const [joinRequested, setJoinRequested] = useState(false);

  const { userStatus } = team;

  // 팀장 버튼 로직
  // (1) 팀 프로필 수정 버튼
  const handleEditClick = () => {
    navigate(`/team/${teamCode}/edit/`);
  };
  
  // (2) 팀 삭제하기 버튼
  const handleDeleteClick = () => {
    const hasMembers = team.members.length > 1; // 팀원이 팀장 외 1명 이상인지 확인
    const hasPendingLeagues = team.schedule.length > 0; // 진행 예정 리그가 있는지 확인

    if (window.confirm('팀을 삭제하시겠습니까?')) {
      if (hasMembers) {
        alert('팀 멤버가 남아있어 삭제할 수 없어요.');
      } else if (hasPendingLeagues) {
        alert('진행 예정인 리그가 남아있어 삭제할 수 없어요.');
      } else {
        alert('팀이 삭제되었습니다.');
        // 실제 삭제 로직(백엔드 API 호출 등) 구현 필요
      }
    }
  };

  // 팀원 탈퇴하기 버튼 로직
  const handleLeaveTeam = () => {
    if (window.confirm(`${team.name} 팀을 탈퇴하시겠습니까?`)) {
      alert('탈퇴되었습니다.');
      // 팀원의 팀 탈퇴 로직(백엔드 API 호출) 구현 필요
      navigate('/main'); // 탈퇴 후 메인 페이지로 이동
    }
  };
  
  // 비팀원 가입하기 버튼 로직
  const handleJoinSubmit = (message) => {
    alert(`가입 신청이 완료되었습니다.`);
    setShowModal(false);
    // 팀 가입 신청 로직(백엔드 API 호출) 구현 필요
    setJoinRequested(true);
  }

  // 비팀원 가입 대기 중일 때 보이는 "신청 확인하기" 버튼 클릭 시 페이지 이동
  const handleJoinCheck = () => {
    navigate('/team/wait');
  };

  // 팀장, 팀원, 비팀원별 버튼 렌더링 로직
  const renderButton = () => {
    if (joinRequested) {
      return (
        <button className={styles.checkButton} onClick={handleJoinCheck}>
          신청 확인하기
        </button>
      );
    }

    switch (userStatus) {
      case 'teamLeader':
        return (
          <>
            <button className={styles.editButton} onClick={handleEditClick}>
              팀 설정
            </button>
            <button className={styles.deleteButton} onClick={handleDeleteClick}>
              팀 삭제
            </button>
          </>
        );
      case 'teamMember':
        return (
          <button className={styles.leaveButton} onClick={handleLeaveTeam}>
            팀 탈퇴하기
          </button>
        );
      default:
        return (
          <button className={styles.applyButton} onClick={() => setShowModal(true)}>
            팀 가입하기
          </button>
        );
    }
  };

  // 오버뷰, 일정, 멤버 탭 렌더링 로직
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview team={team} />;
      case 'schedule':
        return <Schedule schedule={team.schedule} />;
      case 'members':
        return (
            <>
              {userStatus === 'teamLeader' && (
                <div
                  className={styles.subscription}
                  onClick={() => navigate(`/team/${teamCode}/member`)}
                  role="button" tabIndex={0}
                >
                  <p>팀 가입 신청 목록</p>
                  <img src="/images/arrowIcon.png"
                    alt="화살표아이콘"
                    className={styles.arrowIcon}
                  />
                </div>
              )}
              <Members members={team.members} />
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* 왼쪽 콘텐츠 (팀 이름, 상태별 버튼) */}
      <div className={styles.sidebar}>
        <img src={team.logo} alt='팀 로고 이미지'/>
        <h2>{team.name}</h2>
        <div className={styles.buttonGroup}>
          {renderButton()}
        </div>
      </div>
      {/* 오른쪽 콘텐츠 (오버뷰, 일정, 멤버 탭) */}
      <div className={styles.content}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
      {showModal && (
        <JoinTeamModal
          onClose={() => setShowModal(false)}
          onSubmit={handleJoinSubmit}
        />
      )}
    </div>
  );
};

export default TeamProfilePage;
