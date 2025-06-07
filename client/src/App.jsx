import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Hotels, RoomDetails, MyBookings } from "./pages";
import { Navbar, HotelRegister } from "./components";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddRoom from "./pages/Admin/AddRoom";
import ListRoom from "./pages/Admin/ListRoom"

const App = () => {
  const isAdmin = useLocation().pathname.includes("admin");
  return (
    <div>
      {!isAdmin && <Navbar />}
      {false && <HotelRegister />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="add-hotel" element={<AddRoom />}/>
          <Route path="list-hotels" element={<ListRoom />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
