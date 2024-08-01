import { useState } from 'react';
import { PiCurrencyInrBold } from 'react-icons/pi';
import _ from 'lodash';
import { useAuth } from '../store/Auth';
import { Pagination, Button } from '@nextui-org/react';
import LogInModal from './LogInModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../App';

const ProductCard = ({ products, page, totalPage, setPage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogInModal, setShowLogInModal] = useState(false);
    const { user, setUser } = useAuth();

    const handleAddToCartClick = async (productId) => {
        if (!user) {
            setShowLogInModal(true);
        } else {
            const body = {
                productId: productId,
                quantity: 1,
            };
            const res = await axiosInstance.post('/cart', body);
            setUser(res.data.user);
        }
    };

    const onClose = () => {
        setShowLogInModal(!showLogInModal);
    };
    const handleLogIn = async () => {
        navigate('/login', { state: { from: location.pathname } });
    };

    if (!products) {
        return <img src="./notFound.png" alt="" />;
    }
    const numberWithCommas = (number) => {
        const formattedNumber = _.toNumber(number).toLocaleString();
        return formattedNumber;
    };
    return (
        <div className="flex flex-col items-center h-full p-2 w-full  ">
            {products.map((item, index) => (
                <div
                    key={index}
                    className="flex sm:flex-row flex-col w-full justify-center items-center border-2 m-2 rounded-lg hover:bg-gray-200 gap-10 px-10 py-4"
                >
                    <img
                        onClick={() => navigate('/product/' + item._id)}
                        src={item.images[0]}
                        className="w-56 md:w-56 cursor-pointer"
                    />
                    <div className="flex w-full lg:flex-row flex-col md:px-10 justify-center gap-4 lg:justify-between items-center sm:items-start lg:items-center">
                        <div>
                            <div
                                className="truncate text-2xl font-bold cursor-pointer hover:text-red-500  "
                                onClick={() => navigate('/product/' + item._id)}
                            >
                                {item.name}
                            </div>
                            <div className="flex items-center space-x-2 ">
                                <PiCurrencyInrBold className="text-xl text-gray-800" />
                                <span className="text-2xl font-bold">
                                    {numberWithCommas(item.price)}/-
                                </span>
                            </div>

                            <div>FREE Delivery</div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Button
                                color="primary"
                                variant="solid"
                                onClick={() => handleAddToCartClick(item._id)}
                            >
                                Add To Cart
                            </Button>
                            {showLogInModal && (
                                <LogInModal
                                    showLogInModal={showLogInModal}
                                    onClose={onClose}
                                    onConfirm={handleLogIn}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center items-center p-5 w-full">
                <Pagination
                    showControls
                    total={totalPage}
                    initialPage={1}
                    onChange={setPage}
                    page={page}
                />
            </div>
        </div>
    );
};

export default ProductCard;
