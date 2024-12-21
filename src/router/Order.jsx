import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderPage from "../pages/order/OrderPage";

function Order() {
  return (
    <>
      <Routes>
        <Route path="/:user_id" element={<OrderPage />} />
      </Routes>
    </>
  );
}

export default Order;