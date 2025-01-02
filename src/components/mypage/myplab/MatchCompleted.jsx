import React from "react";
import "./MatchCompleted.css";

const MatchCompleted = ({ selectedDate, completedSchedule }) => {
  const { completedMatches } = completedSchedule;

  return (
    <div>
      {completedMatches.length > 0 ? (
        completedMatches.map((match, index) => (
          <div key={index} className="match-item">
            <p>경기 시간: {match.match_start_time} - {match.match_end_time}</p>
            <p>경기장: {match.stadium_name}</p>
          </div>
        ))
      ) : (
        <p>완료된 매치가 없습니다.</p>
      )}
    </div>
  );
};

export default MatchCompleted;