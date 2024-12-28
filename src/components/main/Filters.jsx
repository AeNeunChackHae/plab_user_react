import React, { useState } from "react";
import Modal from "./Modal";
import styles from "./Filters.module.css";

// 필터 옵션
const REGION_OPTIONS = [
    { code: 0, name: "서울" },
    { code: 1, name: "부산" },
    { code: 2, name: "대구" },
    { code: 3, name: "인천" },
    { code: 4, name: "광주" },
    { code: 5, name: "대전" },
    { code: 6, name: "울산" },
    { code: 7, name: "세종" },
    { code: 8, name: "경기" },
    { code: 9, name: "강원" },
    { code: 10, name: "충북" },
    { code: 11, name: "충남" },
    { code: 12, name: "전북" },
    { code: 13, name: "전남" },
    { code: 14, name: "경북" },
    { code: 15, name: "경남" },
    { code: 16, name: "제주" },
];

const GENDER_OPTIONS = [
    { code: 0, name: "남자" },
    { code: 1, name: "여자" },
    { code: 2, name: "남녀 모두" },
];

const LEVEL_OPTIONS = [
    { code: 0, name: "일반" },
    { code: 1, name: "아마추어1 이하" },
    { code: 2, name: "아마추어2 이상" },
];

const Filters = ({ onFilterChange }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        region: [],
        gender: [],
        level: [],
    });

    // 모달 열기 및 닫기
    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (key, value) => {
        setSelectedFilters((prev) => {
            const updatedFilters = prev[key].includes(value)
                ? prev[key].filter((item) => item !== value)
                : [...prev[key], value];
            return { ...prev, [key]: updatedFilters };
        });
    };

    // 필터 적용하기
    const applyFilters = () => {
        onFilterChange(selectedFilters); // 숫자 코드 값 전달
        closeModal();
    };

    return (
        <div className={styles.filters}>
            {/* 지역 필터 버튼 */}
            <button
                className={`${styles.filterButton} ${
                    selectedFilters.region.length > 0 ? styles.selected : ""
                }`}
                onClick={() => openModal("region")}
            >
                {selectedFilters.region.length > 0
                    ? selectedFilters.region.map((code) => REGION_OPTIONS.find((r) => r.code === code)?.name).join(", ")
                    : "모든 지역"}
            </button>

            {/* 성별 필터 버튼 */}
            <button
                className={`${styles.filterButton} ${
                    selectedFilters.gender.length > 0 ? styles.selected : ""
                }`}
                onClick={() => openModal("gender")}
            >
                {selectedFilters.gender.length > 0
                    ? selectedFilters.gender.map((code) => GENDER_OPTIONS.find((g) => g.code === code)?.name).join(", ")
                    : "성별"}
            </button>

            {/* 레벨 필터 버튼 */}
            <button
                className={`${styles.filterButton} ${
                    selectedFilters.level.length > 0 ? styles.selected : ""
                }`}
                onClick={() => openModal("level")}
            >
                {selectedFilters.level.length > 0
                    ? selectedFilters.level.map((code) => LEVEL_OPTIONS.find((l) => l.code === code)?.name).join(", ")
                    : "레벨"}
            </button>

            {/* 지역 모달 */}
            {activeModal === "region" && (
                <Modal title="지역" onClose={closeModal}>
                    <div className={styles.scrollContainer}>
                        {REGION_OPTIONS.map((region) => (
                            <label key={region.code} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.region.includes(region.code)}
                                    onChange={() => handleCheckboxChange("region", region.code)}
                                />
                                {region.name}
                            </label>
                        ))}
                    </div>
                    <button className={styles.applyButton} onClick={applyFilters}>
                        적용하기
                    </button>
                </Modal>
            )}

            {/* 성별 모달 */}
            {activeModal === "gender" && (
                <Modal title="성별" onClose={closeModal}>
                    <div className={styles.scrollContainer}>
                        {GENDER_OPTIONS.map((gender) => (
                            <label key={gender.code} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.gender.includes(gender.code)}
                                    onChange={() => handleCheckboxChange("gender", gender.code)}
                                />
                                {gender.name}
                            </label>
                        ))}
                    </div>
                    <button className={styles.applyButton} onClick={applyFilters}>
                        적용하기
                    </button>
                </Modal>
            )}

            {/* 레벨 모달 */}
            {activeModal === "level" && (
                <Modal title="레벨" onClose={closeModal}>
                    <div className={styles.scrollContainer}>
                        {LEVEL_OPTIONS.map((level) => (
                            <label key={level.code} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.level.includes(level.code)}
                                    onChange={() => handleCheckboxChange("level", level.code)}
                                />
                                {level.name}
                            </label>
                        ))}
                    </div>
                    <button className={styles.applyButton} onClick={applyFilters}>
                        적용하기
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default Filters;
