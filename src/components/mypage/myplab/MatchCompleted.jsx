import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabNavigation from "../../mypage/myplab/TabNavigation";
import "./MatchCompleted.css";

const MatchCompleted = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!userId) {
      console.error("로그인 정보가 없습니다.");
      return;
    }

    const fetchCompletedMatches = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8080/mypage/myplabcompleted",
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
        setEvents(Array.isArray(data) ? data : []);
        console.log("getcompletedmatches에서 받은 데이터:", data);
      } catch (error) {
        console.error("Error fetching completed matches:", error.message);
      }
    };

    fetchCompletedMatches();
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
      event.status === "completed"
    );
  });

  const handleActivityInput = (matchId) => {
    navigate("/mypage/mylevel");
  };

  const viewMatchResult = (matchId) => {
    navigate(`/match/completed/${matchId}`);
  };

  return (
    <div>
      <TabNavigation />
      <div>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={index} className="match-item">
              <div className="match-info">
                <p className="match-date-time">
                  {new Date(match.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </p>
                <p className="match-stadium-name">
                  <strong>{match.description}</strong>
                </p>
              </div>
              <div className="match-buttons">
                <button onClick={() => handleActivityInput(match.id)}>
                  활동량 기입
                </button>
                <button onClick={() => viewMatchResult(match.id)}>
                  매치결과확인
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>완료된 매치가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MatchCompleted;
