import React, { useState } from "react";

const ImageUploadModal = ({ onClose, onSave }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSave = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/mypage/change/profile/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data.profile_path); // 업로드된 이미지 URL 반환
        onClose();
      } else {
        const errorData = await response.json();
        alert(`이미지 업로드 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">프로필 이미지 업로드</h3>
        <div className="upload-container">
          <label className="upload-button">
            <input
              id="user_photo"
              name="user_photo"
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
            120x120px, 200KB 이하의 PNG 또는 JPG 파일을 업로드하세요.
          </p>
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="save-button" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
