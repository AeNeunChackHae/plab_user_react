import React from "react";
import "./MatchList.css";

const MatchList = ({ matches }) => {
  return (
    <div className="match-list">
      {matches.length === 0 ? (
        <div>
          <p>선택한 날짜에 일정이 없습니다.</p>
        </div>
      ) : (
        matches.map((match, index) => (
          <div
            key={index}
            className={`match-item ${
              match.status === "cancelled" ? "cancelled" : ""
            }`}
          >
            <p>
              <strong>날짜:</strong> {match.date}
            </p>
            <p>
              <strong>설명:</strong> {match.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchList;
