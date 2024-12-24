import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialmatchPage from '../pages/explore/SocialmatchPage';

const Explore = () => {
    return (
      <Routes>
        <Route path="/:id/matches" element={<SocialmatchPage />} />
      </Routes>
    );
  };

export default Explore;