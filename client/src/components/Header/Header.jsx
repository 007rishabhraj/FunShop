import { FaUserCircle } from 'react-icons/fa';
import { Outlet, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import { useState, useRef, useEffect } from 'react';
import DropDown from '../DropDown';

const Header = () => {
  const location = useLocation();
  const hideSearchBar =
    location.pathname === '/login' || location.pathname === '/signup';
  const hideCart =
    location.pathname === '/login' || location.pathname === '/signup';
  // return (
  //   <div>
  //     <header className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
  //       <div className="flex items-center space-x-8">
  //         <img src="/logo.png" alt="Logo" className="h-12 ml-6"/>
  //         <div className="space-x-6">
  //           <a href="/" className="text-gray-700 hover:text-blue-500">
  //             Home
  //           </a>
  //           <a href="/Contact Us" className="text-gray-700 hover:text-blue-500">
  //             Contact Us
  //           </a>
  //         </div>
  //       </div>
  //       {!hideSearchBar && (
  //         <input
  //           type="text"
  //           placeholder="Search FunShop..."
  //           className="w-[25vw] lg:w-[30vw] p-2 border-2 border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  //         />
  //       )}
  //       <div className="flex justify-between mt-3 sm:w-[15vw] md:w-[10vw] lg:w-[8vw]">
  //         {!hideCart && (
  //           <a href="/cart" className="hover:text-blue-500">
  //             <FaShoppingCart className="text-3xl " />
  // <div className="relative -top-9 -right-6 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
  //   3
  // </div>
  //           </a>
  //         )}
  //         <a
  //           href="/account"
  //           className="text-gray-700 hover:text-custom-blue "
  //         >
  //           <FaUserCircle className="text-3xl" />
  //         </a>
  //       </div>
  //     </header>
  //     <Outlet />
  //   </div>
  // );
  const [isOpen, setIsOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  let iconRef = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!iconRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  });
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <img className="h-10 w-auto" src="/logo.png" alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"
              >
                Products
              </a>
            </div>
          </div>
          <div className="my-auto">
            <input
              type="text"
              placeholder="Search FunShop..."
              className="w-[40vw] sm:w-[30vw] px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <FaShoppingCart className="text-3xl ml-4 cursor-pointer text-gray-800" />
            <div className="relative -top-4 right-1 bg-gray-800 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              3
            </div>
            <div ref={iconRef}>
              <FaUserCircle
                className="text-3xl ml-4 cursor-pointer text-gray-800"
                onClick={() => setShowDropDown((prev) => !prev)}
              />
            </div>
            {showDropDown && <DropDown />}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-900 text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={!isOpen ? 'block' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={isOpen ? 'block' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href=""
              className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </a>
          </div>
          <div className="px-2 pt-2 pb-3">
            <button className="mt-2 w-full bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium">
              Cart
            </button>
            <button className="mt-2 w-full bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </nav>
  );
};

export default Header;
