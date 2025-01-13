import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarMenu from "../navbarmenu/NavbarMenu";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("id");
    return token && id;
  }, []);

  useEffect(() => {
    const updateLoginStatus = () => {
      setLoggedIn(checkLoginStatus());
    };

    updateLoginStatus();

    const interval = setInterval(updateLoginStatus, 500);

    const handleStorageChange = () => {
      updateLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkLoginStatus]);

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchValue("");
    }
  }, [location.pathname]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const fetchSearchResults = async (value) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search?query=${encodeURIComponent(value)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("검색 요청 실패");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("검색 에러:", error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      setIsSearchDropdownOpen(true);
      fetchSearchResults(value);
    } else {
      setSearchResults([]);
      setIsSearchDropdownOpen(true);
    }
  };

  const handleRecentSearchSelect = (value) => {
    setSearchValue(value);
    setIsSearchDropdownOpen(true);
    fetchSearchResults(value);
  };

  const handleSearchSelect = (result) => {
    const updatedRecentSearches = [result.stadium_name, ...recentSearches]
      .filter((item, index, self) => self.indexOf(item) === index)
      .slice(0, 5);

    setRecentSearches(updatedRecentSearches);
    setSearchValue(result.stadium_name);
    setSearchResults([]);
    setIsSearchDropdownOpen(false);

    if (result.match_id) {
      navigate(`/match/${result.match_id}`);
    } else {
      alert("매치 정보가 없습니다.");
    }
  };

  const handleFocus = () => {
    setIsSearchDropdownOpen(true);

    if (!searchValue) {
      setSearchResults([]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchDropdownOpen(false);
    }, 200);
  };

  const handleNavigation = (path) => {
    if (checkLoginStatus()) {
      navigate(path);
    } else {
      alert("로그인 정보가 필요합니다! 로그인 페이지로 이동합니다.");
      navigate("/auth/login");
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
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
            onClick={() => navigate("/")}
          />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
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
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            {isSearchDropdownOpen && (
              <div className={styles.searchDropdown}>
                {searchValue && searchResults.length > 0 && (
                  <ul>
                    {searchResults.map((result) => (
                      <li
                        key={result.match_id || result.stadium_id}
                        onClick={() => handleSearchSelect(result)}
                        className={styles.resultItem}
                      >
                        <img
                          src={result.photo_path}
                          alt={result.stadium_name}
                          className={styles.resultImage}
                        />
                        <div className={styles.resultInfo}>
                          <h3 className={styles.resultName}>
                            {result.stadium_name}
                          </h3>
                          <p className={styles.resultAddress}>
                            {result.full_address}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {(searchValue && searchResults.length === 0) ||
                (!searchValue && searchResults.length === 0) ? (
                  <div className={styles.noResults}>조회된 결과 없음</div>
                ) : null}
                {!searchValue && recentSearches.length > 0 && (
                  <div>
                    <p className={styles.dropdownTitle}>최근 검색어</p>
                    <ul>
                      {recentSearches.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleRecentSearchSelect(item)}
                          className={styles.resultItem}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          {loggedIn && (
            <>
              {/* <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_club.svg"
                alt="Shield"
                className={styles.icon}
                onClick={() => handleNavigation("/team/dashboard/")}
              /> */}
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_mymatch.svg"
                alt="Calendar"
                className={styles.icon}
                onClick={() => handleNavigation("/mypage/myplab")}
              />
            </>
          )}
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_my.svg"
            alt="Profile"
            className={styles.icon}
            onClick={() => handleNavigation("/mypage/")}
          />
        </div>
      </div>
      {isMenuOpen && <NavbarMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default Navbar;
