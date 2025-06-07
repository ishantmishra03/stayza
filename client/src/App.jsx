import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Hotels, RoomDetails, MyBookings } from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
};

export default App;
