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
  
  const token = localStorage.getItem("authToken");
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

  const handleApplyAndPaymentClick = async () => {
    try {
      if (!token) {
        throw new Error("인증 토큰이 누락되었습니다.");
      }
  
      console.log("사용 중인 토큰:", token);
  
      // 1. Validation 요청
      const validationResponse = await fetch("http://localhost:8080/payment/apply-validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ match_id, user_id }),
      });
  
      if (validationResponse.status === 401) {
        // 401 에러 발생 시 로그인 화면으로 이동
        alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
        navigate("/auth/login"); // 로그인 페이지로 리디렉션
        return;
      }
  
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
            const paymentResponse = await fetch(
              "http://localhost:8080/payment/complete",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user_id,
                  match_id,
                  imp_uid: response.imp_uid, // 아임포트 결제 고유번호
                  merchant_uid: response.merchant_uid, // 주문 고유번호
                }),
              }
            );
  
            if (!paymentResponse.ok) {
              const errorData = await paymentResponse.json();
              throw new Error(errorData.message || "결제 데이터 저장 실패");
            }
  
            const result = await paymentResponse.json();
            console.log("결제 성공:", result.message);
  
            // 2. apply-validation 호출
            const validationResponse = await fetch(
              "http://localhost:8080/payment/apply-validation",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ match_id, user_id }),
              }
            );
  
            if (!validationResponse.ok) {
              const errorData = await validationResponse.json();
              throw new Error(errorData.message || "Validation 매치 신청 실패");
            }
            console.log("Validation 매치 신청 성공");
  
            // 3. apply-simple 호출
            // const simpleResponse = await fetch(
            //   "http://localhost:8080/payment/apply-simple",
            //   {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //       authorization: `Bearer ${token}`,
            //     },
            //     body: JSON.stringify({ match_id, user_id }),
            //   }
            // );
  
            // if (!simpleResponse.ok) {
            //   const errorData = await simpleResponse.json();
            //   throw new Error(errorData.message || "Simple 매치 신청 실패");
            // }
            // console.log("Simple 매치 신청 성공");
  
            // 결제 및 신청 완료 상태 업데이트
            setIsPaymentComplete(true);
            setTimeout(() => navigate("/mypage/myplab"), 2000);
          } catch (err) {
            throw new Error("결제 및 매치 신청 처리 중 오류 발생");
          }
        } else {
          throw new Error(response.error_msg || "결제가 취소되었습니다.");
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
