import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/contentheader/ContentHeader";
import MatchPoints from "../../components/match/matchpoints/MatchPoints";
import TeamPreview from "../../components/match/teampreview/TeamPreview";
import ResultAndVideo from "../../components/match/resultandvideo/ResultAndVideo";
import StadiumInfo from "../../components/match/stadiuminfo/StadiumInfo";
import MatchRules from "../../components/match/matchrules/MatchRules";
import RefundPolicy from "../../components/match/refundpolicy/RefundPolicy";
import TeamMatchRules from "../../components/match/teammatchrules/TeamMatchRules";
import LeagueMatchRule from "../../components/match/leaguematchrule/LeagueMatchRule";
import LeagueMannerGuide from "../../components/match/leaguemannerguide/LeagueMannerGuide";
import TeamRefundPolicy from "../../components/match/teamrefundpolicy/TeamRefundPolicy";
import MatchDetails from "../../components/match/matchdetails/MatchDetails";
import PlaberOfTheMatch from "../../components/match/plaberofthematch/PlaberOfTheMatch";
import TeamStandings from "../../components/match/teamstandings/TeamStandings";
import MatchData from "../../components/match/matchdata/MatchData";
import styles from "./MatchPage.module.css";

const MatchPage = () => {
  const { match_id } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [stadiumInfo, setStadiumInfo] = useState(null);
  const [matchPoints, setMatchPoints] = useState(null);
  const [stadiumPhoto, setStadiumPhoto] = useState(null);
  const [topPlayer, setTopPlayer] = useState(null);
  const [matchDetails, setmatchDetails] = useState(null);
  const [match, setmatch] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 데이터 가져오기
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id }),
        });

        if (response.ok) {
          const data = await response.json();

          console.log("Fetched data:", data); // 로깅

          setMatchData(data.matchData);
          setStadiumInfo(data.stadiumInfo);
          setStadiumPhoto(data.stadiumPhoto);
          setMatchPoints(data.matchPoints);
          setTopPlayer(data.topPlayer);
          setmatchDetails(data.matchDetails)
          setmatch(data.match)
        } else {
          const errorMessage = `매치 데이터를 찾을 수 없습니다. (상태 코드: ${response.status})`;
          setError(errorMessage);
        }
      } catch (err) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchMatchData();
  }, [match_id]);

  // 매치 상태 설정
  useEffect(() => {
    if (match) {
      const matchStartTime = new Date(match.match_start_time);

      if (match.status_code === 0) {
        const earlyBirdEnd = new Date(matchStartTime.getTime() - 10 * 24 * 60 * 60 * 1000);
        const regularEnd = new Date(matchStartTime.getTime() - 10 * 60 * 1000);

        if (currentTime < earlyBirdEnd) {
          setStatus("earlyBird");
        } else if (currentTime < regularEnd) {
          setStatus("regular");
        } else if (currentTime < matchStartTime) {
          setStatus("closed");
        } else {
          setStatus("finished");
        }
      } else if (match.status_code === 1) {
        if (currentTime < matchStartTime) {
          setStatus("preview");
        } else {
          setStatus("finished");
        }
      }
    }
  }, [currentTime, match]);

  // 현재 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!match && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles.matchPage}> 
    <ContentHeader {...stadiumPhoto} />
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          {match.status_code === 0 && (
            <>
              {status === "finished" && (
                <>
                  <PlaberOfTheMatch {...topPlayer} />
                  <MatchPoints {...matchPoints} />
                </>
              )}
              {status !== "finished" && <MatchPoints {...matchPoints} />}
              {status !== "finished" && <MatchData {...matchData} />}
              <StadiumInfo {...stadiumInfo} />
              <MatchRules />
              <RefundPolicy />
            </>
          )}
          {match.status_code === 1 && (
            <>
              <MatchPoints {...matchPoints} />
              {status === "preview" && <TeamPreview />}
              {status === "finished" && (
                <>
                  <TeamStandings standings={matchData.team_data?.standings || []} />
                  <ResultAndVideo results={matchData.team_data?.results || []} />
                </>
              )}
              <StadiumInfo {...stadiumInfo} />
              <TeamMatchRules />
              <LeagueMatchRule />
              <LeagueMannerGuide />
              <TeamRefundPolicy />
            </>
          )}
        </div>
        <div className={styles.rightSection}>

          <MatchDetails {...stadiumInfo} {...matchDetails} />
        </div>
      </div>
    </section>
  );
};

export default MatchPage;
