import React, { useState, useEffect } from "react";
import TabNavigation from "../../mypage/myplab/TabNavigation";
import "./MatchSchedule.css";

const MatchSchedule = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("authToken");
  //id 22로 진행

  useEffect(() => {
    if (!userId) {
      console.error("사용자 ID가 없습니다.");
      return;
    }

    const fetchScheduleData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8080/mypage/myplabongoing",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data); // 데이터 상태 업데이트
        console.log("myplabongoing에서 받은 데이터:", data);
      } catch (error) {
        console.error("Error fetching match schedule:", error.message);
      }
    };

    fetchScheduleData();
  }, [userId, token]);

  const filteredMatches = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() ===
        (selectedDate
          ? new Date(selectedDate).getMonth()
          : new Date().getMonth()) &&
      eventDate.getFullYear() ===
        (selectedDate
          ? new Date(selectedDate).getFullYear()
          : new Date().getFullYear()) &&
      (event.status === "confirmed" || event.status === "cancelled")
    );
  });

  const handleCancelMatch = async (matchId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/mypage/myplabcancel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ matchId, userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);

      // 매치 취소된 이벤트 제거
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== matchId)
      );
    } catch (error) {
      console.error("매치 취소 실패:", error.message);
      alert("매치 취소에 실패했습니다.");
    }
  };

  const confirmCancel = () => {
    if (selectedMatch) {
      handleCancelMatch(selectedMatch); // 선택된 매치 ID 전달
    }
    setShowModal(false);
    setModalMessage("");
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const getIcon = (match) => {
    if (match.status === "cancelled") {
      return "/icons/cancelled-icon.png";
    }
    return match.type === "social"
      ? "/icons/social-match-icon.png"
      : "/icons/team-match-icon.png";
  };

  return (
    <div>
      <TabNavigation />
      <div>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={index} className="match-item">
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
              <div className="match-buttons">
                {match.status === "confirmed" && (
                  <button
                    onClick={() => {
                      setSelectedMatch(match.id); // 선택된 매치 ID 설정
                      setModalMessage("정말 취소하시겠습니까?");
                      setShowModal(true);
                    }}
                  >
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={confirmCancel}>확인</button>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchSchedule;
