import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RentalPage from '../pages/rental/RentalPage';

const Rental = () => {
    return (
      <Routes>
        <Route path="/" element={<RentalPage />} />
      </Routes>
    );
  };

export default Rental;