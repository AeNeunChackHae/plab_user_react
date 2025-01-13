import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchCompleted.module.css";

const MatchCompleted = ({ selectedDate, selectedMonth, completedSchedule }) => {
  const navigate = useNavigate();

  // 안전하게 completedMatches를 추출
  const completedMatches = Array.isArray(completedSchedule?.completedMatches)
    ? completedSchedule.completedMatches
    : [];

  // 월 필터링 (초기 상태에서 현재 월의 매치만 보여줌)
  const filteredByMonth = completedMatches.filter((match) => {
    const matchDate = new Date(match.match_start_time);
    return (
      matchDate.getFullYear() === selectedMonth.getFullYear() &&
      matchDate.getMonth() === selectedMonth.getMonth()
    );
  });

  // 날짜 필터링 (선택된 날짜가 있을 경우 해당 날짜의 매치만 보여줌)
  const filteredMatches = selectedDate
    ? filteredByMonth.filter(
        (match) =>
          new Date(match.match_start_time).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : filteredByMonth;

  // 버튼 핸들러
  const handleActivityInput = () => {
    navigate("/mypage/mylevel");
  };

  const handleMatchResult = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  const handleEvaluation = (matchId) => {
    navigate(`/mypage/feedback/${matchId}/user`);
  };

  return (
    <div className={styles.container}>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <div key={match.match_id} className={styles.matchItem}>
            {/* 상태 원형 표시 */}
            <div className={styles.statusCircle}>
              <span>
                {match.applicant_status === "불참" ? "불참" : "완료"}
              </span>
            </div>

            {/* 매치 정보 */}
            <div className={styles.matchInfo}>
              <p className={styles.matchDate}>
                {new Date(match.match_start_time).toLocaleDateString("ko-KR", {
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              <p className={styles.matchStadium}>
                <strong>{match.stadium_name}</strong>
              </p>
            </div>

            {/* 버튼 컨테이너 */}
            {match.applicant_status === "신청완료" ? (
              <div className={styles.matchButtons}>
                <button
                  className={styles.button}
                  onClick={handleActivityInput}
                >
                  활동량 기입
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleMatchResult(match.match_id)}
                >
                  매치 결과 확인
                </button>
                {!match.feedback_given ? (
                  <button
                    className={styles.button}
                    onClick={() => handleEvaluation(match.match_id)}
                  >
                    매치 평가
                  </button>
                ) : (
                  <button className={styles.buttonDisabled} disabled>
                    평가 완료
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.matchButtonsHidden}></div>
            )}
          </div>
        ))
      ) : (
        <p className={styles.noMatches}>선택한 날짜에 완료된 매치가 없습니다.</p>
      )}
    </div>
  );
};

export default MatchCompleted;
