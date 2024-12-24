import React, { useState } from 'react';
import styles from './LogoUploadModal.module.css';

const LogoUploadModal = ({ teamName, onBack, onClose, onLogoUpload }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // 선택한 파일 미리보기 URL 생성
      onLogoUpload(file); // 파일 업로드 이벤트 전달
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {/* 제목 */}
        <h2 className={styles.teamName}>{teamName}</h2>
        <p className={styles.title}>
          엠블럼을<br />
          선택해주세요
        </p>
        <p className={styles.subtitle}>사진 업로드를 통해 엠블럼을 설정할 수 있어요!</p>

        {/* 파일 업로드 */}
        <div className={styles.uploadContainer}>
          {previewUrl && <img src={previewUrl} alt="로고 미리보기" className={styles.preview} />}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <label htmlFor="fileInput" className={styles.uploadButton}>
            사진 업로드
          </label>
        </div>

        {/* 뒤로 가기 버튼 */}
        <button className={styles.backButton} onClick={onBack}>
          뒤로
        </button>
      </div>
    </div>
  );
};

export default LogoUploadModal;