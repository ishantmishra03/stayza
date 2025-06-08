import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Footer } from "../components";
import {
  FaLocationArrow,
  FaStar,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";
import { amenityIcons } from "../data/data";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { rooms, axios, getToken } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // Find room on mount
  useEffect(() => {
    const foundRoom = rooms.find((room) => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images?.[0]);
    }
  }, [id, rooms]);

  // Check availability
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }

    if (new Date(checkInDate) > new Date(checkOutDate)) {
      toast.error("Check-in date must be before check-out date.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/bookings/check-availability",
        { room: id, checkInDate, checkOutDate },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setIsAvailable(true);
        toast.success("Room is available.");
      } else {
        setIsAvailable(false);
        toast.error(data.message || "Room not available.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to check availability.";
      toast.error(message);
    }
  };

  // Book room
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate || !guests) {
      toast.error("Please complete all booking details.");
      return;
    }

    if (guests < 1 || guests > 4) {
      toast.error("Guests must be between 1 and 4.");
      return;
    }

    if (!isAvailable) {
      return checkAvailability();
    }

    try {
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "Pay At Hotel",
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Booking successful!");
        navigate("/my-bookings");
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message || "Booking failed. Try again.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Booking request failed.";
      toast.error(message);
    }
  };

  if (!room) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm tracking-widest text-gray-700 uppercase">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32 outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h1 className="text-3xl md:text-4xl playfair">
            {room.hotel.name}{" "}
            <span className="text-base font-light outfit">({room.type})</span>
          </h1>
          <span className="bg-orange-500 text-white rounded-full px-3 py-1.5 text-xs max-w-fit outfit">
            20% OFF
          </span>
        </div>

        {/* Ratings & Location */}
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 outfit">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            {room.rating} <span className="ml-1 text-xs">(300+ Reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <FaLocationArrow />
            <span>{room.hotel.address}</span>
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              loading="lazy"
              src={mainImage}
              alt="Main room"
              className="w-full h-full rounded-xl shadow-lg object-cover max-h-[500px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images?.length > 1 &&
              room.images.map((image, index) => (
                <img
                  loading="lazy"
                  key={index}
                  src={image}
                  alt={`Room preview ${index + 1}`}
                  onClick={() => setMainImage(image)}
                  className={`w-full h-32 object-cover rounded-lg shadow-md cursor-pointer transition duration-200 hover:opacity-80 ${
                    mainImage === image ? "ring-4 ring-orange-500" : ""
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Highlights & Pricing */}
        <div className="flex flex-col md:flex-row justify-between mt-10 gap-8 outfit">
          <div>
            <h2 className="text-2xl md:text-3xl outfit mb-4">
              Experience Luxury like Never Before
            </h2>
            <div className="flex flex-wrap gap-3">
              {room.amenities?.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                >
                  {amenityIcons[tag]} {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="text-2xl font-semibold text-right">
            ${room.pricePerNight}/night
          </div>
        </div>

        {/* Booking Form */}
        <form
          className="bg-white text-gray-700 rounded-lg px-6 py-6 mt-10 shadow-xl border border-black/10 grid gap-6 md:grid-cols-5"
          onSubmit={onSubmit}
        >
          {/* Check-in */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium flex items-center gap-2">
              <FaCalendarAlt /> Check-in
            </label>
            <input
              id="checkInDate"
              name="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              className="border border-gray-200 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium flex items-center gap-2">
              <FaCalendarAlt /> Check-out
            </label>
            <input
              id="checkOutDate"
              name="checkOutDate"
              value={checkOutDate}
              disabled={!checkInDate}
              min={checkInDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              type="date"
              className="border border-gray-200 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label htmlFor="guests" className="mb-1 font-medium">
              Guests
            </label>
            <input
              id="guests"
              value={guests}
              name="guests"
              onChange={(e) => setGuests(e.target.value)}
              type="number"
              min="1"
              max="4"
              placeholder="1"
              className="border border-gray-200 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="col-span-full md:col-auto self-end bg-black text-white flex items-center justify-center gap-2 px-10 py-2 rounded-md hover:bg-gray-800 transition"
          >
            <FaSearch />
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>
      </div>
      <div className="pt-15 bg-gray-100 w-full">
        <Footer />
      </div>
    </>
  );
};

export default RoomDetails;
