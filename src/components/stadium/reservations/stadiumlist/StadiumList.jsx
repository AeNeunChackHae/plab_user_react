import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 사용
import styles from "./StadiumList.module.css";
import { config } from "../../../../config";

// 종료 시간 계산 함수
const calculateEndTime = (startTime, duration = 2) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const endHours = (hours + duration) % 24;
  return `${endHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const StadiumList = ({ stadiumId, selectedDate }) => {
  const api = config.aws.ec2_host_user
  const [matches, setMatches] = useState([]);
  const [stadiumInfo, setStadiumInfo] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router의 네비게이션 훅

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${api}/stadium/getMatches`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stadiumId }),
        });
    
        if (!response.ok) {
          throw new Error("매치 데이터를 가져오는 데 실패했습니다.");
        }
    
        const data = await response.json();
        console.log('리스트 데이터',data)
        if (data) {
          // 구장 정보와 매치 데이터를 분리하여 상태 관리
          setStadiumInfo(data.stadium); // 구장 정보 설정
          setMatches(data.matches); // 매치 정보 설정
        }
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(err.message);
      }
    };
    

    fetchMatches();
  }, [stadiumId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const filteredMatches = matches.filter((match) => match.date === selectedDate);

  const handleMatchClick = (matchId) => {
    // 매치 상세 페이지로 이동
    console.log('매치아이디입니당',matchId)
    navigate(`/match/${matchId}`);
  };

  return (
    <div className={styles.stadiumContainer}>
      <div className={styles.stadiumInfo}>
        <span>
          {`${stadiumInfo.width}x${stadiumInfo.height}m • ${stadiumInfo.ground_type_name}`}
        </span>
      </div>
      {filteredMatches.length === 0 ? (
        <p className={styles.noMatches}>예약 가능한 시간이 없습니다.</p>
      ) : (
        filteredMatches.map((entry, index) => {
          const endTime = calculateEndTime(entry.time);
          return (
            <div
              key={index}
              className={styles.timeItem}
              onClick={() => handleMatchClick(entry.matchId)} // 매치 클릭 이벤트
              style={{ cursor: "pointer" }} // 클릭 가능 표시
            >
              <span className={styles.time}>
                {entry.time}~{endTime}(2시간)
              </span>
              <span className={styles.price}>80,000원</span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StadiumList;
