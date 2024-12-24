import React, { useState } from "react";
import styles from "./Filters.module.css";
import Modal from "./Modal";

const Filters = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    return (
        <div className={styles.filters}>
            <button className={styles.filterButton} onClick={() => openModal("Local")}>
                모든 지역
            </button>
            <button className={styles.filterButton} onClick={() => openModal("Gender")}>
                성별
            </button>
            <button className={styles.filterButton} onClick={() => openModal("Level")}>
                레벨
            </button>

            {/* 모달 컴포넌트 */}
            {activeModal === "Local" && (
                <Modal title="지역" onClose={closeModal}>
                    <div className={styles.modalContent}>
                        <ul>
                            <li>모든 지역</li>
                            <li>서울</li>
                            <li>경기</li>
                            <li>인천</li>
                            <li>강원</li>
                            <li>대전/세종</li>
                            <li>충남</li>
                            <li>충북</li>
                            <li>대구</li>
                            <li>경북</li>
                            <li>부산</li>
                            <li>울산</li>
                            <li>경남</li>
                        </ul>
                    </div>
                </Modal>
            )}


            {activeModal === "Gender" && (
                <Modal title="성별" onClose={closeModal}>
                    <div>
                        <ul>
                            <label for="male">
                                <li>
                                    <input type="checkbox" id="male" /> 남자
                                </li>
                            </label>
                            <label for="female">
                                <li>
                                    <input type="checkbox" id="female" /> 여자
                                </li>
                            </label>
                            <label id="both">
                                <li>
                                    <input type="checkbox" id="both" /> 남녀 모두
                                </li>
                            </label>
                        </ul>
                        <button className={styles.applyButton}>적용하기</button>
                    </div>
                </Modal>
            )}

            {activeModal === "Level" && (
                <Modal title="레벨" onClose={closeModal}>
                    <div>
                        <ul>
                            <label for="amateur1">
                                <li>
                                    <input type="checkbox" id="amateur1" /> 아마추어1 이하
                                </li>
                            </label>
                            <label for="amateur2">
                                <li>
                                    <input type="checkbox" id="amateur2" /> 아마추어2 이상
                                </li>
                            </label>
                            <label for="general">
                                <li>
                                    <input type="checkbox" id="general" /> 일반
                                </li>
                            </label>
                        </ul>
                        <button className={styles.applyButton}>적용하기</button>
                        
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Filters;
