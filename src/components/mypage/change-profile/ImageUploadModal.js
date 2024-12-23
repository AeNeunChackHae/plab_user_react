import React, { useState } from "react";

const ImageUploadModal = ({ onClose, onSave }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">엠블럼 업로드</h3>
        <div className="upload-container">
          <label className="upload-button">
            <input
              type="file"
              accept=".png, .jpg"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <div className="upload-circle">
              <span className="upload-icon">+</span>
              <p className="upload-text">{fileName || "파일 첨부"}</p>
            </div>
          </label>
          <p className="file-info">
            120*120px 200kb 이내 png, jpg 파일을 업로드 하세요
          </p>
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="save-button" onClick={onSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
