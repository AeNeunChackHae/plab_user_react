import React from "react";
import styles from "./TeamList.module.css";
import TEAM_LIST from "../../dummyData/TeamList"; // 더미 데이터 가져오기

const TeamList = () => {
  return (
    <div className={styles.myFriend}>
      <div className={styles.myFriendBody}>
        <ul className={styles.friendInfo}>
          {TEAM_LIST.map((team) => (
            <li key={team.id} className={styles.friendInfoItem}>
              <a href="#" className={styles.friendInfoLink}>
                <div className={styles.teamListEmblem}>
                  <div
                    className={styles.teamCoverEmblemWrapper}
                    style={{
                      background: team.emblemBackground || "transparent",
                    }}
                  >
                    <img
                      src={team.emblemImage}
                      alt={`${team.name} emblem`}
                      className={styles.teamEmblemImage}
                    />
                  </div>
                </div>
                <div className={styles.friendInfoContent}>
                  <p>{team.name}</p>
                  <span>{team.description}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamList;
