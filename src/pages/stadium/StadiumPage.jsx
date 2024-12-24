import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './StadiumPage.module.css'
import StadiumDetails from '../../components/stadium/stadiumdetails/StadiumDetails';
import ContentHeader from '../../components/contentheader/ContentHeader';


const StadiumPage = () => {
  const { stadium_id } = useParams();
  const [stadiumPhoto, setPhotoPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStadiumPhoto = async () => {
      try {
        const response = await fetch('http://localhost:8080/stadium', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stadium_id }),
        });

        if (!response.ok) {
          throw new Error('이미지를 불러오는 중 오류가 발생했습니다.');
        }

        const data = await response.json();
        setPhotoPath(data.stadiumPhoto); // photo 데이터 설정
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiumPhoto();
  }, [stadium_id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className={styles.stadiumpage} >
        <ContentHeader {...stadiumPhoto}/>
        <div className={styles.mainContent}>
            <StadiumDetails/>
        </div>
      </section>
    </>
  );
};

export default StadiumPage;
