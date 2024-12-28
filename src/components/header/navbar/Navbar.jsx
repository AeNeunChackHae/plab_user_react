import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "../navbarmenu/NavbarMenu";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // 검색어 상태
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 로그인 상태 확인 함수
  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem("authToken"); // localStorage에서 토큰 가져오기
    const id = localStorage.getItem("id"); // localStorage에서 사용자 ID 가져오기
    return token && id; // 둘 다 있으면 true 반환
  }, []);

  useEffect(() => {
    // 로그인 상태 초기 확인
    const updateLoginStatus = () => {
      setLoggedIn(checkLoginStatus());
    };

    updateLoginStatus();

    // 같은 탭에서의 localStorage 변경 감지를 위해 setInterval 사용
    const interval = setInterval(updateLoginStatus, 500); // 0.5초마다 확인

    // 다른 탭에서 localStorage 변경 감지
    const handleStorageChange = () => {
      updateLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval); // Interval 정리
      window.removeEventListener("storage", handleStorageChange); // 이벤트 제거
    };
  }, [checkLoginStatus]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen((prev) => !prev);
  };

  const handleKeywordClick = (keyword) => {
    setSearchValue(keyword); // 키워드를 input에 반영
    setIsSearchDropdownOpen(false); // 드롭다운 닫기
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value); // input 값 업데이트
  };

  const handleNavigation = (path) => {
    if (checkLoginStatus()) {
      navigate(path); // 로그인 상태라면 지정된 경로로 이동
    } else {
      alert("로그인 정보가 필요합니다! 로그인 페이지로 이동합니다."); // 경고 메시지
      navigate("/auth/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* 좌측: 햄버거 메뉴와 로고 */}
        <div className={styles.leftSection}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_hamburger.svg"
            alt="Hamburger Menu"
            className={styles.hamburgerButton}
            onClick={openMenu}
          />
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/logo.svg"
            alt="플랩풋볼"
            className={styles.logo}
            onClick={() => navigate("/")} // 로고 클릭 시 이동
          />
        </div>

        {/* 우측: 검색창과 아이콘 */}
        <div className={styles.rightSection}>
          {/* 검색창 */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchBar} onClick={toggleSearchDropdown}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_search.svg"
                alt="Search"
                className={styles.searchIcon}
              />
              <input
                type="text"
                placeholder="지역, 구장, 팀 이름으로 찾기"
                className={styles.searchInput}
                value={searchValue}
                onChange={handleInputChange} // 직접 입력 가능
              />
            </div>
            {isSearchDropdownOpen && (
              <div className={styles.searchDropdown}>
                {/* 최근 검색어 */}
                <div>
                  <p className={styles.dropdownTitle}>최근 검색어</p>
                  <div className={styles.keywordButtons}>
                    <button onClick={() => handleKeywordClick("서울 송파 천마 풋살 파크")}>
                      서울 송파 천마 풋살 파크
                    </button>
                    <button onClick={() => handleKeywordClick("경산 퍼스트")}>
                      경산 퍼스트
                    </button>
                  </div>
                </div>

                {/* 인기 키워드 */}
                <div>
                  <p className={styles.dropdownTitle}>인기 키워드</p>
                  <div className={styles.keywordButtons}>
                    <button onClick={() => handleKeywordClick("수원")}>수원</button>
                    <button onClick={() => handleKeywordClick("부천")}>부천</button>
                    <button onClick={() => handleKeywordClick("천안")}>천안</button>
                    <button onClick={() => handleKeywordClick("안산")}>안산</button>
                    <button onClick={() => handleKeywordClick("김포")}>김포</button>
                  </div>
                </div>

                {/* 새로운 구장 */}
                <div>
                  <p className={styles.dropdownTitle}>새로운 구장</p>
                  <ul>
                    <li>대구 FC캐논 숲속운동장</li>
                    <li>용인 파라 풋살파크 미금점</li>
                    <li>천안 케이엔 풋살파크</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 로그인 상태에 따라 아이콘 표시 */}
          {loggedIn && (
            <>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_club.svg"
                alt="Shield"
                className={styles.icon}
                onClick={() => handleNavigation("/team/dashboard/")} // 팀 대시보드 이동
              />
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_mymatch.svg"
                alt="Calendar"
                className={styles.icon}
                onClick={() => handleNavigation("/mypage/myplab/")} // 개인 매치 페이지 이동
              />
            </>
          )}
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_my.svg"
            alt="Profile"
            className={styles.icon}
            onClick={() => handleNavigation("/mypage/")} // 프로필 페이지 이동
          />
        </div>
      </div>

      {/* 햄버거 메뉴 */}
      {isMenuOpen && <NavbarMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default Navbar;
