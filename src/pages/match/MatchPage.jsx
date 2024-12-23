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
          setMatchData(data); // 받은 데이터 저장
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
    if (matchData) {
      const matchStartTime = new Date(matchData.match_start_time);

      if (matchData.match_type === 0) {
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
      } else if (matchData.match_type === 1) {
        if (currentTime < matchStartTime) {
          setStatus("preview");
        } else {
          setStatus("finished");
        }
      }
    }
  }, [currentTime, matchData]);

  // 현재 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!matchData && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <section className={styles.matchPage}>
      {/* stadium_id를 ContentHeader로 전달 */}
      <ContentHeader  photoPath={matchData.photo_path} />
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          {matchData.match_type === 0 && (
            <>
              {status === "finished" && (
                <>
                  <PlaberOfTheMatch topPlayer={matchData.topPlayer} />
                  <MatchPoints 
                  managerName={matchData?.manager_name || "디폴트 매니저"}
                  allowGender={matchData?.allow_gender || 0}
                  levelCriterion={matchData?.level_criterion || 0}
                  />
                </>
              )}
              {status !== "finished" && <MatchPoints
              managerName={matchData?.manager_name || "디폴트 매니저"}
              allowGender={matchData?.allow_gender || 0}
              levelCriterion={matchData?.level_criterion || 0}
               />}
              {status !== "finished" && (
                <MatchData users={matchData.users || []} />
              )}
              <StadiumInfo 
              width={matchData.width} 
              height={matchData.height} 
              shower={matchData.shower_yn === 'Y'} 
              parking={matchData.parking_yn === 'Y'} 
              shoesLending={matchData.lend_shoes_yn === 'Y'} 
              drinkSelling={matchData.sell_drink_yn === 'Y'} 
              notice={matchData.notice}
            />
              <MatchRules />
              <RefundPolicy />
            </>
          )}
          {matchData.match_type === 1 && (
            <>
              <MatchPoints 
              managerName={matchData?.manager_name || "디폴트 매니저"}
              allowGender={matchData?.allow_gender || 0}
              levelCriterion={matchData?.level_criterion || 0}
              />
              {status === "preview" && <TeamPreview />}
              {status === "finished" && (
                <>
                  <TeamStandings standings={matchData.team_data?.standings || []} />
                  <ResultAndVideo results={matchData.team_data?.results || []} />
                </>
              )}
              <StadiumInfo 
              width={matchData.width} 
              height={matchData.height} 
              shower={matchData.shower_yn === 'Y'} 
              parking={matchData.parking_yn === 'Y'} 
              shoesLending={matchData.lend_shoes_yn === 'Y'} 
              drinkSelling={matchData.sell_drink_yn === 'Y'} 
              notice={matchData.notice}
            />
              <TeamMatchRules />
              <LeagueMatchRule />
              <LeagueMannerGuide />
              <TeamRefundPolicy />
            </>
          )}
        </div>
        <div className={styles.rightSection}>
          <MatchDetails
            stadiumName={matchData.stadium_name}
            fullAddress={matchData.full_address}
            matchStartTime={matchData.match_start_time}
            matchType={matchData.match_type}
            status={status}
          />
        </div>
      </div>
    </section>
  );
};

export default MatchPage;
