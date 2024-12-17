import React from 'react';
import styles from './StadiumInfo.module.css';

const StadiumInfo = () => {
  return (
    <section className={styles.section}>
      {/* 구장 정보 제목 */}
      <div className={styles.sectionHeader}>
        <h3>구장 정보</h3>
      </div>

      {/* 구장 정보 리스트 */}
      <div className={styles.sectionBody}>
        <div className={styles.infoListWrapper}>
          <ul>
            <li className={styles.infoList}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_stadium.svg"
                className={styles.icon}
                alt="구장 크기"
              />
              <p>40x20m</p>
            </li>
            <li className={`${styles.infoList} ${styles.noFeature}`}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_shower.svg"
                className={styles.icon}
                alt="샤워실"
              />
              <p>샤워실</p>
            </li>
            <li className={styles.infoList}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_park.svg"
                className={styles.icon}
                alt="유료 주차"
              />
              <p>유료주차</p>
            </li>
            <li className={styles.infoList}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_shoes.svg"
                className={styles.icon}
                alt="풋살화 대여"
              />
              <p>풋살화 대여</p>
            </li>
            <li className={`${styles.infoList} ${styles.noFeature}`}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_beverage.svg"
                className={styles.icon}
                alt="음료 판매"
              />
              <p>음료 판매</p>
            </li>
          </ul>
        </div>

        {/* 구분선 추가 */}
      <hr className={styles.divider} />

        {/* 구장 특이사항 */}
        <div className={styles.stadiumNotice}>
          <h4>구장 특이사항</h4>
          <pre>
            ■ 찾아가는 길 : 엘리베이터 이용 8층 풋살장 이동(주말 오전 9시 매치 입장 시
            후문[정문에서 코스트코 방향으로 이동]을 통해 8시 40분부터 출입 가능)
            {"\n\n"}
            ■ 주차 : 홈페이지 사전 신청 선착순 3대만 2시간 무료 (8층 주차 불가, 6&7층
            주차 권장)
            {"\n"}-사전 등록을 했으나 미등록자로 나올 경우 더에프 사무실 직원 문의
            {"\n"}-주차 등록은 매치 30분 이내 변경 및 신청 불가(이후 10분당 500원)
            {"\n"}-사전등록 차량도 21시 이후 입차 시 주차비용 발생
            {"\n"}-연타임 주차 신청 가능, 출차 후 재입차 필요
            {"\n"}(사전등록 완료 후 1층 주차 차단기에서 통과가 안되면, 등록한 차량 번호를 주차부스 담당자에게 전달)
            {"\n\n"}■ 흡연 : A구장 옆 흡연장 이용 (흡연 구역 외 마트내 흡연 적발시 퇴장
            조치 및 과태료 부과)
            {"\n\n"}■ 대여/판매
            {"\n"}- 풋살화 : 245~285, 3천원(키오스크 결제)
            {"\n"}- 물/음료/식품 : 키오스크 결제
            {"\n\n"}■ 기타
            {"\n"}- 7층 화장실 이용
            {"\n"}- 쓰레기 무단 투기 금지
            {"\n"}- 축구화 착용 금지
            {"\n"}- 21시 이후, 소음 주의 (민원 발생 시, 경기 중단)
            {"\n"}- 구장 내에 껌을 뱉거나 구장 내 기물 파손 시, 배상 청구
            {"\n"}- 레슨용 시설 더에프랩(실내)와 스킬피치 앞에 무단 출입금지
            {"\n"}- 긴급 시 사용 가능한 자동 제세동기가 8F 더에프 필드 사무실 옆 벽면 구비
            {"\n"}- 1층 마트 직원 출입구 앞은 오토바이, 자전거, 킥보드 주차 금지
            {"\n"}- 구장에서 실내로 이동 시 발판에서 잔디를 반드시 털어주세요.
            
          </pre>
        </div>
      </div>
    </section>
  );
};

export default StadiumInfo;
