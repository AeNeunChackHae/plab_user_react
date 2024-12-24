import React, { useState, useEffect } from "react";
import ReservationItem from "../../components/rental/ReservationItem";
import Filters from "../../components/rental/Filters";
import styles from './RentalPage.module.css'
import Menubar from "../../components/menubar/Menubar";

const RentalPage = () => {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("모든 지역");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                {
                    location: "서울",
                    name: "서울 강동 송파 풋살장",
                    size: "30x15m · 인조잔디",
                    price: "55,000",
                    img: "/images/field1.jpg",
                    time: [
                        { start: 6, end: 10 }, // 6 AM to 10 AM
                        { start: 18, end: 22 }, // 6 PM to 10 PM
                    ],
                },
                {
                    location: "경기",
                    name: "고양 AoA 풋살 스타디움",
                    size: "30x12m · 인조잔디",
                    price: "50,000~60,000",
                    img: "/images/field2.jpg",
                    time: [
                        { start: 8, end: 12 }, // 8 AM to 12 PM
                        { start: 20, end: 30 }, // 8 PM to 6 AM
                    ],
                },
            ];
            setReservations(data);
            setFilteredReservations(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = reservations;

        if (selectedRegion !== "모든 지역") {
            filtered = filtered.filter((res) => res.location === selectedRegion);
        }

        if (selectedDate) {
            const selectedDay = selectedDate.getDay();
        }

        if (selectedTimes.length > 0) {
            filtered = filtered.filter((res) =>
                res.time.some((t) =>
                    selectedTimes.some((selTime) => {
                        const [start, end] = selTime.split("~").map(Number);
                        return t.start >= start && t.end <= end;
                    })
                )
            );
        }

        setFilteredReservations(filtered);
    }, [selectedRegion, selectedDate, selectedTimes, reservations]);

    return (
        <div className={styles.container}>
            <Menubar />
            <Filters
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTimes={selectedTimes}
                setSelectedTimes={setSelectedTimes}
            />
            {filteredReservations.map((res, index) => (
                <ReservationItem
                    key={index}
                    name={res.name}
                    size={res.size}
                    price={res.price}
                    img={res.img}
                    time={res.time}
                />
            ))}
        </div>
    );
};

export default RentalPage;
