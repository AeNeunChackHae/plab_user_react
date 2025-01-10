import React, { useState, useEffect } from "react";
// import Menubar from "../../components/menubar/Menubar";
import Tab from "../../components/main/Tab";
import Banner from "../../components/main/Banner";
import Filters from "../../components/main/Filters";
import DateSelector from "../../components/main/DateSelector";
import MatchList from "../../components/main/MatchList";
import styles from './MainPage.module.css';

const MainPage = () => {
    const [selectedDate, setSelectedDate] = useState(''); // 날짜 필터
    const [filters, setFilters] = useState({
        region: [],
        gender: [],
        level: [],
    }); // 필터 (지역, 성별, 레벨)
    const [matches, setMatches] = useState([]); // 매치 리스트 데이터

    // 메인 페이지로 돌아올 때 날짜 초기화
    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
        setSelectedDate(formattedToday);
    }, []);

    // 데이터 요청
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                console.log('Fetching matches with:', { selectedDate, filters });

                const response = await fetch('http://localhost:8080/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: selectedDate,
                        region: filters.region,
                        gender: filters.gender,
                        level: filters.level,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched Matches:', data);
                setMatches(data.matches);
            } catch (error) {
                console.error('Failed to fetch matches:', error);
            }
        };

        if (selectedDate) {
            fetchMatches();
        }
    }, [selectedDate, filters]);

    return (
        <div className={styles.container}>
            {/* <Menubar /> */}
            <Tab />
            <Banner />
            <DateSelector onDateSelect={setSelectedDate} />
            <Filters onFilterChange={setFilters} />
            <MatchList matches={matches} />
        </div>
    );
};

export default MainPage;
