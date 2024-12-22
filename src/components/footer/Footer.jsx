import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer} id="footer">
      <div className={styles.footerWrap}>
        <div className={styles.footerNav}>
          {/* 매치 섹션 */}
          <ul>
            <h3>매치</h3>
            <li><a href="/">모든 매치</a></li>
            <li><a href="/explore/1/matches/">여자 매치</a></li>
            <li><a href="/explore/2/matches/">남녀모두 매치</a></li>
            <li><a href="/explore/47/matches/">스타터 매치</a></li>
            <li><a href="/explore/52/matches/">티셔츠 매치</a></li>
            <li><a href="/explore/22/matches/">초급 매치</a></li>
            <li><a href="/explore/3/matches/">중급 매치</a></li>
          </ul>

          {/* 서비스 지역 섹션 */}
          <ul className={styles.footerDul}>
            <h3>서비스 지역</h3>
            <li><a href="/region/1/matches/">서울</a></li>
            <li><a href="/region/2/matches/">경기</a></li>
            <li><a href="/region/3/matches/">인천</a></li>
            <li><a href="/region/9/matches/">강원</a></li>
            <li><a href="/region/4/matches/">대전/세종</a></li>
            <li><a href="/region/10/matches/">충남</a></li>
            <li><a href="/region/11/matches/">충북</a></li>
            <li><a href="/region/5/matches/">대구</a></li>
            <li><a href="/region/12/matches/">경북</a></li>
            <li><a href="/region/6/matches/">부산</a></li>
            <li><a href="/region/13/matches/">울산</a></li>
            <li><a href="/region/14/matches/">경남</a></li>
            <li><a href="/region/7/matches/">광주</a></li>
            <li><a href="/region/15/matches/">전남</a></li>
            <li><a href="/region/16/matches/">전북</a></li>
            <li><a href="/region/8/matches/">제주</a></li>
          </ul>

          {/* 플랩풋볼 섹션 */}
          <ul>
            <h3>플랩풋볼</h3>
            <li><a href="/about/">플랩풋볼 소개</a></li>
            <li><a href="/notice/">공지사항</a></li>
            <li><a href="/cs/">자주 묻는 질문</a></li>
            <li><a href="/magazine/">플랩 매거진</a></li>
            <li><a href="https://manager.plabfootball.com/" target="_blank" rel="noopener noreferrer">매니저 지원</a></li>
            <li><a href="https://vo.la/wjsVT" target="_blank" rel="noopener noreferrer">구장 제휴</a></li>
            <li><a href="https://plabfootball.notion.site/We-are-hiring-4f3f818dc5e943beb3d4f6cb4c8657e6?pvs=4" target="_blank" rel="noopener noreferrer">채용</a></li>
          </ul>

          {/* 소셜 미디어 섹션 */}
          <ul>
            <h3>소셜 미디어</h3>
            <li><a href="https://www.instagram.com/plabfootball/" target="_blank" rel="noopener noreferrer">인스타그램</a></li>
            <li><a href="https://www.youtube.com/@plabfootball" target="_blank" rel="noopener noreferrer">유튜브</a></li>
          </ul>
        </div>

        {/* 회사 정보 */}
        <div className={styles.company}>
          <h2><a href="/">plabfootball.com</a></h2>
          <p>풋살하고 싶을 땐, 플랩풋볼</p>
          <span>
            <a href="/term/">이용 약관 | </a>
            <a href="https://policy.plabfootball.com/privacy" target="_blank" rel="noopener noreferrer"><strong>개인정보 처리방침</strong> | </a>
            <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6508100575" target="_blank" rel="noopener noreferrer">사업자 정보 확인</a>
          </span>
          <br />
          <span>
            플랩풋볼 | 서울특별시 마포구 잔다리로31 제우피스빌딩 2층 | 대표 메일 contact@plabfootball.com |  
            마케팅 제안 marketing@plabfootball.com | 언론, 연구 team@plabfootball.com | 02-704-7983
          </span>
          <span>
            주식회사 마이플레이컴퍼니 | 사업자번호 650-81-00575 | 대표 강동규 | 통신판매업 신고 2020-서울마포-4411
          </span>
          <span className={styles.copyright}>
            Copyright <b>PLAB</b> All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
