import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./OrderPage.module.css";

const OrderPage = () => {
  const [isKakaoPayActive, setIsKakaoPayActive] = useState(true);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentError, setPaymentError] = useState(""); // 결제 실패 메시지
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = useParams(); // URL 파라미터에서 user_id 가져오기
  const from = location.state?.from || "/"; // 이전 경로가 없으면 홈으로 돌아감

  const handlePaymentMethodClick = () => {
    setIsKakaoPayActive(true);
  };

  const handlePaymentButtonClick = async () => {
    console.log('location.state', location.state);
    try {
      const match_id = location.state?.match_id; // match_id를 이전 페이지에서 받아옴
      console.log('오더페이지 매치아이디', match_id);
      if (!match_id || !user_id) {
        console.error("match_id 또는 user_id가 누락되었습니다.");
        return;
      }

      // 결제 요청
      const response = await fetch("http://localhost:8080/match/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 인증 토큰
        },
        body: JSON.stringify({
          match_id,
          user_id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // 오류 메시지 확인
        throw new Error(errorData.message || "매치 신청에 실패했습니다.");
      }

      const result = await response.json();
      console.log(result.message);

      setIsPaymentComplete(true); // 결제 성공 표시

      // 결제 성공 시 마이페이지로 이동
      setTimeout(() => {
        navigate("/mypage/myplab"); // 성공 시 이동 경로
      }, 2000);
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      setPaymentError(err.message); // 결제 실패 메시지 저장
    }
  };

  const closeModal = () => {
    if (paymentError) {
      // 결제 실패 시 이전 페이지로 이동
      navigate(from);
    } else {
      // 결제 성공 시 모달 닫기
      setIsPaymentComplete(false);
    }
    setPaymentError(""); // 오류 메시지 초기화
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

        <div className={styles.orderButton}>
          <button onClick={handlePaymentButtonClick}>10,000원 결제하기</button>
        </div>
      </div>

      {/* 결제 성공 모달 */}
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

      {/* 결제 실패 모달 */}
      {paymentError && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>결제 실패</h2>
            <p className={styles.modalMessage}>{paymentError}</p>
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
