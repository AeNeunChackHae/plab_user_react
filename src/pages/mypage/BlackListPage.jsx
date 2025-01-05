import React, { useState, useEffect } from "react";
import styles from "./BlackListPage.module.css";

function BlacklistManager() {
  const [users, setUsers] = useState([]); // 사용자 목록 상태
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // 사용자 데이터를 API에서 가져오기
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/mypage/blacklist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: localStorage.getItem("id") }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(
          data.map((user) => ({
            id: user.userId,
            name: user.username,
            isBlocked: true,
            imageUrl: user.profilePath || "/assets/image/profile_img.png",
          }))
        );
      } catch (error) {
        console.error("Error fetching blacklist users:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  // 사용자 차단 해제 처리 함수
  const handleUnblock = async (userId, username) => {
    // 확인 알림
    const isConfirmed = window.confirm(
      `"${username}" 님을 차단 해제하시겠습니까?`
    );

    if (!isConfirmed) {
      return; // 사용자가 취소를 선택한 경우 함수 종료
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/mypage/blacklist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          blackUserId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user.id !== userId));
      alert(`"${username}"이(가) 차단 해제되었습니다.`);
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className={styles.userList}>
      <h3 className={styles.title}>블랙리스트</h3>
      {users.length === 0 ? (
        <p className={styles.emptyMessage}>블랙리스트에 등록된 사용자가 없습니다.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className={styles.user}>
            <img
              src={user.imageUrl}
              className={styles.profileImage}
              alt="Profile"
            />
            <span className={styles.userName}>{user.name}</span>
            <button
              onClick={() => handleUnblock(user.id, user.name)}
              className={styles.unblockButton}
              disabled={!user.isBlocked}
            >
              차단 해제
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BlacklistManager;
