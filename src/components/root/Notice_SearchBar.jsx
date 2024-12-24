import React from "react";
import "../../pages/root/Noticepage.css";

const Notice_SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value); // 검색어 전달
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        className="notice-SearchBar-input"
        type="text"
        placeholder="🔎 궁금한 것을 검색해보세요"
        onChange={handleSearch} // 입력 이벤트 핸들러 추가
      />
    </div>
  );
};

export default Notice_SearchBar;
