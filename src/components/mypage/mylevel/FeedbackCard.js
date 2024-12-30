import React from "react";
import "./FeedbackCard.css";

const FeedbackCard = ({ pom, yellowCard, redCard }) => {
  return (
    <div className="feedback-card">
      <h3>⚽ 나의 매너</h3>
      <p>누적 내용이 모두 표시돼요</p>
      <div className="card-stats">
        <div>
          POM
          <br />
          <span>{pom}</span>
        </div>
        <div>
          옐로카드
          <br />
          <span>{yellowCard}</span>
        </div>
        <div>
          레드카드
          <br />
          <span>{redCard}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
