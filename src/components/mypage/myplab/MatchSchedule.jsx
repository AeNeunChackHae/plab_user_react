import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchSchedule.module.css";

const MatchSchedule = ({ selectedDate, upcomingSchedule }) => {
  const navigate = useNavigate();
  const {
    upcomingMatches,
    cancelledMatches,
    underCapacityCancelledMatches,
  } = upcomingSchedule;

  // 채팅방 입장 핸들러
  // const handleChatRoom = () => {
  //   alert("채팅방에 입장합니다.");
  // };

  // 매치 신청 취소 핸들러
  const handleCancelMatch = async (match_id) => {
    // 디버깅 메시지
    // console.log("[프론트엔드] 매치 취소 요청 - match_id:", match_id);
  
     // 확인 알림
     const userConfirmed = window.confirm("신청한 매치를 취소하시겠습니까?");
     if (!userConfirmed) {
       // 사용자가 취소를 선택한 경우
       return;
     }

    try {
      const response = await fetch("http://127.0.0.1:8080/mypage/myplabcancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          matchId: match_id, // 사용자 ID는 isAuth에서 처리
        }),
      });
  
      const data = await response.json();
      // console.log("[프론트엔드] 응답 결과:", data);
  
      if (response.ok && data.success) {
        alert("매치가 성공적으로 취소되었습니다.");
        window.location.reload();
      } else {
        alert(`${data.message || "매치를 취소하는 중 오류가 발생했습니다."}`);
      }
    } catch (error) {
      console.error("프론트엔드 오류:", error);
      alert("서버 오류로 인해 매치를 취소할 수 없습니다.");
    }
  };

  const handleMatchClick = (match_id) => {
    navigate(`/match/${match_id}`);
  };

  // 모든 매치를 하나로 병합하고 날짜 기준으로 정렬
  const allMatches = [
    ...upcomingMatches.map((match) => ({ ...match, type: "upcoming" })),
    ...cancelledMatches.map((match) => ({ ...match, type: "cancelled" })),
    ...underCapacityCancelledMatches.map((match) => ({
      ...match,
      type: "underCapacityCancelled",
    })),
  ].sort((a, b) => new Date(a.match_start_time) - new Date(b.match_start_time));

  // 선택한 날짜에 해당하는 매치 필터링
  const filteredMatches = selectedDate
    ? allMatches.filter(
        (match) =>
          new Date(match.match_start_time).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : allMatches;

  return (
    <div>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match, index) => (
          <div
            key={index}
            className={styles.matchItem}
            onClick={() => handleMatchClick(match.match_id)} // 클릭 시 매치 상세 페이지로 이동
            style={{ cursor: "pointer" }}
          >
            {/* 취소한 매치 */}
            {match.type === "cancelled" && (
              <div className={styles.cancelContent}>
                <div className={styles.statusCircle_cancle}>
                  <p className={styles.statusInfo}>취소</p>
                </div>
                <div className={styles.matchInfo}>
                  <p className={styles.cancelledTitle}>취소한 매치</p>
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
                  <p className={styles.matchStadium}>{match.stadium_name}</p>
                </div>
              </div>
            )}

            {/* 취소된 매치 */}
            {match.type === "underCapacityCancelled" && (
              <div className={styles.cancelContent}>
                <div className={styles.statusCircle_cancle}>
                  <p className={styles.statusInfo}>취소</p>
                </div>
                <div className={styles.matchInfo}>
                  <p className={styles.cancelledTitle}>취소된 매치</p>
                  <p className={styles.cancelReason}>참여 인원이 부족해 매치가 취소되었습니다</p>
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
                  <p className={styles.matchStadium}>{match.stadium_name}</p>
                </div>
              </div>
            )}

            {/* 진행 예정 매치 */}
            {match.type === "upcoming" && (
              <div className={styles.matchContent}>
                <div className={styles.leftContainer}>
                  <div className={styles.statusCircle_upcoming}>
                    <p className={styles.statusInfo}>소셜</p>
                  </div>
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
                    <p className={styles.matchStadium}>{match.stadium_name}</p>
                    <p className={styles.matchDetails}>
                      {match.allow_gender} · {match.level_criterion}
                    </p>
                  </div>
                </div>
                <div className={styles.matchButtonsContainer}>
                  {/* <button onClick={handleChatRoom} className={styles.matchButton}>
                    채팅방 입장
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelMatch(match.match_id);
                    }}
                    className={styles.matchButton}
                  >
                    신청 취소
                  </button>

                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className={styles.noMatches}>선택한 날짜에 해당하는 매치가 없습니다.</p>
      )}
    </div>
  );
};

export default MatchSchedule;
