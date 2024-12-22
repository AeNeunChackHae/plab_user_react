import React, { useState } from "react";
import styles from "./TeamMatchRules.module.css";

const MatchRules = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const rules = [
    {
      icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_hand.svg",
      title: "골킥은 손으로만",
      description: "축구와 다르게 골키퍼는 손으로 던져야 해요",
    },
    {
      icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_tackle.svg",
      title: "사람을 향한 태클 금지",
      description: "부상 방지를 위해 사람을 향한 태클을 금지해요",
    },
    {
      icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_catch_ball.svg",
      title: "백패스를 손으로 잡으면 안 돼요",
      description: "손으로 잡으면 간접 프리킥이 주어져요",
    },
    {
      icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_team_foul.svg",
      title: "3번째 팀 파울부터 세컨 페널티킥",
      description:
        "경기 과열을 방지하기 위해 쿼터당 3번째 파울부터는 세컨 페널티킥이 주어져요",
    },
    {
      icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_whistle.svg",
      title: "판정에 대한 항의 금지",
      description:
        "원활한 진행을 위해 판정에 대한 항의를 금지해요. 오심도 경기의 일부로 바라봐 주세요",
    },
    {
      icon: "https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_alarm.svg",
      title: "5분 늦을 때마다 1골",
      description:
        "모두의 시간은 소중해요. 5분 늦을 때마다 -1골로 처리되고 매너 점수도 떨어져요",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader} onClick={toggleExpand}>
        <h3 className={styles.sectionTitle}>
          주요 규칙
        </h3>
        <span
          className={isExpanded ? styles.arrowUp : styles.arrowDown}
        ></span>
      </div>

      {isExpanded && (
        <div className={styles.sectionBody}>
          <ul>
            {rules.map((rule, index) => (
              <li key={index} className={styles.rule_item}>
                <img
                  src={rule.icon}
                  alt={rule.title}
                  className={styles.rule_icon}
                />
                <div>
                  <h4 className={styles.rule_title}>{rule.title}</h4>
                  <p className={styles.rule_description}>{rule.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default MatchRules;
