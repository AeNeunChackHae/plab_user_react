import React, { useState } from "react";
import "./Feedback.css";

const Feedback = ({ compliments }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="feedback">
      <h3>👏 타 플래버 피드백</h3>
      <button className="praise-button" onClick={toggleModal}>
        피드백 내역을 보시려면 클릭하세요
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>피드백 내역</h3>
            <ul>
              {compliments.map((item, index) => (
                <li key={index}>
                  {item.text} : <strong>{item.votes} </strong>
                </li>
              ))}
            </ul>
            <button onClick={toggleModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
