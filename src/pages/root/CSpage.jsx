import React from "react";
import CSCategoryTabs from "../Components/CSCategoryTabs";
import CSContactButton from "../Components/CSContactButton";
import "./CSpage.css";

const CSPage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 className="main-text1">안녕하세요😎</h1>
      <h1 className="main-text2">무엇을 도와드릴까요?</h1>
      <CSCategoryTabs />
      <CSContactButton />
    </div>
  );
};

export default CSPage;
