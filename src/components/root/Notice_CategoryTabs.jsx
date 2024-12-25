import React, { useState } from "react";
import Notice_SearchBar from "./Notice_SearchBar";
import "../../pages/root/Noticepage.css";

const tabs = [
  { name: "전체", category: "all" },
  { name: "서비스", category: "service" },
  { name: "공지", category: "notice" },
];

const faqData = {
  all: [
    {
      question: "레벨 시스템 개편 안내",
      answer:
        "안녕하세요, 플랩풋볼입니다.플랩풋볼 서비스를 사랑해 주시는 플래버님들께 진심으로 감사드리며,보다 재미있고 균형 잡힌 매치를 제공하기 위해 2025년 1월 13일부터 플랩 레벨 시스템이 개편될 예정입니다.",
      category: "notice",
    },
    {
      question: "24/25 겨울 한정 무료취소 정책 추가",
      answer:
        "겨울에도 인원 부족 걱정 없이 매치에 꼭 참여하실 수 있도록 아래와 같이 한시적으로 무료 취소 정책이 추가 됩니다. (추가된 정책이므로 이 외 나머지 정책은 기존과 동일합니다.)",
      category: "notice",
    },
    {
      question: "고객 센터 상담 시간 변경 안내",
      answer:
        "다가오는 8월 26일부터 고객 센터 상담 시간이 변경 운영되는 점을 사전 안내드립니다. 아래 변경 사항 확인하시어, 서비스 이용에 참고 부탁드리겠습니다.",
      category: "notice",
    },
    {
      question: "게스트 모집 전국 확대",
      answer:
        "기존 서울 지역에서만 가능했던 게스트 모집이 전국으로 확대됐어요!",
      category: "service",
    },
    {
      question: "플랩 스타디움 가산 디지털엠파이어 오픈 안내",
      answer:
        "성공적인 가오픈 매치를 마치고 7월 8일 19시 매치를 시작으로 플랩만의 색깔을 느낄 수 있는 10번째 플랩 스타디움이 정식 오픈합니다☺️",
      category: "service",
    },
    {
      question: "플랩 스타디움 부산 주례 오픈 안내",
      answer:
        "드디어! 부산에도 첫 플랩 스타디움이 오픈했어요😀 주례역에서 걸어가다 보면 파~란 색깔로 존재감을 뿜뿜하고 있는 스타디움이 보일 거예요!",
      category: "service",
    },
  ],
  service: [
    {
      question: "게스트 모집 전국 확대",
      answer:
        "기존 서울 지역에서만 가능했던 게스트 모집이 전국으로 확대됐어요!",
      category: "service",
    },
    {
      question: "플랩 스타디움 가산 디지털엠파이어 오픈 안내",
      answer:
        "성공적인 가오픈 매치를 마치고 7월 8일 19시 매치를 시작으로 플랩만의 색깔을 느낄 수 있는 10번째 플랩 스타디움이 정식 오픈합니다☺️",
      category: "service",
    },
    {
      question: "플랩 스타디움 부산 주례 오픈 안내",
      answer:
        "드디어! 부산에도 첫 플랩 스타디움이 오픈했어요😀 주례역에서 걸어가다 보면 파~란 색깔로 존재감을 뿜뿜하고 있는 스타디움이 보일 거예요!",
      category: "service",
    },
  ],
  notice: [
    {
      question: "레벨 시스템 개편 안내",
      answer:
        "안녕하세요, 플랩풋볼입니다.플랩풋볼 서비스를 사랑해 주시는 플래버님들께 진심으로 감사드리며,보다 재미있고 균형 잡힌 매치를 제공하기 위해 2025년 1월 13일부터 플랩 레벨 시스템이 개편될 예정입니다.",
      category: "notice",
    },
    {
      question: "24/25 겨울 한정 무료취소 정책 추가",
      answer:
        "겨울에도 인원 부족 걱정 없이 매치에 꼭 참여하실 수 있도록 아래와 같이 한시적으로 무료 취소 정책이 추가 됩니다. (추가된 정책이므로 이 외 나머지 정책은 기존과 동일합니다.)",
      category: "notice",
    },
    {
      question: "고객 센터 상담 시간 변경 안내",
      answer:
        "다가오는 8월 26일부터 고객 센터 상담 시간이 변경 운영되는 점을 사전 안내드립니다. 아래 변경 사항 확인하시어, 서비스 이용에 참고 부탁드리겠습니다.",
      category: "notice",
    },
  ],
};

const Notice_CategoryTabs = () => {
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

  document.querySelectorAll(".notice-faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // 모든 항목 비활성화
      document
        .querySelectorAll(".notice-faq-item")
        .forEach((i) => i.classList.remove("active"));

      // 현재 항목 활성화/비활성화
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  return (
    <div>
      {/* 검색창 */}
      <Notice_SearchBar onSearch={(query) => setSearchQuery(query)} />

      {/* 탭 목록 */}
      <div className="notice-category-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.category}
            onClick={() => {
              setSelectedTab(tab.category);
              setOpenIndex(null);
            }}
            className={`notice-tab-item ${
              selectedTab === tab.category ? "bold" : ""
            }`}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* 검색 및 필터링된 질문 목록 */}
      <div className="notice-faq-list">
        {filteredData?.map((faq, index) => (
          <div key={index}>
            <div
              className="notice-faq-item"
              onClick={() => toggleAnswer(index)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>
                [{faq.category === "service" ? "서비스" : "공지"}]{" "}
                {faq.question}
              </span>
              <span>{openIndex === index ? "∧" : "∨"}</span>
            </div>
            {openIndex === index && (
              <div
                className="notice-faq-answer"
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

export default Notice_CategoryTabs;
