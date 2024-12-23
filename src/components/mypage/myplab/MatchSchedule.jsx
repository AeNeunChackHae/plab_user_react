import React, { useState } from "react";
import TabNavigation from "../../mypage/myplab/TabNavigation";
import "./MatchSchedule.css";

const MatchSchedule = ({ selectedDate, events }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);

  // 선택된 날짜 또는 현재 월과 연도 계산
  const currentMonth = selectedDate
    ? new Date(selectedDate).getMonth()
    : new Date().getMonth();
  const currentYear = selectedDate
    ? new Date(selectedDate).getFullYear()
    : new Date().getFullYear();

  // 현재 월 컨펌, 취소 매치 필터링
  const filteredMatches = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear &&
      (event.status === "confirmed" || event.status === "cancelled")
    );
  });

  // 채팅방 입장
  const openChatRoom = (matchId) => {
    console.log(`채팅방 입장: Match ID ${matchId}`);
    alert("채팅방 창이 열렸습니다! (io 연결 필요)");
  };

  // 매치 취소
  const handleCancelMatch = (matchId) => {
    setSelectedMatch(matchId);
    setModalMessage("정말 취소하시겠습니까?");
    setShowModal(true);
  };

  const confirmCancel = () => {
    console.log(`매치 취소 완료: Match ID ${selectedMatch}`);
    setModalMessage("취소가 완료되었습니다.");
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  // 아이콘 선택 로직
  const getIcon = (match) => {
    if (match.status === "cancelled") {
      return "/icons/cancelled-icon.png"; // 매치 취소 아이콘 경로
    }
    return match.type === "social"
      ? "/icons/social-match-icon.png" // 소셜 매치 아이콘 경로
      : "/icons/team-match-icon.png"; // 팀 매치 아이콘 경로
  };

  return (
    <div>
      <TabNavigation />
      <div>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={index} className="match-item">
              {/* 동그란 이미지와 경기 정보 */}
              <div className="match-info">
                <img
                  src={getIcon(match)}
                  alt="status-icon"
                  className="status-circle"
                />
                <div>
                  <p className="match-date-time">
                    {new Date(match.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="match-stadium-name">
                    <strong>{match.description}</strong>
                  </p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="match-buttons">
                {match.status === "confirmed" && (
                  <button onClick={() => openChatRoom(match.id)}>
                    채팅방 입장
                  </button>
                )}
                {match.status === "confirmed" && (
                  <button onClick={() => handleCancelMatch(match.id)}>
                    매치취소
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>해당 월에 매치 일정이 없습니다.</p>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            {modalMessage === "정말 취소하시겠습니까?" && (
              <div>
                <button onClick={confirmCancel}>확인</button>
                <button onClick={closeModal}>취소</button>
              </div>
            )}
            {modalMessage === "취소가 완료되었습니다." && (
              <button onClick={closeModal}>확인</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchSchedule;
