import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">FunShop</h3>
            <p className="text-sm">© 2024 FunShop. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col items-center md:flex-row md:items-center">
            <a href="#home" className="text-sm text-gray-400 hover:text-gray-300 mx-2">Home</a>
            <a href="#about" className="text-sm text-gray-400 hover:text-gray-300 mx-2">About</a>
            <a href="#services" className="text-sm text-gray-400 hover:text-gray-300 mx-2">Services</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-gray-300 mx-2">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
