import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const {data} = await axios.post(
        "/api/bookings/stripe-payment",
        { bookingId },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if(data.success){
        window.location.href= data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
        <h1 className="text-4xl md:text-[40px] playfair">My Bookings</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl outfit">
          Easily manage your past, current, and upcoming hotel reservations in
          one place. Plan your trips seamlessly with just a few clicks.
        </p>
      </div>

      <div className="max-w-6xl mt-10 w-full text-gray-800">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 outfit">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking Entries */}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-200 py-6 first:border-t"
          >
            {/* Hotel Details */}
            <div className="flex gap-4">
              <img
                src={booking.room.images[0]}
                alt="Hotel"
                className="w-32 h-24 rounded shadow object-cover"
              />
              <div className="flex flex-col justify-between">
                <p className="playfair text-lg md:text-xl leading-snug">
                  {booking.hotel.name}
                  <span className="outfit text-sm font-normal ml-1">
                    ({booking.room.type})
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 outfit">
                  <FaLocationArrow className="text-xs" />
                  <span>{booking.hotel.address}</span>
                </div>
                <p className="text-sm text-gray-500 outfit">
                  Guests: <span className="font-medium">{booking.guests}</span>
                </p>
                <p className="text-base font-semibold outfit">
                  Total: ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Date & Timings */}

            <div className="mt-4 md:mt-0 flex flex-col justify-center text-sm text-gray-600 outfit">
              <p>
                <strong>Check-in:</strong>{" "}
                {new Date(booking.checkInDate).toDateString()}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {new Date(booking.checkOutDate).toDateString()}
              </p>
            </div>

            {/* Payment Status */}
            <div className="mt-4 md:mt-0 flex flex-col gap-1 items-center justify-start md:justify-center outfit">
              <span
                className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                  booking.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.isPaid ? "Paid" : "Unpaid"}
              </span>
              {!booking.isPaid && (
                <button onClick={()=>handlePayment(booking._id)} className="px-3 py-1.5 rounded-full bg-gray-100 text-black outfit text-xs cursor-pointer">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
