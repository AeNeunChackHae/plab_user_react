import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import joinRequests from '../data/joinRequests.json'; // 더미 데이터 (백엔드 API 호출로 대체 예정)
import teamData from '../data/teamList.json'; // 더미 데이터 (백엔드 API 호출로 대체 예정)
import styles from '../components/TeamProfile/TeamProfile.module.css';

const TeamJoinRequestsPage = () => {
  const { teamName } = useParams();
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(null); // 사용자 상태
  const [team, setTeam] = useState(null); // 팀 데이터
  const [requests, setRequests] = useState([]); // 가입 요청 데이터

  useEffect(() => {
    // TODO: 사용자 상태와 팀 데이터 가져오기 (백엔드 API 호출 필요)
    // 예: GET 요청을 통해 현재 로그인된 사용자와 관련된 팀 정보 및 사용자 상태를 가져옴
    // const response = await fetch('/api/user-status-and-team-data');
    // const data = await response.json();
    // setUserStatus(data.userStatus);
    // setTeam(data.team);
    // 아래는 더미 데이터로 대체:
    setUserStatus(teamData.userStatus);
    setTeam(teamData.team);
  }, []);

  useEffect(() => {
    // 팀장이 아니거나 URL의 팀 이름과 데이터가 일치하지 않는 경우 메인 페이지로 리다이렉트
    if (userStatus !== 'teamLeader' || (team && team.teamId !== teamName)) {
      // alert('팀장만 접근할 수 있습니다.');
      navigate('/main');
    }
  }, [userStatus, teamName, navigate, team]);

  useEffect(() => {
    // TODO: 가입 요청 데이터 가져오기 (백엔드 API 호출 필요)
    // 예: GET 요청을 통해 특정 팀의 가입 요청 데이터를 가져옴옴
    // const response = await fetch(`/api/teams/${teamName}/join-requests`);
    // const data = await response.json();
    // setRequests(data);
    // 아래는 더미 데이터로 대체:
    setRequests(joinRequests);
  }, [teamName]);

  return (
    <div className={styles.container}>
      <h2>{teamName} 팀 가입 신청 목록</h2>
      {requests.length === 0 ? (
        <p>가입 신청이 없습니다.</p>
      ) : (
        <ul className={styles.requestList}>
          {requests.map((request) => (
            <li key={request.id} className={styles.requestItem}>
              <p>이름: {request.name}</p>
              <p>포지션: {request.position}</p>
              <p>메시지: {request.message}</p>
              {/* TODO: 가입 요청 승인/거절 버튼 동작 구현 (백엔드 API 호출 필요) */}
              {/* 예: 승인/거절 요청을 POST 또는 PATCH로 서버에 전송 */}
              <button
                onClick={() => {
                  // 예시: 승인 API 호출
                  // await fetch(`/api/teams/${teamName}/join-requests/${request.id}/approve`, { method: 'POST' });
                  alert(`${request.name}님의 가입 요청이 승인되었습니다.`);
                }}
                className={styles.button}
              >
                승인
              </button>
              <button
                onClick={() => {
                  // 예시: 거절 API 호출
                  // await fetch(`/api/teams/${teamName}/join-requests/${request.id}/reject`, { method: 'POST' });
                  alert(`${request.name}님의 가입 요청이 거절되었습니다.`);
                }}
                className={styles.button}
              >
                거절
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate(-1)} className={styles.button}>
        돌아가기
      </button>
    </div>
  );
};

export default TeamJoinRequestsPage;
