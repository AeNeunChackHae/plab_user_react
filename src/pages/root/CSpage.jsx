import React, { useState, useEffect } from "react";
import CSSearchBar from "../../components/root/CSSearchBar";
import ContactFormModal from "./ContactFormModal";
import "./CSpage.css";

const CSPage = () => {
    const [faqData, setFaqData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const [error, setError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 초기 데이터 가져오기
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

    // 검색 필터링
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = faqData.filter((faq) =>
            faq.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // 답변 토글
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // 문의 등록
    const handleModalSubmit = async (title, content) => {
        const userId = localStorage.getItem("id");
        if (!userId) {
            alert("사용자 ID가 없습니다. 로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/cs/faq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content, user_id: userId }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`문의 등록 실패: ${errorText}`);
            }

            const addedFAQ = await response.json();
            addedFAQ.title = title;
            addedFAQ.content = content;

            // 최신순 정렬
            setFaqData((prev) => [addedFAQ, ...prev].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            setFilteredData((prev) => [addedFAQ, ...prev].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

            alert("문의가 성공적으로 등록되었습니다.");
            setIsModalOpen(false);
        } catch (error) {
            console.error("문의 등록 오류:", error);
            alert(error.message);
        }
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
                ) : (
                    filteredData.map((faq, index) => (
                        <div key={faq.id}>
                            <div className="faq-item" onClick={() => toggleAnswer(index)}>
                                <span>Q. {faq.title}</span>
                                <div className="faq-status-container">
                                    <span className={`status ${faq.answer ? "answered" : "unanswered"}`}>
                                        {faq.answer ? "답변완료" : "답변대기"}
                                    </span>
                                    <span>{openIndex === index ? "∧" : "∨"}</span>
                                </div>
                            </div>
                            {openIndex === index && (
                                <>
                                    <div className="faq-content">
                                        <p className="content_content">내용 : {faq.content}</p>
                                    </div>
                                    <div
                                        className={`faq-answer ${faq.answer ? 'completed' : 'waiting'}`}
                                    >
                                        <p className="content_content">
                                            <span className="answer-label">답변 : </span>{' '}
                                            <span className={`waiting-text ${faq.answer ? 'hidden' : ''}`}>
                                                {faq.answer || '답변 대기 중...'}
                                            </span>
                                            {faq.answer && <span className="completed-text">{faq.answer}</span>}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
            <button onClick={() => setIsModalOpen(true)} className="contact-button">문의하기</button>
            <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} />
        </div>
    );
};

export default CSPage;
