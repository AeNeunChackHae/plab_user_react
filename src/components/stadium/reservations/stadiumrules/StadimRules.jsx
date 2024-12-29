import React, { useState, useEffect } from 'react';
import styles from './StadiumRules.module.css';

const StadiumRules = ({ stadiumId }) => {
  const [rules, setRules] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('http://localhost:8080/stadium/rules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stadium_id: stadiumId }),
        });

        if (!response.ok) {
          throw new Error('경기장 데이터를 가져오는 데 실패했습니다.');
        }

        const data = await response.json();
        setRules(data);
      } catch (err) {
        console.error('Error fetching stadium rules:', err);
        setError(err.message);
      }
    };

    fetchRules();
  }, [stadiumId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!rules) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  const facilities = [
    { name: '샤워실', available: rules.shower_yn === 'Y', icon: 'ic_info_shower.svg' },
    { name: '유료주차', available: rules.parking_yn === 'Y', icon: 'ic_info_park.svg' },
    { name: '풋살화 대여', available: rules.lend_shoes_yn === 'Y', icon: 'ic_info_shoes.svg' },
    { name: '조끼 대여', available: rules.lend_vest_yn === 'Y', icon: 'ic_info_bibs.svg' },
    { name: '음료 판매', available: rules.sell_drink_yn === 'Y', icon: 'ic_info_beverage.svg' },
    { name: '풋살공 대여', available: rules.lend_ball_yn === 'Y', icon: 'ic_info_ball.svg' },
    { name: '화장실', available: rules.toilet_yn === 'Y', icon: 'ic_info_toilet.svg' },
  ];

  return (
    <div className={styles.stadiumSection}>
      {/* 섹션 제목 */}
      <div className={styles.stadiumHeader}>
        <h3 className={styles.stadiumTitle}>시설 및 이용 규칙</h3>
      </div>

      {/* 시설 리스트 */}
      <div className={styles.stadiumBody}>
        <ul className={styles.infoListWrapper}>
          {facilities.map((facility, index) => (
            <li
              key={index}
              className={`${styles.infoList} ${!facility.available ? styles.unavailable : ''}`}
            >
              <img
                src={`https://d31wz4d3hgve8q.cloudfront.net/static/img/${facility.icon}`}
                className={styles.icon}
                alt={facility.name}
              />
              <p className={styles.infoText}>{facility.name}</p>
            </li>
          ))}
        </ul>

        {/* 꼭 지켜주세요 */}
        <div className={styles.ruleSection}>
          <p className={styles.ruleTitle}>꼭 지켜주세요</p>
          <ul className={styles.ruleList}>
            <li>{rules.notice}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StadiumRules;
