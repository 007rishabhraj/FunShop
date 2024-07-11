import { FaStar } from 'react-icons/fa';
import productImage from '/product.webp'; // Replace with actual product image path
import Caraousel from '../components/Caraousel/Caraousel';
const Home = () => {
  return (
    <div className="font-sans antialiased pt-10">
      <Caraousel />
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold leading-tight mb-4">Discover the Best Products for Your Needs</h1>
            <p className="text-lg mb-6">Find the latest and greatest in our new arrivals section. Shop now and enjoy exclusive deals!</p>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">Shop Now</a>
          </div>
          <div className="md:w-1/2">
            <img src={productImage} alt="Featured Product" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Repeat this block for each product */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src={productImage} alt="Product" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-lg font-semibold mb-2">Product Name</h3>
              <p className="text-gray-600 mb-2">Short description of the product.</p>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-gray-300" />
              </div>
              <p className="text-xl font-bold">$29.99</p>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 inline-block">Buy Now</a>
            </div>
            {/* End product block */}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Repeat this block for each category */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Category Name</h3>
              <img src={productImage} alt="Category" className="w-full h-32 object-cover mb-4 rounded-lg" />
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Shop Now</a>
            </div>
            {/* End category block */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

