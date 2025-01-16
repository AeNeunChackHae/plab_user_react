import React from "react";
import styles from "./Footer.module.css";
import { config } from "../../config.js"

const Footer = () => {
  const manager = `${config.aws.ec2_host_nav}/manager/plabfootball`
  console.log(manager)

  return (
    <div className={styles.footer} id="footer">
      <div className={styles.footerWrap}>
        <div className={styles.footerNav}>
          {/* 매치 섹션 */}
          <ul>
            <h3>매치</h3>
            <li>
              <a href="/">모든 매치</a>
            </li>
            <li>
              <a href="/explore/1/matches/">여자 매치</a>
            </li>
            <li>
              <a href="/explore/2/matches/">남녀모두 매치</a>
            </li>
            {/* <li><a href="/explore/47/matches/">스타터 매치</a></li>
            <li><a href="/explore/52/matches/">티셔츠 매치</a></li> */}
            <li>
              <a href="/explore/22/matches/">초급 매치</a>
            </li>
            <li>
              <a href="/explore/3/matches/">중급 매치</a>
            </li>
          </ul>

          {/* 플랩풋볼 섹션 */}
          <ul>
            <h3>플랩풋볼</h3>
            <li><a href="/about/">플랩풋볼 소개</a></li>
            <li><a href="/notice/">공지사항</a></li>
            <li><a href="/cs/">자주 묻는 질문</a></li>
            {/* <li>
              <a href="/magazine/">플랩 매거진</a>
            </li> */}
            <li>
              <a 
                href={manager}
                target="_blank" 
                rel="noopener noreferrer"
              >
                매니저 지원
              </a>
            </li>
            <li><a href="/form" target="_blank" rel="noopener noreferrer">구장 제휴</a></li>
            {/* <li>
              <a
                href="https://plabfootball.notion.site/We-are-hiring-4f3f818dc5e943beb3d4f6cb4c8657e6?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                채용
              </a>
            </li> */}
          </ul>

          {/* 소셜 미디어 섹션 */}
          <ul>
            <h3>소셜 미디어</h3>
            <li>
              <a
                href="https://www.instagram.com/plabfootball/"
                target="_blank"
                rel="noopener noreferrer"
              >
                인스타그램
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@plabfootball"
                target="_blank"
                rel="noopener noreferrer"
              >
                유튜브
              </a>
            </li>
          </ul>
        </div>

        {/* 회사 정보 */}
        <div className={styles.company}>
          <h2>
            <a href="/">plabfootball.com</a>
          </h2>
          <p>풋살하고 싶을 땐, 플랩풋볼</p>
          <span className="a1">
            <a href="/term/">이용 약관 &nbsp; | </a> &nbsp;&nbsp;
            <a
              href="https://policy.plabfootball.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;&nbsp;
              <strong className="a1">개인정보 처리방침 &nbsp; </strong> |{" "}
            </a>
            &nbsp;&nbsp;
            <a
              href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6508100575"
              target="_blank"
              rel="noopener noreferrer"
              className="a1"
            >
              사업자 정보 확인
            </a>
          </span>
          <br />
          <span className="a1">
            플랩풋볼 | 서울특별시 마포구 잔다리로31 제우피스빌딩 2층
          </span>
          <span className="a1">
            대표 메일 contact@plabfootball.com | 마케팅 제안
            marketing@plabfootball.com
          </span>
          <span className="a1">
            언론, 연구 team@plabfootball.com | 02-704-7983
          </span>
          <span className="a1">
            주식회사 마이플레이컴퍼니 | 사업자번호 650-81-00575
          </span>
          <span className="a1">
            대표 강동규 | 통신판매업 신고 2020-서울마포-4411
          </span>
          <span className="a1"></span>
          <span className="a1">
            Copyright <b>PLAB</b> All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
