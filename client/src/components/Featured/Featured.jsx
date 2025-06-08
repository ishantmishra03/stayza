import React from "react";
import HotelCard from "../HotelCard/HotelCard";
import {useAppContext} from "../../context/AppContext"

const Featured = () => {
  const { rooms } = useAppContext();
  return rooms.length > 0 && (
    <div className="w-full px-4 sm:px-8 lg:px-16 pt-70 pb-15 md:pt-25">
      <div className="text-center mb-12">
        <p className="text-4xl font-serif playfair">Featured Destination</p>
        <p className="pt-3 text-gray-600 max-w-2xl mx-auto font-light outfit">
          Discover our handpicked selection of exceptional properties around the
          world, offering unparalleled luxury and unforgettable experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-5 lg:px-30 place-items-center">
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
