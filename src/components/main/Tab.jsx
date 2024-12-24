import React from 'react';
import styles from './Tab.module.css';
import { useNavigate } from 'react-router-dom';

const Tab = () => {
    const navigate = useNavigate();

    const navItems = [
        { imgSrc: "/images/earlybird.png", label: "얼리버드", id: "1" },
        { imgSrc: "/images/gender.png", label: "남녀모두", id: "2" },
        { imgSrc: "/images/female_match.png", label: "여성매치", id: "3" },
        { imgSrc: "/images/amateur1.png", label: "아마추어1", id: "4" },
        { imgSrc: "/images/amateur2.png", label: "아마추어2", id: "5" },
    ];

    const handleNavigation = (id) => {
        navigate(`/explore/${id}/matches`);
    };

    return (
        <nav className={styles.navbar}>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={styles.navbarButton}
                    onClick={() => handleNavigation(item.id)}
                >
                    <img src={item.imgSrc} alt={item.label} className={styles.navbarImage} />
                    <br />
                    <span className={styles.navbarLabel}>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default Tab;
