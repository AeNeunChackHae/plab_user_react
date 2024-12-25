import React, { useEffect } from "react";
import Menubar from "../../components/menubar/Menubar";
import Tab from "../../components/main/Tab";
import Banner from "../../components/main/Banner";
import Filters from "../../components/main/Filters";
import DateSelector from "../../components/main/DateSelector";
import MatchList from "../../components/main/MatchList";
import styles from './MainPage.module.css';

const MainPage = () => {
    useEffect(() => {
        // localStorage에서 로그인 정보 가져오기
        const token = localStorage.getItem("authToken");
        const id = localStorage.getItem("id");

        if (token && id) {
            console.log("로그인 사용자 정보:");
            console.log(`토큰: ${token}`);
            console.log(`사용자 이름: ${id}`);
        } else {
            console.log("로그인된 사용자가 없습니다.");
        }
    }, []);

    return (
        <div className={styles.container}>
            <Menubar />
            <Tab />
            <Banner />
            <DateSelector />
            <Filters />
            <MatchList />
        </div>
    );
};

export default MainPage;
