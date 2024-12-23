/* 그냥 카테고리 탭만 쓰고 이건 안 씀 */

import React, { useState } from "react";
import "../../styles-cs.css";

const faqs = [
  {
    question: "소셜 매치 취소/변경 환불 규정을 알고 싶어요",
    answer: "환불 규정은 취소 시점에 따라 다릅니다.",
  },
  {
    question: "레벨 시스템이 궁금해요",
    answer: "레벨 시스템은 매치 참여 횟수와 점수를 기준으로 부여됩니다.",
  },
  {
    question: "매치 진행을 위한 최소 인원이 궁금해요",
    answer: "최소 6명이 필요합니다.",
  },
  {
    question: "계정 탈퇴를 하고 싶어요",
    answer: "계정 설정에서 탈퇴를 진행할 수 있습니다.",
  },
  {
    question: "축구화를 신어도 되나요?",
    answer: "풋살화나 인조잔디용 축구화 착용을 권장합니다.",
  },
  {
    question: "친구와 함께 매치에 참여하고 싶어요",
    answer: "팀 신청을 통해 함께 참여할 수 있습니다.",
  },
  {
    question: "충전한 캐시를 환불받고 싶어요",
    answer: "환불은 충전 후 7일 이내에만 가능합니다.",
  },
  {
    question: "신청 인원이 궁금해요",
    answer: "현재 신청 인원은 매치 상세 페이지에서 확인할 수 있습니다.",
  },
  {
    question: "진행 여부를 언제 알 수 있나요?",
    answer: "매치 시작 1시간 전까지 알림이 제공됩니다.",
  },
  {
    question: "비가 와도 매치를 진행하나요?",
    answer: "우천 시에도 진행되며 취소 시 알림을 드립니다.",
  },
  {
    question: "소셜 매치 강수 정책을 알고 싶어요",
    answer: "기상 상황에 따라 일정이 조정될 수 있습니다.",
  },
];

const CSFAQList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ borderTop: "1px solid #ddd" }}>
      {faqs.map((faq, index) => (
        <div key={index}>
          <div
            onClick={() => toggleAnswer(index)}
            style={{
              padding: "15px 10px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Q . {faq.question}</span>
            <span className="check-arrow">
              {openIndex === index ? "∧" : "∨"}
            </span>
          </div>
          {openIndex === index && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderBottom: "1px solid #eee",
              }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CSFAQList;
