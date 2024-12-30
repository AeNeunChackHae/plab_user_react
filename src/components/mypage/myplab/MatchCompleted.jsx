import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabNavigation from "../../mypage/myplab/TabNavigation";
import "./MatchCompleted.css";

const MatchCompleted = ({ selectedDate, events }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const navigate = useNavigate(); // React Router's navigation hook

  // 선택된 날짜 또는 현재 월과 연도 계산
  const currentMonth = selectedDate
    ? new Date(selectedDate).getMonth()
    : new Date().getMonth();
  const currentYear = selectedDate
    ? new Date(selectedDate).getFullYear()
    : new Date().getFullYear();

  // 완료된 매치 필터링
  const filteredMatches = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear &&
      event.status === "completed"
    );
  });

  // 활동량 기입
  const handleActivityInput = (matchId) => {
    console.log(`활동량 기입 페이지로 이동: Match ID ${matchId}`);
    alert("최근 소셜 매치 리뷰에서 활동량 기입을 해주세요!");
    navigate("/mypage/mylevel"); // '/mypage/mylevel' 페이지로 이동
  };

  // 매치 결과 확인
  const viewMatchResult = (matchId) => {
    console.log(`매치 결과 확인: Match ID ${matchId}`);
    alert("매치 결과 페이지로 이동합니다!");
    navigate(`/match/completed/${matchId}`); // /match/completed/:matchId로 이동
  };

  // 매치 평가
  const evaluateMatch = (matchId) => {
    setSelectedMatch(matchId);
    setModalMessage("매치 평가를 진행해주세요.");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  // 아이콘 선택 로직
  const getCompletedIcon = () => "/icons/completed-icon.png"; // 완료된 매치 아이콘 경로

  return (
    <div>
      <TabNavigation />
      <div>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={index} className="match-item">
              {/* 동그란 아이콘과 경기 정보 */}
              <div className="match-info">
                <img
                  src={getCompletedIcon()}
                  alt="completed icon"
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
                <button onClick={() => handleActivityInput(match.id)}>
                  활동량 기입
                </button>
                <button onClick={() => viewMatchResult(match.id)}>
                  매치결과확인
                </button>
                <button onClick={() => evaluateMatch(match.id)}>
                  매치평가
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>해당 월에 완료한 매치가 없습니다.</p>
        )}
      </div>

      {/* 평가 모달 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            {modalMessage === "매치 평가를 진행해주세요." && (
              <div>
                <button onClick={closeModal}>확인</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCompleted;
