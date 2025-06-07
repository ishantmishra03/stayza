import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components";
import { rooms, amenityIcons } from "../data/data";
import { FaStar, FaFilter } from "react-icons/fa";

const Hotels = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-20 pt-25">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-200"
          >
            <FaFilter className="text-sm" />
            <span className="text-sm font-medium uppercase tracking-wide">
              {showMobileFilter ? "Hide Filters" : "Show Filters"}
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 ">
          {/* Filters */}
          {(showMobileFilter || window.innerWidth >= 1024) && (
            <div className="w-full lg:w-1/4 bg-white border border-gray-200  shadow-sm p-6 outfit">
              <h3 className="text-xl font-semibold text-black mb-5">Filters</h3>
              <form className="space-y-6 text-sm text-gray-800">
                {/* Room Type */}
                <div>
                  <p className="font-semibold mb-3 uppercase text-xs text-gray-500 tracking-wider">
                    Room Type
                  </p>
                  {["Single Bed", "Double Bed", "Luxury Room"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 mb-2 cursor-pointer hover:text-black"
                    >
                      <input
                        type="checkbox"
                        className="accent-black h-4 w-4 border border-gray-300 rounded"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                {/* Price Range */}
                <div>
                  <p className="font-semibold mb-3 uppercase text-xs text-gray-500 tracking-wider">
                    Price Range
                  </p>
                  {["Under $200", "$200–$300", "Above $300"].map(
                    (range, idx) => (
                      <label
                        key={idx}
                        className="flex items-center space-x-2 mb-2 cursor-pointer hover:text-black"
                      >
                        <input
                          type="checkbox"
                          className="accent-black h-4 w-4 border border-gray-300 rounded"
                        />
                        <span>{range}</span>
                      </label>
                    )
                  )}
                </div>

                {/* Sort */}
                <div>
                  <p className="font-semibold mb-3 uppercase text-xs text-gray-500 tracking-wider">
                    Sort By
                  </p>
                  <label className="flex items-center space-x-2 mb-2 cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black h-4 w-4 border border-gray-300 rounded"
                    />
                    <span>Price: Low to High</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black h-4 w-4 border border-gray-300 rounded"
                    />
                    <span>Price: High to Low</span>
                  </label>
                </div>
              </form>
            </div>
          )}

          {/* Hotel Listings */}
          <div className="w-full lg:w-3/4 space-y-10">
            <h1 className="playfair text-3xl">Hotel Rooms</h1>
            {rooms.map((room) => (
              <div key={room._id}>
                <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl overflow-hidden  cursor-pointer">
                  {/* Image */}
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    loading="lazy"
                    className="w-full md:w-1/3 h-60 object-cover cursor-pointer rounded-xl"
                  />

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 cursor-pointer playfair">
                        {room.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 outfit">
                        {room.location}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3 outfit">
                        {room.amenities.map((tag, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-1 bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                          >
                            {amenityIcons[tag]} {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between outfit">
                      <div>
                        <p className="text-lg font-semibold text-black">
                          ${room.pricePerNight}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            / night
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <FaStar className="text-yellow-500" />{" "}
                          {room.rating.toFixed(1)}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/hotels/${room._id}`)}
                        className="mt-3 sm:mt-0 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="my-6 border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <Footer className="pt-15" />
      </div>
    </>
  );
};

export default Hotels;
