import React from "react";
import styles from "./ContentHeader.module.css";

const ContentHeader = ({ photo }) => {
  return (
    <div className={styles.imageContainer}>
      {photo ? (
        <img src={photo} alt="Stadium" className={styles.stadiumImage} />
      ) : (
        <div>이미지를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default ContentHeader;
