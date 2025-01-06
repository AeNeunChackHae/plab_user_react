import React, { useState } from "react";
import "../../pages/root/CSpage.css";

const CSSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="SearchBar-container">  {/* 검색창 컨테이너 추가 */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="🔍 궁금한 것을 검색해보세요"
        className="SearchBar-input"
      />
    </div>
  );
};

export default CSSearchBar;