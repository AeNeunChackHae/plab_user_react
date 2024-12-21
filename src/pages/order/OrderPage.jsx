import React, { useState } from "react";
import styles from "./OrderPage.module.css";

const OrderPage = () => {
  const [isKakaoPayActive, setIsKakaoPayActive] = useState(true);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePaymentMethodClick = () => {
    setIsKakaoPayActive(true);
  };

  const handlePaymentButtonClick = () => {
    // 결제 완료 처리
    setIsPaymentComplete(true);
  };

  const closeModal = () => {
    setIsPaymentComplete(false);
  };

  return (
    <section className={styles.orderSection}>
      <div className={styles.orderContainer}>
        <h1 className={styles.orderTitle}>결제</h1>

        <div className={styles.orderAmountSection}>
          <div className={styles.orderAmountRow}>
            <span>이용 금액</span>
            <span>10,000원</span>
          </div>
          <div className={styles.orderAmountRow}>
            <span>결제 금액</span>
            <span>10,000원</span>
          </div>
        </div>

        <div className={styles.orderMethod}>
          <h2 className={styles.orderSectionTitle}>결제 수단</h2>
          <div
            className={styles.orderMethodOption}
            onClick={handlePaymentMethodClick}
          >
            <input
              type="radio"
              name="payment"
              checked={isKakaoPayActive}
              readOnly
              className={styles.radioInput}
            />
            <label className={styles.orderMethodLabel}>
              <span className={styles.orderMethodName}>카카오페이</span>
              <img
                src="https://t1.kakaocdn.net/payfe_ssr/production/partner-web/c93aabbb0e9884be81f3548f9c81f4b8b3e47b27/_next/static/media/image-payment-method-1-1.0d5a0c60.png" 
                alt="카카오페이"
                className={styles.orderMethodIcon}
              />
            </label>
          </div>
        </div>

        <div className={styles.orderRefundInfo}>
          <h2 className={styles.orderSectionTitle}>환불 안내</h2>
          <table className={styles.orderRefundTable}>
            <thead>
              <tr>
                <th>취소 시점</th>
                <th>환불 비율</th>
              </tr>
            </thead>
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
                <td>2일 전</td>
                <td>50% 환불</td>
              </tr>
              <tr>
                <td>1일 전</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
          <p className={styles.orderRefundNote}>
            결제 완료 후 30분 이내에는 무료 취소가 가능합니다. (취소 수수료 없음)
          </p>
          <ul className={styles.orderRefundDetails}>
            <li>예약 시간 간격 및 기상 상태에 따라 취소 수수료가 달라질 수 있습니다.</li>
            <li>환불 기준은 별도의 공지가 없는 한 표준 환불 정책을 따릅니다.</li>
          </ul>
        </div>

        <div className={styles.orderButton}>
          <button onClick={handlePaymentButtonClick}>10,000원 결제하기</button>
        </div>
      </div>

      {/* 모달 창 */}
      {isPaymentComplete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>결제 알림</h2>
            <p className={styles.modalMessage}>결제가 완료되었습니다.</p>
            <button className={styles.modalCloseButton} onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
