import React, { useEffect, useState } from "react";
import styles from "./ContentHeader.module.css";
import { config } from '../../config';

const ContentHeader = ({ stadiumId }) => {
  const api = config.aws.ec2_host_user
  const [photoPath, setPhotoPath] = useState(null); // 이미지 경로 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    // console.log(`matchpages에서 받아온 stadiumId 데이터: ${stadiumId}`);

    const fetchPhotoPath = async () => {
      if (!stadiumId) {
        console.error("stadiumId가 제공되지 않았습니다.");
        setError("stadiumId가 제공되지 않았습니다.");
        return;
      }

      try {
        // Body 값으로 stadiumId를 전달
        const response = await fetch(`${api}/stadium/stadiumPhoto`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stadium_id: stadiumId }),
        });

        // console.log(`POST 요청 URL: http://localhost:8080/stadium/stadiumPhoto`);
        // console.log(`요청 Body: ${JSON.stringify({ stadium_id: stadiumId })}`);
        // console.log(`응답 상태 코드: ${response.status}`);

        if (!response.ok) {
          throw new Error("이미지를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setPhotoPath(data.photo_path); // 서버에서 받은 이미지 경로 저장
        // console.log("받은 photo_path 데이터:", data.photo_path);
      } catch (err) {
        console.error("이미지 로드 오류:", err);
        setError("이미지를 가져오는 데 실패했습니다.");
      }
    };

    fetchPhotoPath();
  }, [stadiumId, api]);

  // 에러가 발생한 경우
  if (error) {
    return (
      <div className={styles.error}>
        이미지를 불러올 수 없습니다: {error}
      </div>
    );
  }

  // 이미지 렌더링
  return (
    <div className={styles.imageContainer}>
      {photoPath ? (
        <img
          src={photoPath}
          alt={`Stadium ${stadiumId}`}
          className={styles.headerImage}
          onError={(e) => {
            e.target.src = "/images/default-image.png"; // 대체 이미지 경로
          }}
        />
      ) : (
        <div className={styles.noImage}>이미지를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default ContentHeader;
