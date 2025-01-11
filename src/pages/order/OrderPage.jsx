import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./OrderPage.module.css";
import fetchWithIsAuth from "../../components/utils/fetchWithIsAuth";

const OrderPage = () => {
  const [isKakaoPayActive, setIsKakaoPayActive] = useState(true);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentError, setPaymentError] = useState(""); // 결제 실패 메시지
  const [buyerInfo, setBuyerInfo] = useState(null); // 사용자 정보
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem("authToken");
  const { user_id } = useParams(); // URL 파라미터에서 user_id 가져오기
  const from = location.state?.from || "/"; // 이전 경로가 없으면 홈으로 돌아감
  const match_id = location.state?.match_id; // match_id는 location.state에서 가져옴

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        const data = await fetchWithIsAuth(`http://localhost:8080/payment/${user_id}`);
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

  const handleApplyAndPaymentClick = async () => {
    try {
      // 1. 결제 처리
      if (!buyerInfo) {
        throw new Error("사용자 정보를 로드하지 못했습니다.");
      }

      const { IMP } = window;
      IMP.init("imp87372531"); // 아임포트 가맹점 코드

      const paymentData = {
        pg: "kakaopay", // 카카오페이 사용
        pay_method: "card", // 결제 방식
        merchant_uid: `ORD-${new Date().getTime()}`, // 주문 고유번호
        name: "매치 결제", // 결제 상품명
        amount: 10000, // 결제 금액
        buyer_email: buyerInfo.email, // 구매자 이메일
        buyer_name: buyerInfo.username, // 구매자 이름
        buyer_tel: buyerInfo.phone_number, // 구매자 전화번호
      };

      // 카카오페이 결제 요청
      IMP.request_pay(paymentData, async (response) => {
        if (response.success) {
          try {
            // 결제 성공 시 백엔드에 결제 정보 전달
            await fetchWithIsAuth("http://localhost:8080/payment/complete", {
              method: "POST",
              body: JSON.stringify({
                user_id,
                match_id,
                imp_uid: response.imp_uid, // 아임포트 결제 고유번호
                merchant_uid: response.merchant_uid, // 주문 고유번호
              }),
            });

            console.log("결제 성공");

            // 2. apply-validation 호출
            await fetchWithIsAuth("http://localhost:8080/payment/apply-validation", {
              method: "POST",
              body: JSON.stringify({ match_id, user_id }),
            });

            console.log("Validation 매치 신청 성공");

            // 결제 및 신청 완료 상태 업데이트
            setIsPaymentComplete(true);
            setTimeout(() => navigate("/mypage/myplab"), 2000);
          } catch (err) {
            throw new Error("결제 및 매치 신청 처리 중 오류 발생");
          }
        } else {
          alert("[결제 취소] 사용자가 결제를 취소하셨습니다.");
        }
      });
    } catch (err) {
      console.error("신청 및 결제 처리 중 오류:", err);
      setPaymentError(err.message);
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
          <button onClick={handleApplyAndPaymentClick}>10,000원 결제하기</button>
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
