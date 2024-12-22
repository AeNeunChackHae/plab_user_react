import React from "react";
import styles from "./TeamPreview.module.css";

const TeamPreview = () => {
  // 팀 데이터
  const teamData = {
    name: "OTP FC",
    stadium: "플랩 스타디움 수원",
    members: 31,
    averageAge: "30.1세",
    record: "7승 5무 10패",
    level: "아마추어3",
    emblem:
      "https://d31wz4d3hgve8q.cloudfront.net/media/emblem/154681_KakaoTalk_20221013_224023455_01.png",
    levelAuthIcon:
      "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_level_auth.svg",
    details: [
      {
        icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_club.svg",
        title: "팀",
        value: "OTP FC",
      },
      {
        icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_stadium.svg",
        title: "홈 구장",
        value: "플랩 스타디움 수원",
      },
      {
        icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_my.svg",
        title: "멤버",
        value: "31명",
      },
      {
        icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_age.svg",
        title: "평균 나이",
        value: "30.1세",
      },
      {
        icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_ball.svg",
        title: "경기 전적",
        value: "7승 5무 10패",
      },
      {
        icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_level.svg",
        title: "레벨",
        value: "아마추어3",
      },
    ],
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <h3>매치 프리뷰</h3>
        </div>
      </div>
      <div className={styles.sectionBody}>
        {/* 엠블럼 */}
        <div className={styles.emblemWrapper}>
          <img
            src={teamData.emblem}
            alt="팀 엠블럼"
            className={styles.emblem}
          />
        </div>
        {/* 팀 상세 정보 */}
        <div className={styles.detailsWrapper}>
          {teamData.details.map((detail, index) => (
            <div key={index} className={styles.detail}>
              <img
                src={detail.icon}
                alt={`${detail.title} 아이콘`}
                className={styles.detailIcon}
              />
              <span className={styles.detailTitle}>{detail.title}</span>
              <span
                className={`${styles.detailValue} ${
                  detail.title === "팀" || detail.title === "홈 구장"
                    ? styles.detailValueBlue
                    : ""
                }`}
              >
                {detail.value}
              </span>
              {detail.title === "레벨" && (
                <img
                  src={teamData.levelAuthIcon}
                  alt="레벨 인증 아이콘"
                  className={styles.levelAuthIcon}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
