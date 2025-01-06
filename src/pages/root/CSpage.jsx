import React, { useState, useEffect } from "react";
import CSSearchBar from "../../components/root/CSSearchBar";
import CSContactButton from "../../components/root/CSContactButton";
import "./CSpage.css";

const CSPage = () => {
    const [faqData, setFaqData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
      fetch("http://localhost:8080/api/cs/faq")
          .then((res) => {
              if (!res.ok) {
                  throw new Error("API 호출 실패");
              }
              return res.json();
          })
          .then((data) => {
              if (data && data.length > 0) {
                  const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                  setFaqData(sortedData);
                  setFilteredData(sortedData);
              }
          })
          .catch(() => {
              setError(true);
          });
  }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = faqData.filter((faq) =>
            faq.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="body">
            <h1>안녕하세요😎</h1>
            <h2 className="h2">무엇을 도와드릴까요?</h2>
            
            <div className="SearchBar-container">
                <CSSearchBar onSearch={handleSearch} />
            </div>

            <div className="faq-list">
                {error ? (
                    <p>서버에서 데이터를 불러오지 못했습니다.</p>
                ) : filteredData.length > 0 ? (
                    filteredData.map((faq, index) => (
                        <div key={faq.id}>
                            <div
                                className="faq-item"
                                onClick={() => toggleAnswer(index)}
                            >
                                <span>Q. {faq.title}</span>
                                <span>{openIndex === index ? "∧" : "∨"}</span>
                            </div>
                            {openIndex === index && (
                                <>
                                    <div className="faq-content">
                                        <p className="content_content">내용 : {faq.content}</p>
                                    </div>
                                    <div className="faq-answer">
                                        <p className="content_content">답변 : {faq.answer}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>표시할 FAQ 데이터가 없습니다.</p>
                )}
            </div>

            <CSContactButton />
        </div>
    );
};

export default CSPage;
