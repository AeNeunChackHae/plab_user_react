import React, { useState } from "react";
import "./Modal.css";

const ModalPreferredLocation = ({ currentValue, onSave, onClose }) => {
  const [city, setCity] = useState(currentValue.split(" ")[0]);
  const [district, setDistrict] = useState(currentValue.split(" ")[1]);

  const handleSave = () => {
    const newLocation = `${city} ${district}`;
    onSave(newLocation);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div>
          <h3 className="Preferred-text-h3">선호지역 수정</h3>
          <p className="Preferred-text-p">주로 활동하는 지역을 선택해주세요</p>
        </div>
        <div className="dropdowns">
          <p className="modal-class-text">도시</p>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="인천">인천</option>
          </select>
          <p className="modal-class-text">지역</p>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="종로구">종로구</option>
            <option value="강남구">강남구</option>
            <option value="서초구">서초구</option>
            <option value="송파구">송파구</option>
          </select>
          <p className="modal-class-text">활동반경</p>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="10km">10km</option>
            <option value="20km">20km</option>
            <option value="30km">30km</option>
            <option value="40km">40km</option>
          </select>
        </div>
        <button className="save-button" onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ModalPreferredLocation;
