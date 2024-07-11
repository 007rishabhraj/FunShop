import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">FunShop</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter to receive the latest updates and
              offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2 rounded-l-md text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} FunShop. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
