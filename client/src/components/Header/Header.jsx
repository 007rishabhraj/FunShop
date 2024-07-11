import { FaUserCircle } from 'react-icons/fa';
import { Outlet, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const Header = () => {
  const location = useLocation();
  const hideSearchBar =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <header className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-8">
          <img src="logo.png" alt="Logo" className="h-12" />
          <div className="space-x-6 pl-20">
            <a href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </a>
            <a href="/Contact Us" className="text-gray-700 hover:text-blue-500">
              Contact Us
            </a>
          </div>
        </div>
        {!hideSearchBar && (
          <input
            type="text"
            placeholder="Search FunShop..."
            className="w-96 p-2 border-2 border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <div className='flex justify-items-end mt-3'>
          <a href="/cart" className="hover:text-blue-500">
            <FaShoppingCart className="text-3xl mr-4" />
            <div className="relative -top-9 -right-6 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              3 
            </div>
          </a>
          <a
            href="/account"
            className="text-gray-700 hover:text-blue-50 ml-8 mr-8"
          >
            <FaUserCircle className="text-3xl" />
          </a>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
