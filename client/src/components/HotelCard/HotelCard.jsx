import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl duration-300">
      <Link to={`/hotels/${room._id}`} onClick={() => scrollTo(0, 0)}>
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
        <p className="text-sm text-gray-500">{room.location}</p>

        <div className="flex items-center mt-2">
          {/* ⭐⭐⭐⭐☆ */}
          <div className="text-yellow-400 text-sm mr-2">
            {"★".repeat(Math.floor(room.rating)) +
              "☆".repeat(5 - Math.floor(room.rating))}
          </div>
          <span className="text-sm text-gray-600">({room.rating.toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-indigo-600">
            ${room.pricePerNight} <span className="text-sm font-normal text-gray-500">/ night</span>
          </p>

          <Link
            to={`/hotels/${room._id}`}
            className="bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
