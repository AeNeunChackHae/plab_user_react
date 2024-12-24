import React, { useState } from "react";
import CSSearchBar from "./CSSearchBar";
import "../../pages/root/CSpage.css";

const tabs = [
  { name: "전체", category: "all" },
  { name: "이용가이드", category: "guide" },
  { name: "소셜매치", category: "match" },
  { name: "강수", category: "rain" },
  { name: "팀", category: "team" },
  { name: "구장예약", category: "booking" },
  { name: "레벨", category: "level" },
  { name: "매너/제재", category: "penalty" },
  { name: "회원정보", category: "info" },
  { name: "결제", category: "payment" },
  { name: "기타", category: "other" },
];

const faqData = {
  all: [
    {
      question: "소셜 매치 취소/변경 환불 규정",
      answer: "환불 규정은 취소 시점에 따라 다릅니다.",
    },
    {
      question: "레벨 시스템이 궁금해요",
      answer: "레벨은 매치 참여와 점수를 통해 올라갑니다.",
    },
    {
      question: "이용 가이드를 알고 싶어요",
      answer: "가이드는 메뉴의 도움말 섹션에서 확인 가능합니다.",
    },
    {
      question: "매치 진행 최소 인원이 궁금해요",
      answer: "최소 인원은 6명입니다.",
    },
    {
      question: "비가 와도 매치를 진행하나요?",
      answer: "우천 시에도 매치는 진행됩니다.",
    },
    {
      question: "팀과 함께 매치에 참여하는 방법",
      answer: "팀 신청 메뉴를 이용하세요.",
    },
    {
      question: "구장 예약은 어떻게 하나요?",
      answer: "구장은 예약 메뉴에서 신청 가능합니다.",
    },
    {
      question: "레벨 점수는 어떻게 올라가나요?",
      answer: "매치 참여 시 점수가 누적됩니다.",
    },
    {
      question: "매너/제재 기준을 알고 싶어요",
      answer: "매너 규정은 규정 섹션에 명시되어 있습니다.",
    },
    {
      question: "회원 정보 수정은 어디서 하나요?",
      answer: "프로필 설정에서 수정 가능합니다.",
    },
    {
      question: "결제 취소는 어떻게 하나요?",
      answer: "결제 내역에서 취소 요청이 가능합니다.",
    },
    {
      question: "기타 문의사항은 어디에 남기나요?",
      answer: "문의하기 버튼을 눌러 문의하세요.",
    },
  ],
  guide: [
    {
      question: "이용 가이드를 알고 싶어요",
      answer: "가이드는 메뉴의 도움말 섹션에서 확인 가능합니다.",
    },
  ],
  match: [
    {
      question: "매치 진행 최소 인원이 궁금해요",
      answer: "최소 인원은 6명입니다.",
    },
  ],
  rain: [
    {
      question: "비가 와도 매치를 진행하나요?",
      answer: "우천 시에도 매치는 진행됩니다.",
    },
  ],
  team: [
    {
      question: "팀과 함께 매치에 참여하는 방법",
      answer: "팀 신청 메뉴를 이용하세요.",
    },
  ],
  booking: [
    {
      question: "구장 예약은 어떻게 하나요?",
      answer: "구장은 예약 메뉴에서 신청 가능합니다.",
    },
  ],
  level: [
    {
      question: "레벨 점수는 어떻게 올라가나요?",
      answer: "매치 참여 시 점수가 누적됩니다.",
    },
  ],
  penalty: [
    {
      question: "매매너/제재 기준을 알고 싶어요",
      answer: "매너 규정은 규정 섹션에 명시되어 있습니다.",
    },
  ],
  info: [
    {
      question: "회원 정보 수정은 어디서 하나요?",
      answer: "프로필 설정에서 수정 가능합니다.",
    },
  ],
  payment: [
    {
      question: "결제 취소는 어떻게 하나요?",
      answer: "결제 내역에서 취소 요청이 가능합니다.",
    },
  ],
  other: [
    {
      question: "기타 문의사항은 어디에 남기나요?",
      answer: "문의하기 버튼을 눌러 문의하세요.",
    },
  ],
};

const CSCategoryTabs = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 검색 및 필터링된 데이터 계산
  const filteredData = faqData[selectedTab]?.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || // 질문에 검색어 포함
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) // 답변에 검색어 포함
  );

  return (
    <div>
      {/* 검색창 */}
      <CSSearchBar onSearch={(query) => setSearchQuery(query)} />

      {/* 탭 목록 */}
      <div className="category-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.category}
            onClick={() => {
              setSelectedTab(tab.category);
              setOpenIndex(null);
            }}
            className={`tab-item ${selectedTab === tab.category ? "bold" : ""}`}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* 검색 및 필터링된 질문 목록 */}
      <div className="faq-list">
        {filteredData?.map((faq, index) => (
          <div key={index}>
            <div
              className="faq-item"
              onClick={() => toggleAnswer(index)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>Q. {faq.question}</span>
              <span>{openIndex === index ? "∧" : "∨"}</span>
            </div>
            {openIndex === index && (
              <div
                className="faq-answer"
                style={{ padding: "10px", backgroundColor: "#f9f9f9" }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSCategoryTabs;
