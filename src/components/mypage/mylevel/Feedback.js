import React from "react";
import "./Feedback.css";

const Feedback = ({ positiveCompliments, negativeCompliments }) => {
  return (
    <div className="feedback">
      <p className="feedback-title">👏 타 플래버 피드백</p>
      <div className="feedback-sections">
        <div className="positive-feedback">
          <h4>잘하고 있어요!</h4>
          <ul>
            {positiveCompliments.map((item, index) => (
              <li key={index}>
                {item.text} <span>{item.vote}회</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="negative-feedback">
          <h4>조금 더 보완해요!</h4>
          <ul>
            {negativeCompliments.map((item, index) => (
              <li key={index}>
                {item.text} <span>{item.vote}회</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
