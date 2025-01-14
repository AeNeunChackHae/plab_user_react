import React, { useEffect, useState } from "react";
import styles from "./MatchPoints.module.css";
import { config } from "../../../config";


const MatchPoints = ({ match_id }) => {
  const [matchPointsData, setMatchPointsData] = useState(null); // 매치 포인트 데이터 상태
  const [error, setError] = useState(null); // 에러 상태

  // 데이터 가져오기
  useEffect(() => {
    const fetchMatchPoints = async () => {
      const api = config.aws.ec2_host_user
      try {
        const response = await fetch(`${api}/match/points`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id }),
        });

        if (!response.ok) {
          throw new Error("매치 포인트 데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setMatchPointsData(data);
        // console.log('setMatchPointsData(data)',data)
      } catch (err) {
        console.error("매치 포인트 데이터를 로드하는 중 오류:", err);
        setError(err.message);
      }
    };

    if (match_id) {
      fetchMatchPoints();
    }
  }, [match_id]);

  if (error) {
    return (
      <div className={styles.error}>
        매치 포인트 데이터를 불러올 수 없습니다: {error}
      </div>
    );
  }

  if (!matchPointsData) {
    return <div className={styles.loading}>매치 포인트 데이터를 로딩 중...</div>;
  }

  // 레벨 텍스트 변환 함수
  const getLevelText = (level) => {
    switch (level) {
      case 0:
        return "모든 레벨";
      case 1:
        return "아마추어 1 이하";
      case 2:
        return "아마추어 1 이상";
      case 3:
        return "아마추어 2 이상";
      default:
        return "알 수 없음";
    }
  };

  // 성별 텍스트 변환 함수
  const getGenderText = (gender) => {
    switch (gender) {
      case 0:
        return "남성만";
      case 1:
        return "여성만";
      case 2:
        return "남녀 모두";
      default:
        return "알 수 없음";
    }
  };

  const { manager_name, allow_gender, level_criterion } = matchPointsData;


  return (
    <section className={styles.section}>
      <div className={styles.matchPointsTitle}>
        <h4>매치 포인트</h4>
      </div>

      <div className={styles.matchPointsInfo}>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_level.svg"
            className={styles.icon}
            alt="레벨"
          />
          <p>{getLevelText(level_criterion)}</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_gender.svg"
            className={styles.icon}
            alt="성별"
          />
          <p>{getGenderText(allow_gender)}</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_stadium.svg"
            className={styles.icon}
            alt="경기 형태"
          />
          <p>6vs6 3파전</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_max_player_cnt.svg"
            className={styles.icon}
            alt="참가 인원"
          />
          <p>10~18명</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_shoes.svg"
            className={styles.icon}
            alt="신발"
          />
          <p>풋살화/운동화</p>
        </div>
      </div>

      <div className={styles.matchPointsAdditional}>
        <ul>
          <li className={styles.infoList}>
            <img
              src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_manager.svg"
              className={styles.icon}
              alt="매니저"
            />
            <div>
              <p>{manager_name} 매니저가 진행해요</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MatchPoints;
