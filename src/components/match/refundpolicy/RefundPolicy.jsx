import React, { useState } from 'react';
import styles from './RefundPolicy.module.css';

const RefundPolicy = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    const navigateToMyPage = () => {
      window.location.href = '/mypage/myplab';
  };


  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader} onClick={toggleExpand}>
        <h3 className={styles.sectionTitle}>
          환불 정책
        </h3>
          <span className={isExpanded ? styles.arrowUp : styles.arrowDown}></span>
      </div>
      
      {isExpanded &&(
      <div className={styles.sectionBody}>
        {/* 취소 환불 규정 */}
        <ul className={styles.matchRule}>
          <h4>취소 환불 규정</h4>
          <table className={styles.refundTable}>
            <colgroup>
              <col style={{ width: '70%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <tbody>
              <tr>
                <td>매치 1일 전</td>
                <td>무료 취소</td>
              </tr>
              <tr>
                <td>당일 ~ 매치 시작 3시간간 전까지</td>
                <td>20% 환급</td>
              </tr>
              <tr>
                <td>매치 시작 3시간 이내
                  <span className={styles.helptext}>
                    (인원 미달로 인한 매치 취소 시, 전액 환불)
                </span>
                </td>
                <td>환불 및 매치 신청 취소 불가</td>
              </tr>
            </tbody>
          </table>
          <li>
            취소 수수료 발생 시 사용된 포인트를 우선 차감 후 차액을 캐시로 지급
            합니다.
          </li>
          <li>변경은 상단 취소 환불 규정과 동일하게 적용됩니다.</li>
        </ul>

        {/* 그 외 취소 규정 */}
        <ul className={styles.matchRule}>
          <h4>그 외 취소 규정</h4>
          <li>
            신청 후 30분 이내에는 하루 1회에 한해 무료 취소가 가능합니다.{' '}
            <b>(단, 매치 시작 3시간간 이내일 경우 불가)</b>
          </li>
          <li>
            매치 시작 3시간 전까지 최소 인원이 모이지 않을 시 email로
            안내되며, 자동 전액 환불됩니다. (단, 공지 전 직접 취소하시는 경우
            상단 일반 환불 규정대로 처리됩니다.)
          </li>
        </ul>

        {/* 유의 사항 */}
        <ul className={styles.matchRule}>
          <h4>유의 사항</h4>
          <li>단순 변심으로 취소 혹은 변경을 요청하는 경우 환불이 불가합니다.</li>
          <li>무단 불참 시시 페널티를 받습니다.</li>
          <li>
            참여가 어려울 경우, 원활한 매치 진행을 위해{' '}
            <span  
              onClick={navigateToMyPage}
              style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
              >
              마이 플랩
            </span>
            에서 미리 취소해 주세요.
          </li>
        </ul>

        {/* 강수 환불 규정 */}
        <ul className={styles.matchRule}>
          <h4>강수 환불 규정</h4>
          <li>
            기상청 날씨누리 예보에 따라 환불 가능시 공지해드립니다.<br/>
            <ul>
                [공지 시점]
              <li>
                오전(12시 이전) 매치 : 하루 전 22시 기준, 매치 진행 시간의 강수량
                예보가 1mm 이상 시
              </li>
              <li>
                오후(12시 이후) 매치 : 매치 시작 4시간 전 기준, 매치 진행 시간의
                강수량 예보가 1mm 이상 시
              </li>
            [공지 방법] : Email로 발송 됩니다.
            </ul>
          </li>
          <li>
            ‘강수 알림 메일’을 받고, 매치 시작 3시간 전까지 취소하면 전액 환불됩니다.
            <ul>
              <li>
                ‘강수 알림 메일’이 발송 된 매치 참가 중 중도 포기하여 조기 귀가하시는
                경우 환불이 불가합니다.
              </li>
            </ul>
          </li>
          <li>
            갑작스러운 기상 악화로 1mm 이상 강수 예보가 발생하였으나 매치 3시간
            전까지 알림톡이 발송되지 못한 경우, 아래와 같이 처리됩니다.
          <ul>
            <li>
              매치 시작 1시간 30분 ~ 3시간 전까지 email로 
              문의 시 확인 후 강수 안내 알림톡 발송 또는 전액 환불 처리
            </li>
          </ul>
          </li>
          <li>
            알림 메일 발송 없이 직접 취소하시는 경우 상단 일반 환불 규정대로
            처리됩니다.
          </li>
          <li>별도 공지가 없을 시 매치는 정상 진행됩니다.</li>
          <li>
            다수의 인원이 취소하거나, 구장 상태가 좋지 않아 진행이 어렵다면 매치
            시작 3시간 이내라도 매치를 취소합니다.
          </li>
        </ul>

        {/* 취소 방법 */}
        <ul className={styles.matchRule}>
          <h4>취소 방법</h4>
          <li>
            [마이페이지] → [매치 탭] → 취소를 원하는 매치의 [상세 내역] 내 [신청
            취소하기]
          </li>
          <li>
          <span
              onClick={navigateToMyPage}
              style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
          >
              마이 플랩 바로 가기
          </span>
          </li>
        </ul>
      </div>
      )}
    </section>
  );
};

export default RefundPolicy;
