import React, { useState } from "react";
import "./Feedback.css";

const Feedback = ({ compliments }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="feedback">
      <h3>👏 타 플래버 칭찬 내역</h3>
      <button className="praise-button" onClick={toggleModal}>
        칭찬 내역을 보시려면 클릭하세요
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>칭찬 내역</h3>
            <ul>
              {compliments.map((item, index) => (
                <li key={index}>{item}</li>
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
