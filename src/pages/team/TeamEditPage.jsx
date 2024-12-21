import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import teamData from '../data/teamData.json';

const TeamEditPage = () => {
  const { teamName } = useParams();
  const navigate = useNavigate();

  // 사용자 상태 확인
  const { userStatus, team } = teamData;

  useEffect(() => {
    // 팀 리더가 아닌 경우 메인 페이지로 리다이렉트
    if (userStatus !== 'teamLeader' || team.teamId !== teamName) {
      alert('팀 리더만 접근할 수 있습니다.');
      navigate('/main');
    }
  }, [userStatus, teamName, navigate, team.teamId]);

  const handleSave = () => {
    alert('팀 설정이 저장되었습니다.');
    navigate(`/team/profile/${teamName}/`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{team.name} 팀 설정</h2>
      <form>
        <div>
          <label>팀 이름: </label>
          <input type="text" defaultValue={team.name} />
        </div>
        <div>
          <label>모임 시간: </label>
          <input type="text" defaultValue={team.meetingTime} />
        </div>
        <div>
          <label>홈 구장: </label>
          <input type="text" defaultValue={team.stadium} />
        </div>
        <button type="button" onClick={handleSave}>
          저장하기
        </button>
      </form>
    </div>
  );
};

export default TeamEditPage;
