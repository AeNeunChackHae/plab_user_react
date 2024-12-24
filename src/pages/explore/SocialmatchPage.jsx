import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchList from "../../components/explore/MatchList";
import styles from "./SocialmatchPage.module.css";
import matchesData from "../../components/dummyData/matches.json";

const SocialmatchPage = () => {
  const { id } = useParams();
  const [matchType, setMatchType] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [groupedMatches, setGroupedMatches] = useState({});

  useEffect(() => {
    // URL ID에 따라 데이터 필터링
    const filteredData = matchesData.find((data) => data.id === id);
    if (filteredData) {
      setMatchType(filteredData.type);
      setDescription(filteredData.description);
      setBanner(`/images/${filteredData.banner}`);

      // 날짜별로 매치 데이터 그룹화
      const grouped = {};
      filteredData.matches.forEach((match) => {
        const date = new Date(match.date);
        const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${
          ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
            date.getDay()
          ]
        }`;

        if (!grouped[formattedDate]) grouped[formattedDate] = [];
        grouped[formattedDate].push(match);
      });

      setGroupedMatches(grouped);
    }
  }, [id]);

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

      {/* 날짜별 매치 리스트 */}
      {Object.entries(groupedMatches).map(([date, matches], index) => (
        <div key={index}>
          <h2 className={styles.dateHeader}>{date}</h2>
          <MatchList matches={matches} />
        </div>
      ))}
    </div>
  );
};

export default SocialmatchPage;
