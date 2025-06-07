import React, { useState, useEffect } from "react";
import { rooms as dummyRooms } from "../../data/data";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(dummyRooms);
  }, []);

  const toggleAvailability = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room._id === id ? { ...room, isAvailable: !room.isAvailable } : room
      )
    );

  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left mb-6">
        <h1 className="text-3xl md:text-4xl playfair font-semibold">Hotel Lists</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl outfit">
          Monitor your room listings, track bookings and manage availability.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
        <table className="min-w-full text-sm text-left text-gray-700 outfit">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Facilities</th>
              <th className="px-4 py-3">Price/Night</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{room.name}</td>
                <td className="px-4 py-4">
                  <ul className="list-disc ml-4 space-y-1 text-xs">
                    {room.amenities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4">${room.pricePerNight}</td>
                <td className="px-4 py-4">
                  <label className="inline-flex place-items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={room.isAvailable}
                      onChange={() => toggleAvailability(room._id)}
                    />
                    <div
                      className={`w-10 h-5 bg-gray-300 rounded-full shadow-inner transition duration-300 ease-in-out ${
                        room.isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          room.isAvailable ? "translate-x-5" : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
                <td className="px-4 py-4 flex items-center gap-3 text-gray-500 text-base">
                  <FaTrash className="hover:text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
