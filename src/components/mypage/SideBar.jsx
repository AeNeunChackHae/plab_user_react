import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/mypage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        console.log("User Data:", data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [userId, token]);

  return (
    <div className={styles.sidebar}>
      {/* 사용자명 표시 */}
      <h2 className={styles.userName}>
        {userData ? userData.username : "사용자 이름 없음"}
      </h2>
      {/* 사용자 Email 표시 */}
      <p className={styles.userEmail}>
        {userData ? userData.userEmail : "ID 없음"}
      </p>

      <div className={styles.infoContainer}>
        {/* 선호 포지션 박스 */}
        <div className={styles.infoBox}>
          <div className={styles.infoDetail}>
            <p className={styles.infoTitle}>
              선호 <br /> 포지션
            </p>
            <p className={styles.infoSubs}>
              {userData ? userData.prefer_position : "데이터 없음"}
            </p>
          </div>
        </div>

        {/* 플레이 스타일 박스 */}
        <div className={styles.infoBox}>
          <div className={styles.infoDetail}>
            <p className={styles.infoTitle}>
              플레이 <br /> 스타일
            </p>
            <p className={styles.infoSubs}>
              {userData ? userData.playStyle : "데이터 없음"}
            </p>
          </div>
        </div>

        {/* 레벨 박스 */}
        <div className={styles.infoBox}>
          <div className={styles.infoDetail}>
            <p className={styles.infoTitle}>레벨</p>
            <p className={styles.infoSubs}>
              {userData ? userData.userLevel : "데이터 없음"}
            </p>
          </div>
        </div>
      </div>

      {/* 홍보 배너 */}
      <Link to="/mypage/mylevel" className={styles.promotionMessage}>
        <p className={styles.bannerSmall}>활동량 기록, 타인 평가를 통한</p>
        <p className={styles.bannerBig}>
          <strong>개인 레벨 관리로 성장 하세요!</strong>
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
