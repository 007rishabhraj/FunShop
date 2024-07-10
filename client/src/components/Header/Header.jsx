// import React from "react";
// import "./Header.css";
// const Header = () => {
//   return (
//     <>
//       <div className="header">
//         <img
//           className="logo-img"
//           src="../../../utils/logo.png"
//           alt="img not available"
//         />
//         <div className="input">
//           <input
//             className="input-box"
//             type="text"
//             placeholder="&#xF002; Search for Products..."
//             />
//           <button className="search-btn">Search</button>
//         </div>

//         <div className="options">
//         <p>Home</p>
//         <p>Contact Us</p>
//         <p>Rate us</p>
//         <p>Profile</p>
//         </div>
//       </div>
//       <hr className="line" />
//     </>
//   );
// };

// export default Header;

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";
// import "tailwindcss/tailwind.css";

const Header = () => {
  return (
    <div>
      <header className="bg-white p-4 shadow-md flex items-center font-sans">
        <img src="logo.png" alt="Logo" className="h-10 mr-4" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
        />
        <nav className="flex space-x-4">
          <a href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </a>
          <a href="/contactus" className="text-gray-700 hover:text-blue-500">
            Contact Us
          </a>
          <a
            href="/profile"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            <FaUserCircle className="h-6 w-6" />
          </a>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
