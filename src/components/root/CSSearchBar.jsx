import React from "react";
import "../../pages/root/CSpage.css";

const CSSearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value); // 검색어 전달
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        className="SearchBar-input"
        type="text"
        placeholder="🔎 궁금한 것을 검색해보세요"
        onChange={handleSearch} // 검색어 입력 이벤트 처리
      />
    </div>
  );
};

export default CSSearchBar;
