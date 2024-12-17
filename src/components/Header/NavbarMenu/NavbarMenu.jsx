import React from "react";
import styles from "./NavbarMenu.module.css";

const NavbarMenu = ({ closeMenu }) => {
  return (
    <div className={styles.menuModal}>
      <div className={styles.modalMask} onClick={closeMenu}></div>
      <div className={styles.modalWrapper}>
        {/* 모달 헤더: 닫기 버튼 */}
        <div className={styles.modalHeader}>
          <button
            className={styles.modalClose}
            onClick={() => {
              console.log("X 버튼 클릭"); // 확인용 로그
              closeMenu();}}
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
              <li>
                <a href="/explore/all" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_all.svg"
                    alt="전체 매치"
                    className={styles.serviceImage}
                  />
                  <p>전체매치</p>
                </a>
              </li>
              <li>
                <a href="/explore/earlybird" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/static/img/explore_earlybird.svg"
                    alt="얼리버드"
                    className={styles.serviceImage}
                  />
                  <p>얼리버드</p>
                </a>
              </li>
              <li>
                <a href="/explore/coed" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_gender.svg"
                    alt="남녀 모두"
                    className={styles.serviceImage}
                  />
                  <p>남녀모두</p>
                </a>
              </li>
              <li>
                <a href="/explore/women" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_dribbler.svg"
                    alt="여성 매치"
                    className={styles.serviceImage}
                  />
                  <p>여성매치</p>
                </a>
              </li>
              <li>
                <a href="/explore/amateur1" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_beginer.svg"
                    alt="아마추어 1"
                    className={styles.serviceImage}
                  />
                  <p>아마추어1</p>
                </a>
              </li>
              <li>
                <a href="/explore/amateur2" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_social_semipro.svg"
                    alt="아마추어 2"
                    className={styles.serviceImage}
                  />
                  <p>아마추어2</p>
                </a>
              </li>
            </ul>
          </div>

          {/* 팀 섹션 */}
          <div className={styles.sectionService}>
            <h4 className={styles.sectionTitle}>팀</h4>
            <ul className={styles.serviceList}>
              <li>
                <a href="/league" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_team_league.svg"
                    alt="리그"
                    className={styles.serviceImage}
                  />
                  <p>리그</p>
                </a>
              </li>
              <li>
                <a href="/team/guest-matches" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_team_recruit_guest.svg"
                    alt="게스트 모집"
                    className={styles.serviceImage}
                  />
                  <p>게스트모집</p>
                </a>
              </li>
              <li>
                <a href="/team/recruit-member" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_team_recruit_member.svg"
                    alt="팀원 모집"
                    className={styles.serviceImage}
                  />
                  <p>팀원모집</p>
                </a>
              </li>
            </ul>
          </div>

          {/* 구장 예약 및 기타 */}
          <div className={styles.sectionService}>
            <h4 className={styles.sectionTitle}>
              <a href="/rental" className={styles.serviceLink}>
                구장 예약 →
              </a>
            </h4>
            <ul className={`${styles.serviceList} ${styles.vertical}`}>
              <li>
                <a
                  href="https://manager.plabfootball.com"
                  className={styles.serviceItem}
                >
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_etc_manager.svg"
                    alt="매니저 지원"
                    className={styles.serviceImage}
                  />
                  <p>매니저지원</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.notion.so/d1e51463c20441658337e9a8bde2ba8c"
                  className={styles.serviceItem}
                >
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_etc_stadium.svg"
                    alt="구장 제휴"
                    className={styles.serviceImage}
                  />
                  <p>구장제휴</p>
                </a>
              </li>
              <li>
                <a href="/magazine" className={styles.serviceItem}>
                  <img
                    src="https://d31wz4d3hgve8q.cloudfront.net/media/ic_nav_etc_magazine.svg"
                    alt="매거진"
                    className={styles.serviceImage}
                  />
                  <p>매거진</p>
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
