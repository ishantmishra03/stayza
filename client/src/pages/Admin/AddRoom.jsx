import React, { useState } from "react";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    type: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Pool Access": false,
      "Room Service": false,
      "Mountain View": false,
      "Free Breakfast": false,
    },
  });

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    setImages((prev) => ({ ...prev, [index]: file }));
  };

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAmenityToggle = (amenity) => {
    setInputs((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl playfair font-semibold">Add Hotel</h1>
        <p className="text-gray-500 text-sm md:text-base mt-2 outfit">
          Fill in the details to add a new hotel room.
        </p>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hotel Type */}
        <div>
          <label className="block text-sm mb-2 outfit">Room Type</label>
          <input
            type="text"
            name="type"
            value={inputs.type}
            onChange={handleInputChange}
            placeholder="e.g. Luxury Room"
            className="w-full border px-4 py-2 rounded-md outline-none"
          />
        </div>

        {/* Price Per Night */}
        <div>
          <label className="block text-sm mb-2 outfit">Price Per Night ($)</label>
          <input
            type="number"
            name="pricePerNight"
            value={inputs.pricePerNight}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md outline-none"
          />
        </div>

        {/* Amenities */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2 outfit">Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.keys(inputs.amenities).map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={inputs.amenities[amenity]}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Image Uploads */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2 outfit">Room Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="block text-xs"
                />
                {images[index] && (
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt="Preview"
                    className="mt-2 w-full h-28 object-cover rounded shadow"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 outfit"
          >
            Submit Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
