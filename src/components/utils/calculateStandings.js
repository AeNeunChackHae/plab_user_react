// 팀경기 승/패 값 계산기기
import { teamImages, teamNames } from '../dummyData/dummyData';

const calculateStandings = (results) => {
  const standings = {};

  results.forEach((match) => {
    const { team1, team2 } = match;

    // 팀 초기화
    if (!standings[team1.name]) {
      standings[team1.name] = {
        name: team1.name,
        emblem: teamImages[Object.keys(teamNames).find((key) => teamNames[key] === team1.name)],
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      };
    }
    if (!standings[team2.name]) {
      standings[team2.name] = {
        name: team2.name,
        emblem: teamImages[Object.keys(teamNames).find((key) => teamNames[key] === team2.name)],
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      };
    }

    // 득점 및 실점 기록
    standings[team1.name].goalsFor += team1.score;
    standings[team1.name].goalsAgainst += team2.score;
    standings[team2.name].goalsFor += team2.score;
    standings[team2.name].goalsAgainst += team1.score;

    // 승/무/패 기록
    if (team1.score > team2.score) {
      standings[team1.name].wins++;
      standings[team1.name].points += 3;
      standings[team2.name].losses++;
    } else if (team1.score < team2.score) {
      standings[team2.name].wins++;
      standings[team2.name].points += 3;
      standings[team1.name].losses++;
    } else {
      standings[team1.name].draws++;
      standings[team2.name].draws++;
      standings[team1.name].points++;
      standings[team2.name].points++;
    }
  });

  // 순위 정렬
  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points; // 승점 우선
    if (b.goalsFor - b.goalsAgainst !== a.goalsFor - a.goalsAgainst) return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst); // 득실차
    return b.goalsFor - a.goalsFor; // 다득점
  });
};

export default calculateStandings;
