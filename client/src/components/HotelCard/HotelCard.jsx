import React from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";  

const HotelCard = ({ room }) => {
  const ratingStars = 4;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl duration-300 max-w-xs w-full">
      <Link to={`/hotels/${room._id}`} onClick={() => scrollTo(0, 0)}>
        <img
        loading="lazy"
          src={room.images[0]}
          alt={room.type}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </Link>

      <div className="p-4 outfit">
        <div className="flex justify-between items-center">
          {/* Hotel Name */}
          <h3 className="text-xl font-semibold text-gray-800">{room.hotel.name}</h3>
          
          {/* Ratings */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={index < ratingStars ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-sm text-gray-600">(4.5)</span>
        </div>

        {/* Location */}
        <div className="flex gap-1 items-center text-sm text-gray-500 mt-2">
          <IoLocationOutline className="w-5 h-5 text-gray-800" />
          <p>{room.hotel.address}</p>
        </div>

        {/* Price and Booking Button */}
        <div className="flex items-center justify-between mt-4 outfit">
          <p className="text-lg font-semibold text-gray-900">
            ${room.pricePerNight}{" "}
            <span className="text-lg font-normal text-gray-500">/ night</span>
          </p>

          <Link
            to={`/hotels/${room._id}`}
            className="bg-gray-700 text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
