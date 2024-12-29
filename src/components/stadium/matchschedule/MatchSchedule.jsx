import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchSchedule.module.css";

const MatchSchedule = ({ stadiumId, selectedDate }) => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 시간 형식을 "시간:분"으로 변환하는 함수
  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:8080/stadium/match", {
          method: "POST", // POST 방식으로 요청
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stadiumId }), // stadiumId 전달
        });
        console.log(stadiumId)

        if (!response.ok) throw new Error("매치 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        setMatches(data);
        console.log("가져온 데이터:", data);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(err.message);
      }
    };

    fetchMatches();
  }, [stadiumId]);

  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  if (error) return <div className={styles.error}>{error}</div>;

  // 선택된 날짜에 따라 매치 필터링
  const filteredMatches = matches.filter((match) => match.date === selectedDate);

  return (
    <div className={styles.matchScheduleContainer}>
      {filteredMatches.length === 0 ? (
        <p className={styles.noMatches}>매치 정보가 없습니다.</p>
      ) : (
        filteredMatches.map((match) => (
          <div
            key={match.match_id} // 고유 match_id 사용
            className={styles.matchScheduleItem}
            onClick={() => handleMatchClick(match.match_id)} // match_id로 이동
            style={{ cursor: "pointer" }}
          >
            <div className={styles.matchTime}>
              <p>{formatTime(match.time)}</p>
            </div>
            <div className={styles.matchInfo}>
              <span className={styles.matchLink}>{match.stadium_name}</span>
              <div className={styles.matchDetails}>
                <span>{`성별: ${match.allow_gender}`}</span>
                <span>{`레벨: ${match.level_criterion}`}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchSchedule;
