// import { FaStar } from 'react-icons/fa';
import Caraousel from '../components/Caraousel/Caraousel';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../App';
import CardModel from '../components/Card';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await axiosInstance.get('/product');
            if (response.status === 200) {
                setData(response.data.data.products);
            }
        })();
    }, []);
    console.log(data);
    return (
        <div className=" md:font-sans antialiased pt-10 ">
            <Caraousel />
            <section className="bg-gray-800 text-white py-16">
                <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Discover the Best Products for Your Needs
                        </h1>
                        <p className="text-lg mb-6">
                            Find the latest and greatest in our new arrivals
                            section. Shop now and enjoy exclusive deals!
                        </p>
                        <a
                            href="#"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                        >
                            Shop Now
                        </a>
                    </div>
                    <div className="md:w-1/2">
                        <Caraousel />
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            {/* <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={productImage}
                alt="Product"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">Product Name</h3>
              <p className="text-gray-600 mb-2">
                Short description of the product.
              </p>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-yellow-400 mr-1" />
                <FaStar className="text-gray-300" />
              </div>
              <p className="text-xl font-bold">$29.99</p>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 inline-block"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </section> */}

            {/* Categories Section */}
            <section className="py-10md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-8 mt-4 sm:mt-0">
                        All Category
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Repeat this block for each category */}
                        {data.map((item) => (
                            <React.Fragment key={item._id}>
                                <CardModel
                                    name={item.name}
                                    price={item.price}
                                    id={item._id}
                                    image={item.images[0]}
                                    description={item.description}
                                />
                            </React.Fragment>
                        ))}
                        {/* End category block */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
