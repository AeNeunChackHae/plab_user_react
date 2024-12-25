import React from "react";
import styles from "./ContentHeader.module.css";

const ContentHeader = ({ photo_path }) => {
  // console.log("ContentHeader received photo_path:", photo_path);

  return (
    <div className={styles.imageContainer}>
      {photo_path ? (
        <img
          src={photo_path}
          alt="Stadium view"
          className={styles.headerImage}
          onError={(e) => {
            e.target.src = "/images/default-image.png"; // 대체 이미지
          }}
        />
      ) : (
        <div className={styles.noImage}>이미지를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default ContentHeader;
