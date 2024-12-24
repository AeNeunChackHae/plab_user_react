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
import { fetchStadiumPhoto } from "../../components/contentheader/fetchStadiumPhoto"; // fetchStadiumPhoto 임포트
import styles from "./MatchPage.module.css";

const MatchPage = () => {
  const { match_id } = useParams();
  const [photoPath, setPhotoPath] = useState(null); // 경기장 사진 경로
  const [matchDetails, setMatchDetails] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [stadiumInfo, setStadiumInfo] = useState(null);
  const [matchPoints, setMatchPoints] = useState(null);
  const [topPlayer, setTopPlayer] = useState(null);
  const [match, setMatch] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 매치 데이터 가져오기
  useEffect(() => {
    const fetchMatchDetails = async () => {
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

          console.log("Fetched match details:", data);
          setMatchDetails(data.matchDetails);
          setMatchData(data.matchData);
          setStadiumInfo(data.stadiumInfo);
          setMatchPoints(data.matchPoints);
          setTopPlayer(data.topPlayer);
          setMatch(data.match);
        } else {
          throw new Error("매치 데이터를 로드할 수 없습니다.");
        }
      } catch (err) {
        console.error("Error fetching match details:", err);
        setError(err.message);
      }
    };

    if (match_id) {
      console.log("Fetching match details for match_id:", match_id);
      fetchMatchDetails();
    }
  }, [match_id]);

  // 경기장 사진 가져오기
  useEffect(() => {
    const getStadiumPhoto = async () => {
      if (matchDetails?.stadium_id) {
        try {
          console.log("Fetching stadium photo for stadium_id:", matchDetails.stadium_id);
          const photo = await fetchStadiumPhoto(matchDetails.stadium_id); // stadium_id로 fetch
          console.log("Fetched stadium photo:", photo);
          setPhotoPath(photo.photo_path); // photo_path만 저장
        } catch (err) {
          console.error("Error fetching stadium photo:", err);
          setError("이미지를 가져오는 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No stadium_id found in matchDetails.");
        setLoading(false); // stadium_id가 없을 경우 로딩 해제
      }
    };

    getStadiumPhoto();
  }, [matchDetails]);

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
      console.log("Updated match status:", status);
    }
  }, [currentTime, match]);

  // 현재 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Current state:");
    console.log("photoPath:", photoPath);
    console.log("matchDetails:", matchDetails);
    console.log("stadiumInfo:", stadiumInfo);
    console.log("matchPoints:", matchPoints);
    console.log("topPlayer:", topPlayer);
    console.log("match:", match);
    console.log("error:", error);
  }, [photoPath, matchDetails, stadiumInfo, matchPoints, topPlayer, match]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles.matchPage}>
      <ContentHeader photo_path={photoPath} /> {/* 사진 경로 전달 */}
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          {match?.status_code === 0 && (
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
          {match?.status_code === 1 && (
            <>
              <MatchPoints {...matchPoints} />
              {status === "preview" && <TeamPreview />}
              {status === "finished" && (
                <>
                  <TeamStandings standings={matchData?.team_data?.standings || []} />
                  <ResultAndVideo results={matchData?.team_data?.results || []} />
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
