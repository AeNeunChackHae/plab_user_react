import React from 'react';
import styles from './MatchData.module.css';

const MatchData = () => {
  // 그래프 데이터
  const levels = [
    { label: '루키', value: 0 },
    { label: '스타터', value: 0 },
    { label: '비기너', value: 8 },
    { label: '아마추어', value: 77 },
    { label: '세미프로', value: 15 },
    { label: '프로', value: 0 },
  ];

  return (
    <div className={styles.sectionBody}>
      <h2 className={styles.sectionTitle}>매치 데이터</h2>

      <div className={styles.matchLevels}>
        <h4 className={styles.sectionSubtitle}>레벨 분포도</h4>
        <p className={styles.averageLevel}>
          예상 평균 레벨은 <span className={styles.highlighted}>아마추어3</span>입니다.
        </p>
        <ul className={styles.matchLevelsGraphBar}>
          {levels.map((level, index) => (
            <li className={styles.graphBarItem} key={index}>
              <div className={styles.graphBarFrame}>
                <span
                  className={styles.graphBarGage}
                  style={{ height: `${level.value}%` }}
                ></span>
              </div>
              <span className={styles.graphBarValue}>{level.value}%</span>
              <span className={styles.graphBarLabel}>{level.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.levelInform}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_caution.svg"
            alt="경고 아이콘"
            className={styles.warningIcon}
          />
          팀 레벨이 맞지 않으면 친구끼리 와도 다른 팀이 될 수 있어요
        </div>
      </div>

      {/* POM 정보 섹션 */}
      <div className={styles.pomInfo}>
        <img
          src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_pom.svg" // 아이콘 경로
          alt="POM 아이콘"
          className={styles.pomIcon}
        />
        <div>
          <p className={styles.pomCount}>POM이 9명 있어요</p>
          <p className={styles.pomDescription}>
            POM은 서로 존중하고 격려하며 함께 즐길 수 있도록 매치에 긍정적인 에너지를 불어넣어 주는 플레이어예요.
          </p>
        </div>
      </div>
    </div>
  );
};
export default MatchData;



// <-- 더미 데이터 연결 후 확인 -->

// import React, { useState, useEffect } from 'react';
// import styles from './MatchData.module.css';

// const MatchData = () => {
//   const [levels, setLevels] = useState([]);
//   const [averageLevel, setAverageLevel] = useState('');
//   const [pomCount, setPomCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Node.js 서버에서 데이터를 가져옵니다.
//         const response = await fetch('http://localhost:5000/match/1'); // match_id를 1로 지정
//         const data = await response.json();

//         // 유저 레벨 데이터를 처리하여 퍼센트 계산
//         const totalUsers = data.users.filter((user) => user.status === 0).length;
//         const levelCounts = { 루키: 0, 스타터: 0, 비기너: 0, 아마추어: 0, 세미프로: 0, 프로: 0 };

//         data.users.forEach((user) => {
//           if (user.status === 0) {
//             levelCounts[user.level] += 1;
//           }
//         });

//         const updatedLevels = Object.keys(levelCounts).map((key) => ({
//           label: key,
//           value: totalUsers > 0 ? Math.round((levelCounts[key] / totalUsers) * 100) : 0,
//         }));

//         setLevels(updatedLevels);

//         // 평균 레벨 계산
//         const levelOrder = ['루키', '스타터', '비기너', '아마추어', '세미프로', '프로'];
//         const totalLevelValue = data.users.reduce(
//           (sum, user) => (user.status === 0 ? sum + levelOrder.indexOf(user.level) + 1 : sum),
//           0
//         );
//         const average = totalUsers > 0 ? Math.round(totalLevelValue / totalUsers) : 0;
//         setAverageLevel(levelOrder[average - 1] || '');

//         // POM 카운트 설정
//         setPomCount(data.pomCount);
//       } catch (error) {
//         console.error('Error fetching match data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className={styles.sectionBody}>
//       <h2 className={styles.sectionTitle}>매치 데이터</h2>

//       <div className={styles.matchLevels}>
//         <h4 className={styles.sectionSubtitle}>레벨 분포도</h4>
//         <p className={styles.averageLevel}>
//           예상 평균 레벨은 <span className={styles.highlighted}>{averageLevel}</span>입니다.
//         </p>
//         <ul className={styles.matchLevelsGraphBar}>
//           {levels.map((level, index) => (
//             <li className={styles.graphBarItem} key={index}>
//               <div className={styles.graphBarFrame}>
//                 <span
//                   className={styles.graphBarGage}
//                   style={{ height: `${level.value}%` }}
//                 ></span>
//               </div>
//               <span className={styles.graphBarValue}>{level.value}%</span>
//               <span className={styles.graphBarLabel}>{level.label}</span>
//             </li>
//           ))}
//         </ul>
//         <div className={styles.levelInform}>
//           <img
//             src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_caution.svg"
//             alt="경고 아이콘"
//             className={styles.warningIcon}
//           />
//           팀 레벨이 맞지 않으면 친구끼리 와도 다른 팀이 될 수 있어요
//         </div>
//       </div>

//       {/* POM 정보 섹션 */}
//       <div className={styles.pomInfo}>
//         <img
//           src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_pom.svg"
//           alt="POM 아이콘"
//           className={styles.pomIcon}
//         />
//         <div>
//           <p className={styles.pomCount}>POM이 {pomCount}명 있어요</p>
//           <p className={styles.pomDescription}>
//             POM은 서로 존중하고 격려하며 함께 즐길 수 있도록 매치에 긍정적인 에너지를 불어넣어 주는 플레이어예요.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchData;

