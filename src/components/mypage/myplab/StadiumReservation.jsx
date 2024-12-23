import React, { useState } from "react";
import TabNavigation from "../../mypage/myplab/TabNavigation";
import "./StadiumReservation.css";

const StadiumReservation = ({ selectedDate = null, reservations = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);

  // 선택된 날짜 또는 현재 월과 연도 계산
  const currentMonth = selectedDate
    ? new Date(selectedDate).getMonth()
    : new Date().getMonth();
  const currentYear = selectedDate
    ? new Date(selectedDate).getFullYear()
    : new Date().getFullYear();

  // 현재 월의 예약 필터링
  const filteredReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return (
      reservationDate.getMonth() === currentMonth &&
      reservationDate.getFullYear() === currentYear &&
      (reservation.status === "confirmed" ||
        reservation.status === "cancelled" ||
        reservation.status === "completed")
    );
  });

  // 구장 상세 정보
  const viewStadiumDetails = (reservationId) => {
    console.log(`구장 상세 정보 보기: Reservation ID ${reservationId}`);
    alert("구장 상세 페이지로 이동합니다!");
  };

  // 예약 취소
  const handleCancelReservation = (reservationId) => {
    setSelectedReservation(reservationId);
    setModalMessage("정말 예약을 취소하시겠습니까?");
    setShowModal(true);
  };

  const confirmCancel = () => {
    console.log(`예약 취소 완료: Reservation ID ${selectedReservation}`);
    setModalMessage("취소가 완료되었습니다.");
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  // 아이콘 선택 로직
  const getIcon = (reservation) => {
    if (reservation.status === "completed") {
      return "/icons/complete-reservation-icon.png"; // 완료된 예약 아이콘 경로
    }
    return reservation.status === "confirmed"
      ? "/icons/confirmed-reservation-icon.png" // 확정된 예약 아이콘 경로
      : "/icons/cancelled-reservation-icon.png"; // 취소된 예약 아이콘 경로
  };

  return (
    <div>
      <TabNavigation />
      <div>
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation, index) => (
            <div key={index} className="reservation-item">
              {/* 동그란 아이콘과 예약 정보 */}
              <div className="reservation-info">
                <img
                  src={getIcon(reservation)}
                  alt="reservation icon"
                  className="status-circle"
                />
                <div>
                  <p className="reservation-date-time">
                    {new Date(reservation.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="reservation-stadium-name">
                    <strong>{reservation.stadiumName}</strong>
                  </p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="reservation-buttons">
                {reservation.status === "confirmed" && (
                  <button onClick={() => viewStadiumDetails(reservation.id)}>
                    구장 상세 정보
                  </button>
                )}
                {reservation.status === "confirmed" && (
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    예약 취소
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>해당 월에 구장 예약 내역이 없습니다.</p>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            {modalMessage === "정말 예약을 취소하시겠습니까?" && (
              <div>
                <button onClick={confirmCancel}>확인</button>
                <button onClick={closeModal}>취소</button>
              </div>
            )}
            {modalMessage === "취소가 완료되었습니다." && (
              <button onClick={closeModal}>확인</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StadiumReservation;
