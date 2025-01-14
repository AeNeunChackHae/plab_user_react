import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { config } from '../../../config.js';

const Sidebar = () => {
  const api = config.aws.ec2_host_user
  const [levelImage, setLevelImage] = useState(null); // 사용자 레벨 이미지
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  // console.log("토큰", token);

  // 이미지가 저장된 기본 경로
  const levelImageBasePath = "/images/plab_level_img";

  // localStorage에서 userId와 token 가져오기
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("authToken");
    // console.log("storedUserId", storedUserId);
    // console.log("storedToken", storedToken);

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    } else {
      console.error("로그인 정보가 없습니다.");
      setIsLoading(false);
    }
  }, []);

  // 백엔드에서 사용자 레벨 코드 가져오기
  useEffect(() => {
    if (!userId || !token) {
      return;
    }

    const fetchLevelCode = async () => {
      try {
        const response = await fetch(
          `${api}/mypage/mylevelpics`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("mylevelpics에서 받은 데이터:", data);

        // level_code 기반 이미지 설정
        const levelCode = data[0]?.level_code;
        // console.log("levelCode", levelCode);
        if (levelCode !== undefined) {
          const imageUrl = `${levelImageBasePath}/level_${levelCode}.png`;
          setLevelImage(imageUrl);
        } else {
          console.warn("Unknown level code:", levelCode);
          setLevelImage(null);
        }
      } catch (error) {
        console.error("Error fetching level image:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevelCode();
  }, [userId, token, api]);

  return (
    <div className="sidebar">
      {/* 사용자 레벨 이미지 */}
      <div className="sidebar-image-div">
        {isLoading ? (
          <p>Loading...</p>
        ) : levelImage ? (
          <img className="sidebar-image" src={levelImage} alt="User Level" />
        ) : (
          <p>레벨 정보를 가져올 수 없습니다.</p>
        )}
      </div>

      {/* 레벨 테이블 이미지 */}
      <div className="sidebar-image-div">
        <img
          className="sidebar-image"
          src={`${levelImageBasePath}/level_all.png`}
          alt="Level table"
        />
      </div>
    </div>
  );
};

export default Sidebar;
