import React from "react";
import styles from "./ContentHeader.module.css";

const ContentHeader = ({ photoPath }) => {
  return (
    <div className={styles.imageContainer}>
      {photoPath ? (
        <img src={photoPath} alt="Stadium" className={styles.stadiumImage} />
      ) : (
        <div>이미지를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default ContentHeader;
