import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";
import {useAppContext} from "../../context/AppContext"
import toast from "react-hot-toast";

const cities = ["Delhi", "Mumbai", "Chennai", "Banglore"]

const Hero = () => {
  const {navigate} = useAppContext();
  const [destination, setDestination] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      navigate(`/hotels/?destination=${destination}`)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="pt-32 px-6 md:pt-40 md:px-15 max-w-screen-xl mx-auto">
      {/* Title Section */}
      <div className="text-white bg-blue-300/40 backdrop-blur-xl px-4 py-2 rounded-full text-sm md:text-xl  shadow-lg max-w-fit mb-6 outfit">
        Where Elegance Meets Comfort
      </div>
      <p className="text-3xl px-2 md:px-0 md:text-5xl text-white md:max-w-3xl mt-6 font-bold leading-tight tracking-wide playfair">
        Experience the Perfect Blend of Elegance, Comfort, and Style
      </p>
      <p className="text-sm px-4 md:px-0 text-white md:max-w-4xl mt-4 md:text-lg font-medium leading-relaxed outfit">
        Indulge in extraordinary luxury and comfort at the world's premier destinations. Begin your adventure now.
      </p>

      {/* Form Section */}
      <form onSubmit={onSubmit} className="bg-white text-gray-500 rounded-lg px-6 py-6 flex flex-col md:flex-row md:gap-6 mt-8 shadow-lg outfit">
        {/* Destination Input */}
        <div className="flex flex-col w-full md:w-1/4">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="w-4 h-4 text-gray-900" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            name='destination'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="rounded border border-gray-200 px-3 py-2 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city,index) => (
                <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check-in Date */}
        <div className="flex flex-col w-full md:w-1/4">
          <div className="flex items-center gap-2 mb-2">
            <FaCalendarAlt className="w-4 h-4 text-gray-900" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col w-full md:w-1/4">
          <div className="flex items-center gap-2 mb-2">
            <FaCalendarAlt className="w-4 h-4 text-gray-900" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Guests Input */}
        <div className="flex flex-col w-full md:w-1/4">
          <div className="mb-2">
            <label htmlFor="guests">Guests</label>
          </div>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-2 text-sm outline-none max-w-16 placeholder-gray-500"
            placeholder="0"
          />
        </div>

        {/* Submit Button */}
        <button className="flex items-center justify-center gap-2 rounded-md bg-black py-2 px-6 text-white mt-6 md:mt-0 cursor-pointer">
          <FaSearch className="w-4 h-4 text-white" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
