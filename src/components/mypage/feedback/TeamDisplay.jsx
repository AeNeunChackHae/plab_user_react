import React from "react";
import styles from "./TeamDisplay.module.css";

const TeamDisplay = ({ players, blacklist, currentUserId }) => {
  const teamImages = {
    red: "/images/redVest.png",
    yellow: "/images/yellowVest.png",
    blue: "/images/blueVest.png",
  };

  return (
    <div className={styles.container}>
      {/* 팀별 데이터를 렌더링 */}
      {Object.entries(teamImages).map(([teamName, teamImage], teamIndex) => (
        <div key={teamIndex} className={styles.teamColumn}>
          {/* 팀 이미지 */}
          <div className={styles.teamHeader}>
            <img src={teamImage} alt={`${teamName} 이미지`} className={styles.teamImage} />
          </div>
          {/* 팀별 플레이어 리스트 */}
          {players
            .filter((player) => player.user_team === teamIndex) // 해당 팀의 플레이어 필터링
            .sort((a, b) => a.user_number - b.user_number) // 등번호 순서대로 정렬
            .map((player) => {
              const displayText =
                blacklist.includes(player.user_id)
                  ? "블랙" // 블랙리스트에 포함된 경우
                  : player.status_code === 2
                  ? "불참" // 불참 상태
                  : player.user_id === currentUserId
                  ? "나" // 현재 유저
                  : player.user_number + 1; // 기본 등번호

              const playerClass =
                displayText === "블랙"
                  ? styles.blacklistUser
                  : displayText === "불참"
                  ? styles.absentUser
                  : displayText === "나"
                  ? styles.currentUser
                  : "";

              return (
                <div
                  key={player.user_id}
                  className={`${styles.playerButton} ${playerClass}`}
                >
                  {displayText}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default TeamDisplay;
