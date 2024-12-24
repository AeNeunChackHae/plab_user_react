import React from 'react';
import styles from './Menubar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Menubar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: '소셜매치', path: '/' },
    { name: '팀', path: '/league' },
    { name: '구장 예약', path: '/rental' },
  ];

  return (
    <nav className={styles.menubar}>
      {menuItems.map((item) => (
        <span
          key={item.path}
          className={`${styles.menuItem} ${
            location.pathname === item.path ? styles.active : ''
          }`}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </span>
      ))}
    </nav>
  );
};

export default Menubar;
