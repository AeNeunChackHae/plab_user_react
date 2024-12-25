import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeaguePage from '../pages/league/LeaguePage';

const League = () => {
    return (
      <Routes>
        <Route path="/" element={<LeaguePage />} />
      </Routes>
    );
  };

  export default League;