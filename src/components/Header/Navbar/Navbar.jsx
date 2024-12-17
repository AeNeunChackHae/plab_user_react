import React, { useState } from "react";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // 검색어 상태

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleSearchDropdown = () =>
    setIsSearchDropdownOpen((prev) => !prev);

  const handleKeywordClick = (keyword) => {
    setSearchValue(keyword); // 키워드를 input에 반영
    setIsSearchDropdownOpen(false); // 드롭다운 닫기
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value); // input 값 업데이트
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
          <a href="/">
            <img
              src="https://d31wz4d3hgve8q.cloudfront.net/static/img/logo.svg"
              alt="플랩풋볼"
              className={styles.logo}
            />
          </a>
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

          {/* 아이콘들 */}
          <a href="/mypage/myplab/">
            <img
              src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_club.svg"
              alt="Shield"
              className={styles.icon}
            />
          </a>
          <a href="/calendar">
            <img
              src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_mymatch.svg"
              alt="Calendar"
              className={styles.icon}
            />
          </a>
          <a href="/mypage/">
            <img
              src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_my.svg"
              alt="Profile"
              className={styles.icon}
            />
          </a>
        </div>
      </div>

      {/* 햄버거 메뉴 */}
      {isMenuOpen && <NavbarMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default Navbar;
