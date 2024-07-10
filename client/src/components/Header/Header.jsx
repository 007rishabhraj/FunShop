import { FaUserCircle } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Header = () => {
  const location = useLocation();
  const hideSearchBar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <header className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-8">
          <img src="logo.png" alt="Logo" className="h-10" />
          <div className="space-x-4">
            <a href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </a>
            <a href="/contactus" className="text-gray-700 hover:text-blue-500">
              Contact Us
            </a>
          </div>
        </div>
        {!hideSearchBar && (
          <input
            type="text"
            placeholder="Search..."
            className="w-72 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <a
          href="/profile"
          className="text-gray-700 hover:text-blue-500 flex items-center "
        >
          <FaUserCircle className="h-6 w-6" />
        </a>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
