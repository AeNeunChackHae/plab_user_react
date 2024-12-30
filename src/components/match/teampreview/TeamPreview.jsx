import React, { useState, useEffect } from "react";
import styles from "./TeamPreview.module.css";

const TeamPreview = ({ match_id }) => {
  const [teamsData, setTeamsData] = useState([]); // 기본값을 빈 배열로 설정
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("http://localhost:8080/match/team-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id }),
        });

        if (!response.ok) {
          throw new Error("팀 데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();

        console.log("Fetched match data:", data);
        if (!Array.isArray(data) || data.length === 0) {
          // 팀 데이터가 없으면 기본 값 설정
          const defaultTeams = [
            { team_name: "A팀", embulum_path: null, members_count: 0, average_age: 0, matches_played: 0, goals: 0, points: 0, team_level: "초보" },
            { team_name: "B팀", embulum_path: null, members_count: 0, average_age: 0, matches_played: 0, goals: 0, points: 0, team_level: "초보" },
            { team_name: "C팀", embulum_path: null, members_count: 0, average_age: 0, matches_played: 0, goals: 0, points: 0, team_level: "초보" },
          ];
          setTeamsData(defaultTeams);
          setSelectedTeam(defaultTeams[0]); // 기본 팀 선택
        } else {
          setTeamsData(data);
          setSelectedTeam(data[0]); // 첫 번째 팀 기본 선택
        }
      } catch (err) {
        console.error("팀 데이터 로드 오류:", err);
        setError(err.message);
      }
    };

    fetchTeamData();
  }, [match_id]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <h3>매치 프리뷰</h3>
        </div>
      </div>
      <div className={styles.sectionBody}>
        {/* 엠블럼 리스트 (가로 배치) */}
        <div className={styles.emblemList}>
          {teamsData.map((team, index) => (
            <div
              key={index}
              className={`${styles.emblemWrapper} ${
                selectedTeam?.team_name === team.team_name ? styles.selected : ""
              }`}
              onClick={() => setSelectedTeam(team)}
            >
              {team.embulum_path ? (
                <img
                  src={team.embulum_path}
                  alt={`${team.team_name} 엠블럼`}
                  className={styles.emblem}
                />
              ) : (
                <div className={styles.placeholderEmblem}>
                  {team.team_name}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 선택된 팀 상세 정보 */}
        {selectedTeam && (
          <div className={styles.detailsWrapper}>
            <div className={styles.detail}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_club.svg"
                alt="팀 아이콘"
                className={styles.detailIcon}
              />
              <span className={styles.detailTitle}>팀</span>
              <span className={`${styles.detailValue} ${styles.teamName}`}>{selectedTeam.team_name}</span>
            </div>
            <div className={styles.detail}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_my.svg"
                alt="멤버 아이콘"
                className={styles.detailIcon}
              />
              <span className={styles.detailTitle}>멤버</span>
              <span className={`${styles.detailValue} ${styles.teamName}`}>
                {selectedTeam.members_count}명
              </span>
            </div>
            <div className={styles.detail}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_age.svg"
                alt="평균 나이 아이콘"
                className={styles.detailIcon}
              />
              <span className={styles.detailTitle}>평균 나이</span>
              <span className={`${styles.detailValue} ${styles.teamName}`}>
                {selectedTeam.average_age}세
              </span>
            </div>
            <div className={styles.detail}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_ball.svg"
                alt="경기 전적 아이콘"
                className={styles.detailIcon}
              />
              <span className={styles.detailTitle}>경기 전적</span>
              <span className={`${styles.detailValue} ${styles.teamName}`}>
                {selectedTeam.matches_played}경기 {selectedTeam.goals}승{" "}
                {selectedTeam.points}포인트
              </span>
            </div>
            <div className={styles.detail}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_level.svg"
                alt="레벨 아이콘"
                className={styles.detailIcon}
              />
              <span className={styles.detailTitle}>레벨</span>
              <span className={`${styles.detailValue} ${styles.teamName}`}>{selectedTeam.team_level}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamPreview;
