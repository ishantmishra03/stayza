import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const HotelRegister = () => {
  const { setShowHotelReg, axios, getToken, setIsAdmin } = useAppContext();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
      '/api/hotel',
        { name, address, contact, city },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if(data.success){
        toast.success(data.message);
        setIsAdmin(true);
        setShowHotelReg(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      >
        <div className="bg-white w-full max-w-4xl mx-4 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="
              alt="Hotel"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-black playfair">
              Hotel Registration
            </h2>
            <form
              className="space-y-4 text-sm text-black outfit"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-1">Hotel Name</label>
                <input
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="Enter hotel name"
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <input
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="Street, City, ZIP"
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="Enter city"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => setShowHotelReg(false)}
              className="mt-4 text-sm text-gray-500 hover:underline self-end"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelRegister;
