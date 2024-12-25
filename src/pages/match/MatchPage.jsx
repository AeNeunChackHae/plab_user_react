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
import TeamStandings from "../../components/match/teamstandings/TeamStandings";
import MatchData from "../../components/match/matchdata/MatchData";
import styles from "./MatchPage.module.css";

const MatchPage = () => {
  const { match_id } = useParams(); // match_id를 URL에서 추출
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("");

  // 매치 데이터 가져오기
  useEffect(() => {
    const fetchMatchDetails = async () => {
      // console.log(match_id)
      try {
        const response = await fetch("http://localhost:8080/match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id }),
        });
        console.log(match_id)

        if (!response.ok) {
          throw new Error("매치 데이터를 로드할 수 없습니다.");
        }

        const data = await response.json();
        setMatch(data); // 서버에서 반환된 전체 데이터를 저장

        // console.log('데이타',data)
      } catch (err) {
        console.error("매치 데이터를 로드하는 중 오류:", err);
        setError(err.message);
      }
    };

    if (match_id) {
      fetchMatchDetails();
    }
  }, [match_id]);

  // 매치 상태 설정
  useEffect(() => {
    if (match) {
      const matchStartTime = new Date(match.match_start_time || Date.now());
      const earlyBirdEnd = new Date(
        matchStartTime.getTime() - 10 * 24 * 60 * 60 * 1000
      );
      const regularEnd = new Date(
        matchStartTime.getTime() - 10 * 60 * 1000
      );

      if (match.status_code === 0) {
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
        setStatus(currentTime < matchStartTime ? "preview" : "finished");
      }
    }
  }, [currentTime, match]);

  // 현재 시간 갱신
  useEffect(() => {
    // console.log(match_id)  
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [match_id]);

  if (error) {
    return (
      <div className={styles.error}>
        데이터를 로드할 수 없습니다: {error}
      </div>
    );
  }

  if (!match) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  // console.log("현재 match.status_code 값:", match.match_type);
  // console.log("현재 status 값:", status);

  return (
    <section className={styles.matchPage}>
      {/* {console.log("Match data before rendering ContentHeader:", match.stadium_id)}  */}
      <ContentHeader stadiumId={match.stadium_id || null}/>
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          {match.match_type === 0 ? (
            <>
              <MatchPoints match_id={match_id} />
              {/* status={match.status_code}  */}
              {status !== "finished" && (
                <MatchData {...(match.matchData || {})} />
              )}
              <StadiumInfo
                {...(match.stadiumInfo || { defaultInfo: "정보 없음" })}
              />
              <MatchRules />
              <RefundPolicy />
            </>
          ) : (
            <>
              <MatchPoints match_id={match_id} />
              {status === "preview" && <TeamPreview />}
              {status === "finished" && (
                <>
                  <TeamStandings
                    standings={match.matchData?.team_data?.standings || []}
                  />
                  <ResultAndVideo
                    results={match.matchData?.team_data?.results || []}
                  />
                </>
              )}
              <StadiumInfo
                {...(match.stadiumInfo || { defaultInfo: "정보 없음" })}
              />
              <TeamMatchRules />
              <LeagueMatchRule />
              <LeagueMannerGuide />
              <TeamRefundPolicy />
            </>
          )}
        </div>
        <div className={styles.rightSection}>
        {/* {console.log("Match data before rendering MetchDetails:", match_id,match.stadium_id)} 디버깅 */}
          <MatchDetails match_id={match_id} stadiumId={match.stadium_id} statusCode={match.status_code}
          // status={match.status_code} 
            // {...(match.matchDetails || { defaultDetails: "세부 정보 없음" })}
          />
        </div>
      </div>
    </section>
  );
};

export default MatchPage;