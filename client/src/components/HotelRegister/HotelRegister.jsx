const HotelRegister = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
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
            <form className="space-y-4 text-sm text-black outfit">
              <div>
                <label className="block mb-1">Hotel Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="Enter hotel name"
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="Street, City, ZIP"
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
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

            <button className="mt-4 text-sm text-gray-500 hover:underline self-end">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelRegister;
