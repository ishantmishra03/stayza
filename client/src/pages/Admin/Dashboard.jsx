import { useEffect, useState } from "react";
import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, getToken, user } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if(data.success){
        setDashboardData({
    bookings: data.bookings,
    totalBookings: data.totalBookings,
    totalRevenue: data.totalRevenue
  });
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(user){
      fetchDashboardData()
    }
  },[])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
        <h1 className="text-3xl md:text-4xl playfair">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl outfit">
          Monitor your room listings, track bookings and analyze all revenue in
          one place
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <div className="flex items-center gap-4 bg-white shadow-md rounded-lg px-6 py-4 border">
          <FaCalendarCheck className="text-2xl text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500 outfit">Total Bookings</p>
            <p className="text-xl font-semibold text-black outfit">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white shadow-md rounded-lg px-6 py-4 border">
          <FaDollarSign className="text-2xl text-green-500" />
          <div>
            <p className="text-sm text-gray-500 outfit">Total Revenue</p>
            <p className="text-xl font-semibold text-black outfit">
              ${dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
        <table className="min-w-full text-sm text-left text-gray-700 outfit">
          <thead className="bg-gray-100 border-b text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Room Type</th>
              <th className="px-4 py-3">Total Amount</th>
              <th className="px-4 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{booking.user.username}</td>
                <td className="px-4 py-4">{booking.room.type}</td>
                <td className="px-4 py-4">${booking.totalPrice}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
