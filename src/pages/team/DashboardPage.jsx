import React, { useState, useEffect } from 'react';
import TeamCard from '../components/Dashboard/TeamCard';
import CreateTeamModal from '../components/Dashboard/modals/CreateTeamModal';
import JoinRequestSummary from '../components/Dashboard/JoinRequestSummary';
import teamData from '../data/teamList.json'; // 더미 데이터 임포트
import styles from '../components/Dashboard/Dashboard.module.css';

const DashboardPage = () => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false); // 팀 만들기 모달 상태
  const [teams, setTeams] = useState([]); // 팀 데이터를 useState로 관리

  // (1) 백엔드 구현 
/*
  // 팀 데이터를 가져오는 함수 (백엔드 API 호출)
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // TODO: 백엔드 API 호출
        // GET 요청을 통해 사용자와 관련된 팀 데이터를 가져옴옴
        // 예: const response = await fetch('/api/teams');
        // const data = await response.json();
        const data = await Promise.resolve({
          team: [
            {
              name: '애는착해',
              role: '운영진',
              members: 4,
              code: 'aeneun-chakhae',
              logo: 'https://via.placeholder.com/150',
            },
          ],
        }); // 임시 데이터
        setTeams(data.team); // 가져온 팀 데이터를 상태에 저장
      } catch (error) {
        console.error('팀 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchTeams(); // 컴포넌트가 렌더링될 때 데이터 가져오기
  }, []);
*/

  // (2) 더미 데이터 테스트
  useEffect(() => {
    const fetchTeams = () => {
      // 더미 데이터를 불러와 상태로 설정
      setTeams(teamData.teams);
    };

    fetchTeams(); // 컴포넌트 렌더링 시 데이터 로드
  }, []);


  // 팀 만들기 버튼 클릭 시 팀 생성 모달이 나옴(useState:true)
  const handleCreateTeamClick = () => {
    setShowCreateTeamModal(true);
  };

  // 모달 닫는 버튼 클릭 시 모달이 사라짐(useState:false)
  const handleCloseModal = () => {
    setShowCreateTeamModal(false);
  };


  // (1) 백엔드 구현 시
/*
  // 팀 만들기 완료 후 데이터 갱신
  const handleTeamCreated = (newTeam) => {
    // TODO: 백엔드 API 호출
    // POST 요청을 통해 새로운 팀 데이터를 서버에 저장함
    // 예: await fetch('/api/teams', { method: 'POST', body: JSON.stringify(newTeam) });

    setTeams((prevTeams) => [...prevTeams, newTeam]); // 로컬 상태 갱신 (임시)
  };
*/

  // (2) 더미 데이터 테스트 
  // 팀 만들기 완료 후 더미 데이터에 추가
  const handleTeamCreated = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]); // 로컬 상태 업데이트
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>내 팀</h2>
        <button className={styles.createTeamButton} onClick={handleCreateTeamClick}>
          팀 만들기
        </button>
      </div>

      <div className={styles.teamGrid}>
        {teams.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>

      <section className={styles.joinRequestSection}>
        <JoinRequestSummary />
      </section>

      {/* 팀 만들기 모달 */}
      {showCreateTeamModal && <CreateTeamModal onClose={handleCloseModal} onTeamCreated={handleTeamCreated} />}
    </div>
  );
};

export default DashboardPage;
