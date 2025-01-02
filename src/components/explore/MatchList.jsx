import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchList.module.css";

const MatchList = ({ matches }) => {
  const navigate = useNavigate();

  const getGenderDotClass = (gender) => {
    switch (gender) {
      case "여성":
        return styles.femaleDot;
      case "남성":
        return styles.maleDot;
      case "혼성":
        return styles.allDot;
      default:
        return "";
    }
  };

  const getLevelClass = (level) => {
    switch (level) {
      case "모든레벨":
        return styles.general;
      case "아마추어1이하":
        return styles.amateur1;
      case "아마추어2이상":
        return styles.amateur2;
      default:
        return "";
    }
  };

  const handleMatchClick = (matchId) => {
    // 디버깅 메시지
    // console.log('매치 ID:', matchId);
    if (!matchId) {
        console.warn('matchId가 존재하지 않습니다.');
    }
    navigate(`/match/${matchId}`);
};

  return (
    <div className={styles.matchList}>
      {matches.length === 0 ? (
        <div className={styles.noMatchMessage}>매치가 존재하지 않아요!</div>
      ) : (
        matches.map((match, index) => (
          <div
            key={index}
            className={styles.matchItem}
            onClick={() => handleMatchClick(match.matchId)}
          >
            {/* 매치 시작 시간 */}
            <div className={styles.time}>
              {new Date(match.startTime).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
            {/* 구장명 */}
            <div className={styles.details}>
              <span className={styles.location}>
                {match.stadiumName || match.stadium_name || "구장 정보 없음"}
              </span>
              <br />
              {/* 성별 */}
              <span
                className={`${styles.dot} ${getGenderDotClass(match.gender)}`}
              ></span>
              <span className={`${styles.gender}`}>{match.gender}</span>
              {/* 레벨 */}
              {match.level !== "일반" && (
                <span
                  className={`${styles.level} ${getLevelClass(match.level)}`}
                >
                  {match.level}
                </span>
              )}
            </div>
            {/* 상태 */}
            <div>
              <button
                className={`${styles.status} ${
                  match.status === "마감" ? styles.closed : styles.open
                }`}
              >
                {match.status}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchList;
