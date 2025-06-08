import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaStar, FaFilter } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { Footer } from "../components";
import { amenityIcons } from "../data/data";

const ROOM_TYPES = ["Single Bed", "Double Bed", "Luxury Room"];
const PRICE_RANGES = ["0 to 200", "200 to 300", "300 to 1000"];
const SORT_OPTIONS = ["Price: Low to High", "Price: High to Low"];

const Hotels = () => {
  const { rooms, user } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    roomTypes: [],
    priceRanges: [],
  });

  const [sortOption, setSortOption] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (checked, type, value) => {
    setFilters((prev) => {
      const updated = new Set(prev[type]);
      checked ? updated.add(value) : updated.delete(value);
      return { ...prev, [type]: Array.from(updated) };
    });
  };

  const handleSortChange = (value) => setSortOption(value);

  const filteredRooms = useMemo(() => {
    let result = [...rooms];

    // Room types
    if (filters.roomTypes.length) {
      result = result.filter((room) => filters.roomTypes.includes(room.type));
    }

    // Price ranges
    if (filters.priceRanges.length) {
      result = result.filter((room) =>
        filters.priceRanges.some((range) => {
          const [min, max] = range.split(" to ").map(Number);
          return room.pricePerNight >= min && room.pricePerNight <= max;
        })
      );
    }

    // Destination
    const destination = searchParams.get("destination")?.toLowerCase();
    if (destination) {
      result = result.filter((room) =>
        room.hotel.city.toLowerCase().includes(destination)
      );
    }

    // Sorting
    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return result;
  }, [rooms, filters, sortOption, searchParams]);

  if (!user) {
    return (
      <div className="px-4 py-20 text-center text-lg text-gray-700">
        Please log in to view available hotel rooms.
      </div>
    );
  }

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

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          {(showMobileFilter || isDesktop) && (
            <div className="w-full lg:w-1/4 bg-white border border-gray-200 shadow-sm p-6 outfit">
              <h3 className="text-xl font-semibold text-black mb-5">Filters</h3>
              <form className="space-y-6 text-sm text-gray-800">
                {/* Room Type */}
                <div>
                  <p className="font-semibold mb-3 uppercase text-xs text-gray-500 tracking-wider">
                    Room Type
                  </p>
                  {ROOM_TYPES.map((type) => (
                    <label key={type} className="flex items-center space-x-2 mb-2 cursor-pointer hover:text-black">
                      <input
                        type="checkbox"
                        checked={filters.roomTypes.includes(type)}
                        onChange={(e) => handleFilterChange(e.target.checked, "roomTypes", type)}
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
                  {PRICE_RANGES.map((range) => (
                    <label key={range} className="flex items-center space-x-2 mb-2 cursor-pointer hover:text-black">
                      <input
                        type="checkbox"
                        checked={filters.priceRanges.includes(range)}
                        onChange={(e) => handleFilterChange(e.target.checked, "priceRanges", range)}
                        className="accent-black h-4 w-4 border border-gray-300 rounded"
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>

                {/* Sort By */}
                <div>
                  <p className="font-semibold mb-3 uppercase text-xs text-gray-500 tracking-wider">
                    Sort By
                  </p>
                  {SORT_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="sort"
                        checked={sortOption === option}
                        onChange={() => handleSortChange(option)}
                        className="accent-black h-4 w-4 border border-gray-300 rounded"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </form>
            </div>
          )}

          {/* Hotel Listings */}
          <div className="w-full lg:w-3/4 space-y-10">
            <h1 className="playfair text-3xl">Hotel Rooms</h1>
            {filteredRooms.length === 0 ? (
              <p className="text-gray-600">No rooms match your filters.</p>
            ) : (
              filteredRooms.map((room) => (
                <div key={room._id}>
                  <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl overflow-hidden cursor-pointer">
                    <img
                      src={room.images[0]}
                      alt={room.hotel.name}
                      loading="lazy"
                      className="w-full md:w-1/3 h-60 object-cover cursor-pointer rounded-xl"
                    />
                    <div className="p-5 flex flex-col justify-between w-full">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 cursor-pointer playfair">
                          {room.hotel.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 outfit">
                          {room.hotel.address}
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
                            <span className="text-sm font-normal text-gray-500"> / night</span>
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <FaStar className="text-yellow-500" /> {room.rating}
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
              ))
            )}
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
