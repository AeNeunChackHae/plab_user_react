import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./OrderPage.module.css";

const OrderPage = () => {
  const [isKakaoPayActive, setIsKakaoPayActive] = useState(true);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentError, setPaymentError] = useState(""); // 결제 실패 메시지
  const [buyerInfo, setBuyerInfo] = useState(null); // 사용자 정보
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = useParams(); // URL 파라미터에서 user_id 가져오기
  const from = location.state?.from || "/"; // 이전 경로가 없으면 홈으로 돌아감
  const match_id = location.state?.match_id; // match_id는 location.state에서 가져옴

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        const res = await fetch(`http://localhost:8080/payment/${user_id}`);
        if (!res.ok) {
          throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }
        const data = await res.json();
        setBuyerInfo(data);
      } catch (err) {
        console.error(err);
        setPaymentError("사용자 정보를 가져올 수 없습니다.");
      }
    };

    fetchBuyerInfo();
  }, [user_id]);

  const handlePaymentMethodClick = () => {
    setIsKakaoPayActive(true);
  };

  const handlePaymentButtonClick = () => {
    if (!buyerInfo) {
      setPaymentError("사용자 정보를 로드하지 못했습니다.");
      return;
    }

    const { IMP } = window;
    IMP.init("imp87372531"); // 아임포트 가맹점 코드

    const data = {
      pg: "kakaopay", // 카카오페이 사용
      pay_method: "card", // 결제 방식 (필요시 'card', 'trans' 등 사용)
      merchant_uid: `ORD-${new Date().getTime()}`, // 주문 고유번호
      name: "매치 결제", // 상품명 대신 매치 결제라고 명시
      amount: 10000, // 결제 금액
      buyer_email: buyerInfo.email, // 구매자 이메일
      buyer_name: buyerInfo.username, // 구매자 이름
      buyer_tel: buyerInfo.phone_number, // 구매자 전화번호
    };

    // 결제 요청
    IMP.request_pay(data, async (response) => {
      if (response.success) {
        try {
          // 결제 성공 시 백엔드로 결제 정보 전달
          const res = await fetch("http://localhost:8080/payment/complete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id, // 프론트에서 가져온 사용자 ID
              match_id, // match_id
              imp_uid: response.imp_uid, // 아임포트 결제 고유번호
              merchant_uid: response.merchant_uid, // 주문 고유번호
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.msg || "결제 데이터 저장 실패");
          }

          const result = await res.json();
          console.log("결제 성공:", result.message);
          setIsPaymentComplete(true);

          // 결제 성공 시 마이페이지로 이동
          setTimeout(() => navigate("/mypage/myplab"), 2000);
        } catch (err) {
          console.error("결제 처리 중 오류:", err);
          setPaymentError(err.message);
        }
      } else {
        // 결제 실패 시
        setPaymentError(response.error_msg || "결제가 취소되었습니다.");
      }
    });
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
