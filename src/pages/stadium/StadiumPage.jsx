import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StadiumPage.module.css";
import StadiumDetails from "../../components/stadium/stadiumdetails/StadiumDetails";
import ContentHeader from "../../components/contentheader/ContentHeader";
import { fetchStadiumPhoto } from "../../components/contentheader/fetchStadiumPhoto";

const StadiumPage = () => {
  const { stadium_id } = useParams();
  const [photoPath, setPhotoPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStadiumPhoto = async () => {
      // console.log("Fetching photo for stadium_id:", stadium_id); // 1. stadium_id 확인
      try {
        const photo = await fetchStadiumPhoto(stadium_id);
        console.log("Fetched Photo Path:", photo); // 2. fetchStadiumPhoto 응답 확인
        setPhotoPath(photo);
      } catch (err) {
        setError("사진을 로드할 수 없습니다. 나중에 다시 시도해주세요.");
        console.error("Error fetching photo:", err); // 3. 에러 로그
      } finally {
        setLoading(false);
      }
    };

    getStadiumPhoto();
  }, [stadium_id]);

  // 4. 상태 확인 디버깅
  useEffect(() => {
    console.log("Current State - photoPath:", photoPath, "loading:", loading, "error:", error);
  }, [photoPath, loading, error]);

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.stadiumpage}>
      <ContentHeader photo_path={photoPath} />
      <div className={styles.mainContent}>
        <StadiumDetails />
      </div>
    </section>
  );
};

export default StadiumPage;
