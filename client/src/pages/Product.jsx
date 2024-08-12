import { useEffect, useState } from 'react';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { PiCurrencyInrBold } from 'react-icons/pi';
import _ from 'lodash';
import Reviews from '../components/Reviews';
import { axiosInstance } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useAuth } from '../store/Auth';
import LogInModal from '../components/LogInModal';
const Product = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const [showLoginOption, setShowLoginOption] = useState(false);
    const onConfirm = () => {
        navigate('/login');
    };
    const onClose = () => setShowLoginOption(false);
    console.log(productId);
    useEffect(() => {
        (async () => {
            const res = await axiosInstance.get(`/product/${productId}`);
            console.log(res);
            if (res.status === 200) setData(res.data.data.product);
        })();
    }, [productId]);

    const numberWithCommas = (number) => {
        const formattedNumber = _.toNumber(number).toLocaleString();
        return formattedNumber;
    };
    const handleAddToCartSubmit = async (data) => {
        console.log('add');
        if (user) {
            const res = await axiosInstance.post('/cart', {
                productId: data._id,
                quantity: 1,
            });
            console.log(res.data.user);
            setUser(res.data.user);
        } else {
            setShowLoginOption(true);
        }
    };
    return (
        <>
            {data._id && (
                <div>
                    <div className="flex md:flex-row flex-col mt-6 space-x-4 md:mx-10 mb-10 ">
                        <div className="flex flex-col-reverse md:flex-row gap-4 mb-3 items-center justify-center">
                            <div className=" flex md:flex-col flex-row gap-1  items-stretch md:justify-between min-w-[100px] lg:max-w-[100px] h-fit overflow-y-scroll justify-center md:h-[350px] border border-gray-300 p-2 rounded-md">
                                {data.images.map((img, index) => (
                                    <div key={index}>
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            className={`rounded-md my-1 h-20 md:h-auto cursor-pointer transition-transform duration-300 transform hover:scale-105`}
                                            onClick={() =>
                                                setCurrImageIndex(index)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center h-[600px] min-w-72 max-w-[25vw] lg:w-[600px] w-auto border border-gray-300 rounded-lg overflow-hidden ">
                                <img
                                    src={data.images[currImageIndex]}
                                    alt="Sample Image"
                                    className="w-[100vw] object-contain"
                                />
                            </div>
                        </div>

                        <div className="w-auto flex flex-col space-y-2">
                            <div className="text-xl sm:text-2xl font-semibold text-gray-800">
                                {data.name}
                            </div>

                            <div className="flex items-center space-x-1  text-xl text-yellow-600">
                                <Rating rating={data.ratingsAverage} />
                                <span className=" text-gray-600 ml-3">
                                    {data.ratingsAverage}/5
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <PiCurrencyInrBold className="text-xl text-gray-800" />
                                <span className="text-2xl font-bold">
                                    {numberWithCommas(data.price * 84)}/-
                                </span>
                            </div>
                            <div>{data.description}</div>

                            <div className="flex items-center space-x-2">
                                <CiSquareMinus
                                    className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300"
                                    onClick={() =>
                                        setQuantity((t) => (t > 0 ? t - 1 : 0))
                                    }
                                />
                                <div className="text-xl font-semibold">
                                    {quantity}
                                </div>
                                <CiSquarePlus
                                    className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300"
                                    onClick={() =>
                                        setQuantity((t) =>
                                            t < 10 ? t + 1 : 10
                                        )
                                    }
                                />
                            </div>
                            <button className="w-40 py-2 px-1 rounded-md text-white bg-blue-500">
                                Buy Now
                            </button>
                            <button
                                className="w-40 py-2 rounded-md text-white bg-blue-500"
                                onClick={() => handleAddToCartSubmit(data)}
                            >
                                Add to Cart
                            </button>
                        </div>
                        {showLoginOption && (
                            <LogInModal
                                onClose={onClose}
                                onConfirm={onConfirm}
                            />
                        )}
                    </div>
                    <hr className="w-[95%] mx-auto border-1 shadow-2xl border-black my-10" />
                    <Reviews />
                </div>
            )}
        </>
    );
};

export default Product;
