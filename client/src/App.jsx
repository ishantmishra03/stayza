import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Hotels, RoomDetails, MyBookings } from "./pages";
import { Navbar, HotelRegister, Loader } from "./components";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddRoom from "./pages/Admin/AddRoom";
import ListRoom from "./pages/Admin/ListRoom";
import { Toaster } from "react-hot-toast";
import {useAppContext} from "./context/AppContext"

const App = () => {
  const isAdmin = useLocation().pathname.includes("admin");
  const { showHotelReg } = useAppContext();
  return (
    <div>
      {!isAdmin && <Navbar />}
      {showHotelReg && <HotelRegister />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loader/:nextUrl" element={<Loader />} />

        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="add-room" element={<AddRoom />}/>
          <Route path="list-rooms" element={<ListRoom />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
