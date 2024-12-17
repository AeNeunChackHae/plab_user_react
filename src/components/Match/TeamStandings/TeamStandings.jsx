import React from 'react';
import calculateStandings from '../../utils/calculateStandings';
import { matchData } from '../../dummyData/dummyData';
import styles from './TeamStandings.module.css';

const TeamStandings = () => {
  const standings = calculateStandings(matchData.results);

  return (
    <section className={styles.standingsSection}>
      <h4 className={styles.title}>순위</h4>
      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th></th>
            <th className={styles.teamColumn}></th>
            <th>승</th>
            <th>무</th>
            <th>패</th>
            <th>득실</th>
            <th>승점</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={index}>
              {/* 순위 */}
              <td>{index + 1}</td>
              {/* 팀 아이콘 및 이름 */}
              <td className={styles.teamInfo}>
                <img
                  src={team.emblem}
                  alt={`${team.name} emblem`}
                  className={styles.teamEmblem}
                />
                <span className={styles.teamName}>{team.name}</span>
              </td>
              {/* 승/무/패/득실/승점 */}
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalsFor - team.goalsAgainst}</td>
              <td className={styles.points}>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TeamStandings;
