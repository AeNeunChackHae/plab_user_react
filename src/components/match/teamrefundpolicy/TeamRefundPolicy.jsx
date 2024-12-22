import React, { useState } from 'react';
import styles from './TeamRefundPolicy.module.css';

const TeamRefundPolicy = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader} onClick={toggleExpand}>
        <h3 className={styles.sectionTitle}>취소 및 환불 규정</h3>
        <span className={isExpanded ? styles.arrowUp : styles.arrowDown}></span>
      </div>

      {isExpanded && (
        <div className={styles.sectionBody}>
          <ul className={styles.matchRule}>
            <h5>팀리그 신청 취소 시 환불 기준</h5>
            <table className={styles.refundTable}>
              <colgroup>
                <col style={{ width: '50%' }} />
                <col style={{ width: '50%' }} />
              </colgroup>
              <tbody>
                <tr>
                  <td>결제 후 30분 이내</td>
                  <td>무료 취소(하루 1회 제한)</td>
                </tr>
                <tr>
                  <td>매치 3일 전</td>
                  <td>무료 취소</td>
                </tr>
                <tr>
                  <td>매치 2일 전</td>
                  <td>50% 환급</td>
                </tr>
                <tr>
                  <td>매치 1일 전</td>
                  <td>20% 환급</td>
                </tr>
                <tr>
                  <td>매치 당일</td>
                  <td>0% (환급 불가)</td>
                </tr>
              </tbody>
            </table>
            <li>
              취소 수수료 발생 시 사용된 포인트를 우선 차감 후 차액을 캐시로 지급
              합니다.
            </li>
            <li>변경은 상단 취소 환불 규정과 동일하게 적용됩니다.</li>
          </ul>

          <ul className={styles.matchRule}>
            <h5>그 외 취소 규정</h5>
            <li>
              신청 후 30분 이내에는 하루 1회에 한해 무료 취소가 가능합니다.{' '}
              <b>(단, 매치 시작 90분 이내일 경우 불가)</b>
            </li>
            <li>
              호우 경보, 대설 경보, 태풍 주의보, 태풍 경보 등 천재지변으로 구장
              이용이 어려울 경우 매치는 취소되며, 전액 캐시 환불해 드립니다.
            </li>
            <li>
              강수량 1mm 이상의 예보가 있다면 매치 시작 4시간 전에 ‘강수 안내
              알림톡’을 발송합니다.
            </li>
            <li>
              ‘강수 알림톡’을 받고, 매치 시작 90분 전까지 취소하면 전액
              환불됩니다.
              <ul>
                <li>
                  ‘강수 알림톡’이 발송 된 매치 참가 중 중도 포기하여 조기 귀가하시는
                  경우 환불이 불가합니다.
                </li>
              </ul>
            </li>
            <li>
              현장에서 눈, 비로 인해 매치가 정상적으로 진행되기 어려운 경우 참가
              팀의 의견을 반영하여 취소하거나 중단하며, 진행하지 못한 시간만큼
              캐시로 환불됩니다(1mm 미만의 강수량에는 본 항목이 적용되지 않음).
            </li>
            <li>
              매치 시작 시간 기준 1일(24시간) 전까지 2팀 이상 모이지 않은 경우
              카카오톡 혹은 LMS으로 안내되며, 자동 전액 환불됩니다.
            </li>
            <li>
              매치 시작 시간 기준 1일 내 취소가 발생하여 1팀 이하만 남은 경우
              카카오톡 혹은 LMS으로 안내되며, 자동 전액 환불됩니다.
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default TeamRefundPolicy;
