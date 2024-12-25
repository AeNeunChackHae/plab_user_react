import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';

const Main = () => {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    );
  };

export default Main;