import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentHeader from '../components/ContentHeader/ContentHeader';
import MatchPoints from '../components/Match/MatchPoints/MatchPoints';
import TeamPreview from '../components/Match/TeamPreview/TeamPreview';
import ResultAndVideo from '../components/Match/ResultAndVideo/ResultAndVideo';
import StadiumInfo from '../components/Match/StadiumInfo/StadiumInfo';
import MatchRules from '../components/Match/MatchRules/MatchRules';
import RefundPolicy from '../components/Match/RefundPolicy/RefundPolicy';
import TeamMatchRules from '../components/Match/TeamMatchRules/TeamMatchRules';
import LeagueMatchRule from '../components/Match/LeagueMatchRule/LeagueMatchRule';
import LeagueMannerGuide from '../components/Match/LeagueMannerGuide/LeagueMannerGuide';
import TeamRefundPolicy from '../components/Match/TeamRefundPolicy/TeamRefundPolicy';
import MatchDetails from '../components/Match/MatchDetails/MatchDetails';
import PlayerOfTheMatch from '../components/Match/PlayerOfTheMatch/PlayerOfTheMatch';
import TeamStandings from '../components/Match/TeamStandings/TeamStandings';
import MatchData from '../components/Match/MatchData/MatchData';
import styles from './MatchPage.module.css';

const MatchPage = () => {
  const { matchId } = useParams();
  const [matchType, setMatchType] = useState(null); // 매치 타입 (0: 소셜, 1: 팀)
  const [status, setStatus] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matchStart, setMatchStart] = useState(null);

  // 더미 데이터
  const matchData = {
    match_id: matchId,
    match_type: 0, // 0: 소셜 매치, 1: 팀 매치
    match_start_time: '2024-12-20T19:00:00',
    social_data: {},
    team_data: {
      standings: [
        { rank: 1, name: '이름없는교회', wins: 4, draws: 0, losses: 2, goalDifference: 3, points: 12, emblemImage: 'https://d31wz4d3hgve8q.cloudfront.net/media/tongue.svg' },
        { rank: 2, name: 'BAU_백석FC', wins: 3, draws: 1, losses: 2, goalDifference: 6, points: 10, emblemImage: 'https://d31wz4d3hgve8q.cloudfront.net/media/lion.svg' },
        { rank: 3, name: '못친소FC', wins: 1, draws: 1, losses: 4, goalDifference: -9, points: 4, emblemImage: 'https://d31wz4d3hgve8q.cloudfront.net/media/emblem/613241_1000017967.jpg' },
      ],
      results: [
        {
          round: 1,
          team1: { name: '이름없는교회', score: 3, emblem: 'https://d31wz4d3hgve8q.cloudfront.net/media/tongue.svg' },
          team2: { name: 'BAU_백석FC', score: 0, emblem: 'https://d31wz4d3hgve8q.cloudfront.net/media/lion.svg' },
        },
        {
          round: 2,
          team1: { name: 'BAU_백석FC', score: 1, emblem: 'https://d31wz4d3hgve8q.cloudfront.net/media/lion.svg' },
          team2: { name: '못친소FC', score: 2, emblem: 'https://d31wz4d3hgve8q.cloudfront.net/media/emblem/613241_1000017967.jpg' },
        },
      ],
    },
  };

  // 매치 데이터 초기화
  useEffect(() => {
    const matchStartTime = new Date(matchData.match_start_time);
    setMatchStart(matchStartTime);
    setMatchType(matchData.match_type);

    // 상태 설정
    if (matchType === 0) {
      const earlyBirdEnd = new Date(matchStartTime.getTime() - 10 * 24 * 60 * 60 * 1000); // 10일 전
      const regularEnd = new Date(matchStartTime.getTime() - 10 * 60 * 1000); // 10분 전

      if (currentTime < earlyBirdEnd) {
        setStatus('earlyBird'); // 얼리버드 기간
      } else if (currentTime < regularEnd) {
        setStatus('regular'); // 정규 기간
      } else if (currentTime < matchStartTime) {
        setStatus('closed'); // 마감 기간
      } else {
        setStatus('finished'); // 매치 종료
      }
    } else if (matchType === 1) {
      if (currentTime < matchStartTime) {
        setStatus('preview'); // 매치 시작 전
      } else {
        setStatus('finished'); // 매치 시작 후
      }
    }
  }, [currentTime, matchData, matchType]);

  // 현재 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (matchType === null) return <div>Loading...</div>;

  return (
    <>
      <section className={styles.matchPage}>
        <ContentHeader />
        <div className={styles.mainContent}>
          <div className={styles.leftSection}>
            {matchType === 0 && (
              <>
                {/* 소셜 매치 */}
                {status === 'finished' && (
                  <>
                    <PlayerOfTheMatch />
                    <MatchPoints />
                  </>
                )}
                {status !== 'finished' && <MatchPoints />}
                {status !== 'finished' && <MatchData />}
                <StadiumInfo />
                <MatchRules />
                <RefundPolicy />
              </>
            )}
            {matchType === 1 && (
              <>
                {/* 팀 매치 */}
                <MatchPoints />
                {status === 'preview' && <TeamPreview />}
                {status === 'finished' && (
                  <>
                    <TeamStandings standings={matchData.team_data.standings} />
                    <ResultAndVideo results={matchData.team_data.results} />
                  </>
                )}
                <StadiumInfo />
                <TeamMatchRules />
                <LeagueMatchRule />
                <LeagueMannerGuide />
                <TeamRefundPolicy />
              </>
            )}
          </div>
          <div className={styles.rightSection}>
            <MatchDetails status={status} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MatchPage;
