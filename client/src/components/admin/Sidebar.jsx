import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaComments } from "react-icons/fa";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: <FaHome className="text-lg" /> },
  { name: "Add Room", path: "add-room", icon: <FaPlus className="text-lg" /> },
  { name: "List Rooms", path: "list-rooms", icon: <FaComments className="text-lg" /> },
];

const Sidebar = () => {
  return (
    <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 gap-3 transition-colors duration-200 ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                : "hover:bg-gray-100/90 text-gray-700 border-transparent"
            }`
          }
        >
          {item.icon}
          <span className="hidden md:block">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
