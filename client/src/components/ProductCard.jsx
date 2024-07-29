import React, { useEffect, useState } from 'react';
import { PiCurrencyInrBold } from 'react-icons/pi';
import _ from 'lodash';
import { useAuth } from '../store/Auth';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Pagination,
  Button,
} from '@nextui-org/react';
import LogInModal from './LogInModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../App';

const ProductCard = ({ products }) => {
  const navigate = useNavigate()
  const [showLogInModal, setShowLogInModal] = useState(false);
  const { user, setUser } = useAuth();
  const handleAddToCartClick = async (productId) => {
    if (!user) {
      console.log('nhi hora hai');
      setShowLogInModal(true);
    } else {
      console.log(productId);
      const body = {
        productId: productId,
        quantity: 1,
      };
      const res = await axiosInstance.post('/cart', body);
      setUser(res.data.user);
      console.log(res.data.user);
    }
  };

  const onClick = async () => {
    if (!user) navigate('/login', { state: { from: location, productId } });
    else {
      const res = await axiosInstance.post('/');
    }
  };
  const logOutHandler = () => {
    setShowLogInModal(!showLogInModal);
  };
  const onClose = () => {
    setShowLogInModal(!showLogInModal);
  };
  const handleLogIn = async () => {
    navigate('/login', { state: { from: location} });
  };

  if (!products) {
    return <img src="./notFound.png" alt="" />;
  }
  // const addToCart = () => {
  //   if (!user) {
  //     console.log(user);
  //     setShowModal(true);
  //   }
  // };

  // const location = useLocation();
  // const productId = location.state?.productId;
  // console.log(productId);
  // useEffect(() => {
  //   if (productId) {
  //     addToCart(productId);
  //   }
  // }, [productId]);
  const numberWithCommas = (number) => {
    const formattedNumber = _.toNumber(number).toLocaleString();
    return formattedNumber;
  };
  return (
    <div className="flex flex-col relative h-full bg-slate-700">
      {products.map((item, index) => (
        <div key={index} className="m-2 h-[12rem] flex px-10">
          <img src={item.images[0]} className=" w-[25%]" />
          <div className="flex flex-col px-5 justify-center">
            <div className="truncate">
              {item.name} asd as da sd asdasd a sd asd
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-red-600">{`-${23}%`}</span>
              <PiCurrencyInrBold className="text-xl text-gray-800" />
              <span className="text-2xl font-bold">
                {numberWithCommas(98656)}/-
              </span>
            </div>
            <div className="flex items-center text-lg text-gray-500">
              <PiCurrencyInrBold className="text-xl text-gray-800" />
              {`M.R.P ${numberWithCommas(123564)}`}
            </div>
            <div>FREE Delivery</div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                color="primary"
                variant="shadow"
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
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  );
};

export default ProductCard;
