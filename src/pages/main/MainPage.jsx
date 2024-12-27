import React from "react";
import Menubar from "../../components/menubar/Menubar";
import Tab from "../../components/main/Tab";
import Banner from "../../components/main/Banner";
import Filters from "../../components/main/Filters";
import DateSelector from "../../components/main/DateSelector";
import MatchList from "../../components/main/MatchList";
import styles from './MainPage.module.css';

const MainPage = () => {
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
