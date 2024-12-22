import React from 'react';
import styles from './StadiumRules.module.css';

const StadiumRules = () => {
  // 시설 데이터
  const facilities = [
    { name: '샤워실', available: true, icon: 'ic_info_shower.svg' },
    { name: '유료주차', available: true, icon: 'ic_info_park.svg' },
    { name: '풋살화 대여', available: false, icon: 'ic_info_shoes.svg' },
    { name: '조끼 대여', available: true, icon: 'ic_info_bibs.svg' },
    { name: '음료 판매', available: true, icon: 'ic_info_beverage.svg' },
    { name: '풋살공 대여', available: false, icon: 'ic_info_ball.svg' },
    { name: '화장실', available: true, icon: 'ic_info_toilet.svg' },
  ];

  // "꼭 지켜주세요" 데이터
  const rules = [
    { id: 1, content: '화장실: 7층 화장실 이용' },
    { id: 2, content: '풋살화 대여: 가능' },
    { id: 3, content: '대기실 난방 사용 금지' },
    { id: 4, content: '대기실 일반 대관, 소셜 매치 공동 사용 가능' },
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
              className={`${styles.infoList} ${
                !facility.available ? styles.unavailable : ''
              }`}
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

        {/* 잘못된 정보 알림 */}
        <div className={styles.caution}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_caution.svg"
            alt="주의"
          />
          <p>잘못된 정보가 있나요?</p>
        </div>

        {/* 꼭 지켜주세요 */}
        <div className={styles.ruleSection}>
          <p className={styles.ruleTitle}>꼭 지켜주세요</p>
          <ul className={styles.ruleList}>
            {rules.map((rule) => (
              <li key={rule.id}>{rule.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StadiumRules;
