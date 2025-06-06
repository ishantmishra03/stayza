import React from "react";
import HotelCard from "../HotelCard/HotelCard";

const rooms = [
  {
    _id: "176278261",
    name: "Urbanza Suites",
    image:
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/qsj8vz0bptxfirwamtx5.png",
    location: "Main Road 123 Street, 23 Colony",
    pricePerNight: 299,
    rating: 4.5,
  },
  {
    _id: "1762782612",
    name: "Skyline Inn",
    image:
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/qsj8vz0bptxfirwamtx5.png",
    location: "Central Ave, Downtown",
    pricePerNight: 219,
    rating: 4.3,
  },
  {
    _id: "17627826122",
    name: "Coastal Escape",
    image:
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/qsj8vz0bptxfirwamtx5.png",
    location: "Beachside Blvd, Oceanview",
    pricePerNight: 349,
    rating: 4.7,
  },
  {
    _id: "17627826123",
    name: "Mountain Retreat",
    image:
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/qsj8vz0bptxfirwamtx5.png",
    location: "Hilltop Heights",
    pricePerNight: 189,
    rating: 4.2,
  },
];

const Featured = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-70 md:py-25">
      <div className="text-center mb-12">
        <p className="text-4xl font-serif">Featured Destination</p>
        <p className="pt-3 text-gray-600 max-w-2xl mx-auto font-light">
          Discover our handpicked selection of exceptional properties around the
          world, offering unparalleled luxury and unforgettable experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-5 lg:px-30">
        {rooms.map((room, index) => {
          const isLast = index === rooms.length - 1;
          const isOddOut = rooms.length % 3 === 1 && isLast;

          return (
            <div key={room._id} className={isOddOut ? "xl:col-start-2" : ""}>
              <HotelCard room={room} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
