import React from "react";
import Notice_CategoryTabs from "../Components/Notice_CategoryTabs";
import Notice_ContactButton from "../Components/Notice_ContactButton";
import "./Noticepage.css";

const NoticePage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 className="main-text1">플랩풋볼의</h1>
      <h1 className="main-text2">공지사항을 알려드려요!</h1>
      <Notice_CategoryTabs />
      <Notice_ContactButton />
    </div>
  );
};

export default NoticePage;
