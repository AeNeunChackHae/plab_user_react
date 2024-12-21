import React from "react";
import styles from "./StadiumTerms.module.css";

const StadiumTerms = () => {
  return (
    <div className={styles.stadiumTermsContainer}>
      <div className={styles.stadiumSectionHeader}>
        <div className={styles.stadiumSectionTitle}>
          <h3>예약 취소 및 환불 규정</h3>
        </div>
      </div>

      <div className={styles.stadiumTermsBody}>
        {/* 일반 규정 */}
        <div className={styles.stadiumTerms}>
          <div className={styles.stadiumTermsTitle}>일반</div>
          <table>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <td>10일 전</td>
                <td>100% 환불</td>
              </tr>
              <tr>
                <td>5일 전</td>
                <td>80% 환불</td>
              </tr>
              <tr>
                <td>3일 전</td>
                <td>50% 환불</td>
              </tr>
              <tr>
                <td>2일 전 ~ 예약 당일</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 강수 시 규정 */}
        <div className={styles.stadiumTerms}>
          <div className={styles.stadiumTermsTitle}>강수 시 변경 및 환불 규정</div>
          <ul className={styles.stadiumTermsList}>
            <li>
              아래 조건에 해당하는 경우, 플래비(홈페이지 우측 하단의 노란색 아이콘)를 통해 문의주시면 확인 후 변경 및 환불을 도와드립니다.
            </li>
            <li>실내 구장은 강수로 인한 변경 및 환불 가능 조건에 해당하지 않습니다.</li>
          </ul>
        </div>

        {/* 변경 규정 */}
        <div className={styles.stadiumTerms}>
          <div className={styles.stadiumTermsTitle}>변경 규정</div>
          <ul className={styles.stadiumTermsList}>
            <li>
              예약 시작 시간 2시간 전 기상청 날씨누리 해당 주소지를 기준으로 합니다 (
              <a href="#" style={{ color: "rgb(21, 112, 255)" }}>
                확인하기
              </a>
              )
              <br />- 오전 예약의 경우 전일 21시부터 변경 요청 가능
            </li>
            <li>시간당 5mm 이상의 강수량이 예보되는 경우, 예약일 변경이 가능합니다.</li>
          </ul>
        </div>

        {/* 환불 규정 */}
        <div className={styles.stadiumTerms}>
          <div className={styles.stadiumTermsTitle}>환불 규정</div>
          <ul className={styles.stadiumTermsList}>
            <li>
              당일 천재지변으로 인해 구장 이용이 불가한 경우, 100% 환불됩니다.
              <br />- 적용 기준: 호우·대설·태풍·강풍 주의보 및 경보, 한파·폭염 경보
            </li>
          </ul>
        </div>

        {/* 그 외 취소 규정 */}
        <div className={styles.stadiumTerms}>
          <div className={styles.stadiumTermsTitle}>그 외 취소 규정</div>
          <ul className={styles.stadiumTermsList}>
            <li>신청 후 30분 이내 하루 1회에 한해 무료 취소가 가능합니다.</li>
            <li>단순 변심에 의한 날짜 변경은 불가합니다.</li>
            <li>예약 시간이 지나고 문의하는 경우 변경 및 환불이 불가합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StadiumTerms;
