import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();
  const [loading, setLoading] = useState(false);

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

  const resetForm = () => {
    setInputs({
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

    setImages({
      1: null,
      2: null,
      3: null,
      4: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.type || !inputs.pricePerNight) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("type", inputs.type);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const { data } = await axios.post(
        "/api/room",
         formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold playfair">
          Add Hotel
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-2 outfit">
          Fill in the details to add a new hotel room.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Room Type</label>
          <input
            type="text"
            name="type"
            value={inputs.type}
            onChange={handleInputChange}
            placeholder="e.g. Luxury Room"
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Price Per Night */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Per Night ($)
          </label>
          <input
            type="number"
            name="pricePerNight"
            value={inputs.pricePerNight}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Amenities */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.keys(inputs.amenities).map((amenity) => (
              <label key={amenity} className="flex items-center text-sm gap-2">
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

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Room Images (max 4)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col gap-1">
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  onChange={(e) => handleImageChange(e, index)}
                  className="text-sm"
                />
                {images[index] && (
                  <span className="text-xs text-gray-600 break-all">
                    {images[index].name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading || !inputs.type || !inputs.pricePerNight}
            className={`px-6 py-2 text-white rounded-md outfit ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Submitting..." : "Submit Hotel"}
          </button>
          {/* <button
            type="button"
            onClick={() => {
              const formData = new FormData();
              formData.append("type", inputs.type);
              formData.append("pricePerNight", inputs.pricePerNight);
              const amenities = Object.keys(inputs.amenities).filter(
                (k) => inputs.amenities[k]
              );
              formData.append("amenities", JSON.stringify(amenities));
              Object.keys(images).forEach((key) => {
                if (images[key]) formData.append("images", images[key]);
              });
              for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
              }
            }}
          >
            Debug FormData
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
