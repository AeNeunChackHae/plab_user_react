import React, { useState } from "react";
import CSSearchBar from "./CSSearchBar";
import "../../pages/root/CSpage.css";

const CSCategoryTabs = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 검색된 데이터 필터링
  const filteredData = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* 검색창 유지 */}
      <CSSearchBar onSearch={(query) => setSearchQuery(query)} />

      {/* 필터링된 FAQ 리스트 */}
      <div className="faq-list">
        {filteredData.length > 0 ? (
          filteredData.map((faq, index) => (
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
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CSCategoryTabs;
