import React from 'react';
import Menubar from '../../components/menubar/Menubar';
import Banner from '../../components/league/Banner';
import Tabs from '../../components/league/Tabs'
import matches from '../../components/dummyData/matches.json'
import styles from "./LeaguePage.module.css"

const LeaguePage = () => {
  return (
    <div className={styles.container}>
        <Menubar />
        <Banner />
        <Tabs matches={matches} />
    </div>
  );
};

export default LeaguePage;
