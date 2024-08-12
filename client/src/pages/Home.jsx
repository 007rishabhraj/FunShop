import { FaStar } from 'react-icons/fa';
import Caraousel from '../components/Caraousel/Caraousel';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../App';
import CardModel from '../components/Card';
import UseOnScreen from '../hooks/useOnScreen';
import { Button } from '@nextui-org/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        laptops: [],
        shoes: [],
        fashion: [],
        headphones: [],
    });
    const fetchData = async (category) => {
        try {
            const res = await axiosInstance.get(
                `/product?slug=${category}&limit=8`
            );
            return res.data.result;
        } catch (error) {
            console.error(`Error fetching data for ${category}:`, error);
            return [];
        }
    };

    useEffect(() => {
        const categories = ['laptops', 'shoes', 'fashion', 'headphones'];

        const fetchAllData = async () => {
            const results = await Promise.all(
                categories.map((category) => fetchData(category))
            );
            // console.log(results);
            const newData = {};
            categories.forEach((category, index) => {
                newData[category] = results[index];
            });
            // console.log(newData);
            setData(newData);
        };
        // console.log(data);
        fetchAllData();
    }, []);

    const handleShowMore = (category) => {
      navigate('/search', { state: { category } });
  };
    return (
        <div className=" md:font-sans antialiased pt-10 py-5">
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

            {/* Categories Section */}
            <section className="py-10md:py-16 w-[90vw] mx-auto mt-6 ">
                <div className="container mx-auto px-4">
                    <h2
                        id="shoes"
                        className="text-3xl font-semibold text-center mb-8 sm:mt-0"
                    >
                        Laptops
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {/* Repeat this block for each category */}
                        {data['laptops'].map((item) => (
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
                    </div>
                    <div className="flex justify-end mt-5">
                        <button className="bg-black text-white p-2 rounded-lg font-semibold" onClick={()=>handleShowMore('laptops')}>
                            Show More
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-10md:py-16 w-[90vw] mx-auto mt-6">
                <div className="container mx-auto px-4">
                    <h2
                        id="shoes"
                        className="text-3xl font-semibold text-center mb-8 sm:mt-0"
                    >
                        Fashion
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {/* Repeat this block for each category */}
                        {data['fashion'].map((item) => (
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
                    </div>
                    <div className="flex justify-end mt-5">
                        <button className="bg-black text-white p-2 rounded-lg font-semibold" onClick={()=>handleShowMore('fashion')}>
                            Show More
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-10md:py-16 w-[90vw] mx-auto mt-6">
                <div className="container mx-auto px-4">
                    <h2
                        id="shoes"
                        className="text-3xl font-semibold text-center mb-8 sm:mt-0"
                    >
                        Shoes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {/* Repeat this block for each category */}
                        {data['shoes'].map((item) => (
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
                    </div>
                    <div className="flex justify-end mt-5">
                        <button className="bg-black text-white p-2 rounded-lg font-semibold" onClick={()=>handleShowMore('shoes')}>
                            Show More
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-10md:py-16 w-[90vw] mx-auto mt-6">
                <div className="container mx-auto px-4">
                    <h2
                        id="shoes"
                        className="text-3xl font-semibold text-center mb-8 sm:mt-0"
                    >
                        Headphones
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {/* Repeat this block for each category */}
                        {data['headphones'].map((item) => (
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
                    </div>
                    <div className="flex justify-end mt-5">
                        <button className="bg-black text-white p-2 rounded-lg font-semibold" onClick={()=>handleShowMore('headphones')}>
                            Show More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
