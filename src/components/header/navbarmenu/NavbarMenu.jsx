import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavbarMenu.module.css";

const NavbarMenu = ({ closeMenu }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`); // 디버깅용 로그
    closeMenu();
    navigate(path);
  };

  return (
    <div className={styles.menuModal}>
      <div className={styles.modalMask} onClick={closeMenu}></div>
      <div className={styles.modalWrapper}>
        {/* 모달 헤더: 닫기 버튼 */}
        <div className={styles.modalHeader}>
          <button
            className={styles.modalClose}
            onClick={() => {
              console.log("X 버튼 클릭");
              closeMenu();
            }}
          >
            ✕
          </button>
        </div>

        {/* 모달 본문 */}
        <div className={styles.modalBody}>
          {/* 소셜 매치 섹션 */}
          <div className={styles.sectionService}>
            <h4 className={styles.sectionTitle}>소셜 매치</h4>
            <ul className={styles.serviceList}>
              <li
                className={styles.serviceItem}
                onClick={() => handleNavigation("/explore/1/matches")}
              >
                <img
                  src="https://d31wz4d3hgve8q.cloudfront.net/static/img/explore_earlybird.svg"
                  alt="얼리버드"
                  className={styles.serviceImage}
                />
                <p>얼리버드</p>
              </li>
              <li
                className={styles.serviceItem}
                onClick={() => handleNavigation("/explore/2/matches")}
              >
                <img
                  src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_gender.svg"
                  alt="남녀 모두"
                  className={styles.serviceImage}
                />
                <p>남녀모두</p>
              </li>
              <li
                className={styles.serviceItem}
                onClick={() => handleNavigation("/explore/3/matches")}
              >
                <img
                  src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_dribbler.svg"
                  alt="여성 매치"
                  className={styles.serviceImage}
                />
                <p>여성매치</p>
              </li>
              <li
                className={styles.serviceItem}
                onClick={() => handleNavigation("/explore/4/matches")}
              >
                <img
                  src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_beginer.svg"
                  alt="아마추어 1"
                  className={styles.serviceImage}
                />
                <p>아마추어1</p>
              </li>
              <li
                className={styles.serviceItem}
                onClick={() => handleNavigation("/explore/5/matches")}
              >
                <img
                  src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_semipro.svg"
                  alt="아마추어 2"
                  className={styles.serviceImage}
                />
                <p>아마추어2</p>
              </li>
            </ul>
          </div>

          {/* 팀 섹션 */}
          {/* <div className={styles.sectionService}>
            <h4 className={styles.sectionTitle}>팀</h4>
            <ul className={styles.serviceList}>
              <li
                className={styles.serviceItem}
                onClick={() => handleNavigation("/league")}
              >
                <img
                  src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_team_league.svg"
                  alt="리그"
                  className={styles.serviceImage}
                />
                <p>리그</p>
              </li>
            </ul>
          </div> */}

          {/* 구장 예약 및 기타 */}
          <div className={styles.sectionService}>
            <ul className={`${styles.serviceList} ${styles.vertical}`}>
              <h4 className={styles.sectionTitle}>
                <span>매니저</span>
              </h4>
              <li>
                <a
                  href="https://manager.plabfootball.com"
                  className={styles.serviceItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_etc_manager.svg"
                    alt="매니저 지원"
                    className={styles.serviceImage}
                  />
                  <p>매니저 지원</p>
                </a>
              </li>
              <h4 className={styles.sectionTitle}>
                <span>구장</span>
              </h4>
              <li>
                <a
                  href="https://www.notion.so/d1e51463c20441658337e9a8bde2ba8c"
                  className={styles.serviceItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_etc_stadium.svg"
                    alt="구장 제휴"
                    className={styles.serviceImage}
                  />
                  <p>구장제휴</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
