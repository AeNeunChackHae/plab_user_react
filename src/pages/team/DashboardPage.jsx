import React, { useState, useEffect } from 'react';
import TeamCard from '../../components/team/dashboard/TeamCard';
import CreateTeamModal from '../../components/team/dashboard/modals/CreateTeamModal';
import JoinRequestSummary from '../../components/team/dashboard/JoinRequestSummary';
import teamData from '../../components/dummyData/dummyTeamData';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false); // 팀 만들기 모달 상태
  const [teams, setTeams] = useState([]); // 팀 데이터를 useState로 관리
  

  // 추후 팀 데이터 불러오는 백엔드 연동 필요(예시)
  /*
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // 백엔드 API 호출 - 팀 목록 가져오기
        const response = await fetch('/api/teams'); // API 엔드포인트
        if (!response.ok) {
          throw new Error('팀 데이터를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();

        // 가져온 팀 데이터를 상태에 저장
        setTeams(data.teams); // API에서 가져온 팀 목록
      } catch (error) {
        console.error('팀 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchTeams(); // 컴포넌트가 렌더링될 때 팀 데이터 가져오기
  }, []); */

  // 더미 데이터 테스트
  useEffect(() => {
    const fetchTeams = () => {
      // 팀 데이터가 배열인지 확인하고 설정
      if (Array.isArray(teamData.teams)) {
        setTeams(teamData.teams);
      } else {
        console.error('팀 데이터가 배열이 아닙니다.');
        setTeams([]);
      }
    };
    fetchTeams(); // 컴포넌트 렌더링 시 데이터 로드
  }, []);


  // 팀 만들기 버튼 클릭 시 모달 열기
  const handleCreateTeamClick = () => {
    setShowCreateTeamModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowCreateTeamModal(false);
  };
  

  // 추후 팀 생성 후 데이터 갱신 백엔드 연동 필요(예시)
  /*
  const handleTeamCreated = async (newTeam) => {
    try {
      // 백엔드 API 호출 - 새 팀 데이터 저장
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        throw new Error('팀 생성 중 오류가 발생했습니다.');
      }

      const createdTeam = await response.json();

      // 팀 목록 상태 업데이트
      setTeams((prevTeams) => [...prevTeams, createdTeam]); // 새로운 팀 추가
    } catch (error) {
      console.error('팀 생성 실패:', error);
    }
  }; */

  // 팀 만들기 완료 후 더미 데이터에 추가
  const handleTeamCreated = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]); // 로컬 상태 업데이트
  };

  return (
      <div className={styles.dashboard}>
        {/* 헤더 섹션 */}
        <section className={styles.header}>
          <h2>내 팀</h2>
          <button className={styles.createTeamButton} onClick={handleCreateTeamClick}>
            팀 만들기
          </button>
        </section>

        {/* 팀 목록 */}
        <section className={styles.teamGrid}>
          {teams.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </section>

        {/* 가입 신청 내역 */}
        <section className={styles.joinRequestSection}>
          <JoinRequestSummary />
        </section>

      {/* 팀 만들기 모달 */}
      {showCreateTeamModal && (
        <CreateTeamModal 
          onClose={handleCloseModal} 
          onTeamCreated={handleTeamCreated} 
        />
      )}
    </div>
  );
};

export default DashboardPage;
