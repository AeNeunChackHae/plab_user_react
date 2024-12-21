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
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{teamName}</h2>
        <p className={styles.title}>로고를 선택해주세요</p>
        <p className={styles.subtitle}>사진 업로드를 통해 로고를 추가할 수 있어요!</p>

        <div className={styles.uploadContainer}>
          {previewUrl && <img src={previewUrl} alt="로고 미리보기" className={styles.preview} />}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        <button className={styles.backButton} onClick={onBack}>
          뒤로
        </button>
      </div>
    </div>
  );
};

export default LogoUploadModal;
