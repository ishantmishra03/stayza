import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaRegBuilding, FaHotel } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { isAdmin, setShowHotelReg } = useAppContext();
  const navLinks = [
    { name: "Home", path: "/", icon: <FaRegBuilding /> },
    { name: "Hotels", path: "/hotels", icon: <FaHotel /> },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the current path contains 'hotel'
  const isHotelPage = location.pathname.includes("hotel");
  const isBookingPage = location.pathname.includes("my-bookings");

  // Dynamic navbar styles based on URL
  const navBg =
    isHotelPage || isBookingPage
      ? "bg-white shadow-md"
      : isScrolled
      ? "bg-white/80 shadow-md backdrop-blur-sm"
      : "bg-transparent";
  const textColor =
    isHotelPage || isBookingPage
      ? "text-black"
      : isScrolled
      ? "text-black"
      : "text-white";
  const iconColor =
    isHotelPage || isBookingPage
      ? "text-black"
      : isScrolled
      ? "text-black"
      : "text-white";
  const borderColor = isScrolled ? "border-black" : "border-white";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-16 lg:px-24 xl:px-32 ${navBg}`}
    >
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="logo" className="h-9" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`group flex items-center gap-2 ${textColor} transition`}
            >
              {link.icon}
              <span>{link.name}</span>
              <span className="block h-0.5 bg-current w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {user && (
            <button
              onClick={() => isAdmin ? navigate("/admin"): setShowHotelReg(true)}
              className={`border px-4 py-1 rounded-full text-sm cursor-pointer transition ${borderColor} ${textColor} hover:bg-white/20`}
            >
              {isAdmin ? "Dashboard" : "List your Hotel"}
            </button>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <FiSearch className={`h-6 w-6 ${iconColor}`} />
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TbBrandBooking />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-slate-900 transition cursor-pointer"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TbBrandBooking />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <button onClick={() => setIsMenuOpen(true)} aria-label="Open Menu">
            <FiMenu className={`h-7 w-7 ${iconColor}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen text-gray-800 flex flex-col items-center justify-center gap-6 transition-transform duration-500 z-50 bg-white/90 background-blur-xl
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 text-black"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close Menu"
        >
          <FiX className="h-7 w-7" />
        </button>

        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-lg hover:text-blue-600 transition"
          >
            {link.icon}
            {link.name}
          </Link>
        ))}

        <div className="hidden lg:block">
          {user && (
            <button
              onClick={() => isAdmin ? navigate("/admin"): setShowHotelReg(true)}
              className={`border px-4 py-1 rounded-full text-sm cursor-pointer transition ${borderColor} ${textColor} hover:bg-white/20`}
            >
              {isAdmin ? "Dashboard" : "List your Hotel"}
            </button>
          )}
        </div>

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
