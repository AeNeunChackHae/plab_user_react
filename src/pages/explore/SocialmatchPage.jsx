import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchList from "../../components/explore/MatchList";
import styles from "./SocialmatchPage.module.css";

const matchConfig = {
  "1": {
    title: "얼리버드 매치",
    description: "30~50% 할인 혜택을 놓치지 마세요. 2일 전까지 무료로 취소할 수 있어요.",
    banner: "/images/earlybird_match_banner.png",
  },
  "2": {
    title: "남녀 모두 매치",
    description: "남자, 여자 함께 즐겁게 풋살을 즐길 수 있어요!",
    banner: "/images/mixed_match_banner.png",
  },
  "3": {
    title: "여자 매치",
    description: "여자끼리 풋살하고 싶을 땐 플랩풋볼!",
    banner: "/images/women_match_banner.png",
  },
  "4": {
    title: "아마추어1 이하 매치",
    description: "비슷한 실력의 플랩버가 모여 경기를 즐겨요.",
    banner: "/images/amateur1_match_banner.png",
  },
  "5": {
    title: "아마추어2 이상 매치",
    description: "빠르고 박진감 넘치는 경기를 즐길 수 있어요!",
    banner: "/images/amateur2_match_banner.png",
  },
};

const SocialmatchPage = () => {
  const { id } = useParams(); // match_code
  const [groupedMatches, setGroupedMatches] = useState({});
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // match_code에 따라 페이지 데이터 설정
  const matchType = matchConfig[id]?.title || "매치";
  const description = matchConfig[id]?.description || "매치를 확인하세요.";
  const banner = matchConfig[id]?.banner || "/images/default_banner.jpg";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/explore/${id}/matches`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch matches data");
        }

        const data = await response.json();

        if (data.success) {
          const grouped = {};
          data.data.forEach((match) => {
            const date = new Date(match.startTime);
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${
              ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
                date.getDay()
              ]
            }`;

            if (!grouped[formattedDate]) grouped[formattedDate] = [];
            grouped[formattedDate].push(match);
          });

          setGroupedMatches(grouped);
        } else {
          throw new Error(data.message || "Failed to fetch matches");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>오류: {error}</div>;

  const hasMatches = Object.keys(groupedMatches).length > 0;

  return (
    <div className={styles.matchPage}>
      {/* 배너 영역 */}
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className={styles.breadcrumb}>홈 &gt; {matchType}</div>
        <h1>{matchType}</h1>
        <p>{description}</p>
      </div>

      {/* 매치가 없는 경우 표시 */}
      {!hasMatches ? (
        <div className={styles.noMatchMessage}>매치가 존재하지 않아요!</div>
      ) : (
        Object.entries(groupedMatches).map(([date, matches], index) => (
          <div key={index}>
            <h2 className={styles.dateHeader}>{date}</h2>
            <MatchList matches={matches} />
            </div>
        ))
      )}
    </div>
  );
};

export default SocialmatchPage;