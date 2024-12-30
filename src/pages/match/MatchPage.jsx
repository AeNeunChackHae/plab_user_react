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
import MatchData from "../../components/match/matchdata/MatchData";
import styles from "./MatchPage.module.css";

const MatchPage = () => {
  const { match_id } = useParams(); // match_id를 URL에서 추출
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);
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
        console.log('이거슨 가져온 데이터들이여',data)

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

  useEffect(() => {
    if (match) {
      const matchStartTime = new Date(match.match_start_time || Date.now());
      console.log("Match start time:", matchStartTime);
      console.log("Current time:", new Date());
      console.log("Match type:", match.match_type);
  
      if (match.match_type === 0) {
        if (new Date() < new Date(matchStartTime.getTime() - 10 * 24 * 60 * 60 * 1000)) {
          setStatus("earlyBird");
        } else if (new Date() < new Date(matchStartTime.getTime() - 10 * 60 * 1000)) {
          setStatus("regular");
        } else if (new Date() < matchStartTime) {
          setStatus("closed");
        } else {
          setStatus("finished");
        }
      } else if (match.match_type === 1) {
        if (new Date() < matchStartTime) {
          setStatus("preview");
        } else {
          setStatus("finished");
        }
      }
      console.log("Calculated status:", status); // 디버깅용
    }
  }, [match]);
  

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

  console.log("현재 match.match_type 값:", match.match_type);
  console.log("현재 status",status)

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
              {status === "finished" && (
                <MatchData  match_id={match_id}  />
              )}
              <StadiumInfo match_id={match_id}
              />
              <MatchRules />
              <RefundPolicy />
            </>
          ) : (
            <>
              <MatchPoints match_id={match_id} />
              {status === "preview" && match.match_type === 1 && <TeamPreview match_id={match_id} />}
              <ResultAndVideo match_id={match_id} />
              <StadiumInfo match_id={match_id}
              />
              <TeamMatchRules />
              <LeagueMatchRule />
              <LeagueMannerGuide />
              <TeamRefundPolicy />
            </>
          )}
        </div>
        <div className={styles.rightSection}>
        {console.log("매치스테이터스랑 타입", match.status_code,match.match_type)} 
          <MatchDetails match_id={match_id} stadiumId={match.stadium_id} /*statusCode={match.match_type}*/
          />
        </div>
      </div>
    </section>
  );
};

export default MatchPage;