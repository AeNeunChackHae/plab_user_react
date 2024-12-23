import React, { useState } from "react";
import "./Modal.css";

const ModalBirthdate = ({ currentValue, onSave, onClose }) => {
  const [year, setYear] = useState(currentValue.split("-")[0]);
  const [month, setMonth] = useState(currentValue.split("-")[1]);
  const [day, setDay] = useState(currentValue.split("-")[2]);

  const handleSave = () => {
    const newBirthdate = `${year}-${month}-${day}`;
    onSave(newBirthdate);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>생년월일 수정</h3>
        <div className="bday-dropdowns">
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {Array.from({ length: 100 }, (_, i) => 2024 - i).map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) =>
              String(i + 1).padStart(2, "0")
            ).map((mo) => (
              <option key={mo} value={mo}>
                {mo}
              </option>
            ))}
          </select>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {Array.from({ length: 31 }, (_, i) =>
              String(i + 1).padStart(2, "0")
            ).map((dy) => (
              <option key={dy} value={dy}>
                {dy}
              </option>
            ))}
          </select>
        </div>
        <button className="save-button" onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ModalBirthdate;
