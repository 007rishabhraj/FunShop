import { useState } from 'react';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { PiCurrencyInrBold } from 'react-icons/pi';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import _ from 'lodash';
const Product = () => {
  const images = [
    'https://m.media-amazon.com/images/I/71q26nT14fL._SL1500_.jpg',
    'https://imgs.search.brave.com/1hJL_9v10RIIkFtSRTdM_5CpGtFBkXpJme6qv1Jc4co/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ3/MjMzNTQ3Ni9waG90/by9kaWdpdGFsbHkt/Z2VuZXJhdGVkLWlt/YWdlLW9mLWlzb21l/dHJpYy1kYXRhLWNo/YXJ0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1RTmtnZlZn/WUNYUTdsbzg0TWdt/Y0NtTVAwb1Fsdl9t/V252aWFPc1ktNEQw/PQ',
    'https://imgs.search.brave.com/l3BDxLLjFGt67IttFIb8wMj8j06oLpmZADINBUL_4Bg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bGVuc2JhbGwteWVs/bG93LWFuZC1vcmFu/Z2UtbGlnaHRzLmpw/Zz93aWR0aD0xMDAw/JmZvcm1hdD1wanBn/JmV4aWY9MCZpcHRj/PTA',
    'https://imgs.search.brave.com/4T1tXMwOsde3rGFLxrzSkXTjG3_oUCqg7bpedgy7R4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA',
    'https://media.gettyimages.com/id/155378722/photo/toronto-city-skyline-at-night-in-canada.jpg?s=612x612&w=0&k=20&c=TsLZgY9bRwp08Z7ae5u-AMIxZy6GT9DCucirVP5XWS8=',
  ];
  const item = {
    title:
      'Lian Li Lancool 216 RGB Mid-Tower Alloy Steel Computer Case/Gaming Cabinet - Black | Support E-ATX/ATX/Micro-ATX/Mini-ITX | Pre-Installed 3 Front and Rear Fans - G99.LAN216RX.in',
    discount: '18%',
    sellingPrice: 9032,
    mrp: 10999,
    rating: '4.22/5',
  };
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const plusBtn = () => {
    setQuantity(() => quantity + 1);
  };
  const minusBtn = () => {
    setQuantity(() => quantity - 1);
  };
  const numberWithCommas = (number) => {
    const formattedNumber = _.toNumber(number).toLocaleString();
    return formattedNumber;
  };
  return (

    // main div
    <div className="flex mt-6 space-x-4 ml-10 mb-10">
  {/* Image options */}
  <div className="flex flex-col items-center justify-between w-20 h-[350px] border border-gray-300 p-2 rounded-md">
    {images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index}`}
        className={`rounded-md my-1 cursor-pointer transition-transform duration-300 transform hover:scale-105`}
        onClick={() => setCurrImageIndex(index)}
      />
    ))}
  </div>

  {/* Main image */}
  <div className="flex justify-center items-center h-96 w-6/12 border border-gray-300 rounded-lg overflow-hidden">
  <img
    src={images[currImageIndex]}
    alt="Sample Image"
    className="w-full h-full object-contain"
  />
</div>


  {/* Product info */}
  <div className="w-1/3 flex flex-col space-y-2">
    {/* Title */}
    <div className="text-2xl font-semibold text-gray-800">{item.title}</div>

    {/* Rating */}
    <div className="flex items-center space-x-1 text-yellow-500">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStarHalf />
      <span className="text-lg text-gray-600 ml-3">{item.rating}</span>
    </div>

    {/* Price */}
    <div className="flex items-center space-x-2">
      <span className="text-xl font-semibold text-red-600">{`-${item.discount}`}</span>
      <PiCurrencyInrBold className="text-xl text-gray-800" />
      <span className="text-2xl font-bold">
        {numberWithCommas(item.sellingPrice)}/-
      </span>
    </div>

    {/* MRP */}
    <div className="text-lg text-gray-500">
      {`M.R.P ${numberWithCommas(item.mrp)}`}
    </div>

    {/* Quantity */}
    <div className="flex items-center space-x-2">
      <CiSquareMinus
        className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300"
        onClick={() => minusBtn()}
      />
      <div className="text-xl font-semibold">{quantity}</div>
      <CiSquarePlus
        className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300"
        onClick={() => plusBtn()}
      />
    </div>
  </div>
</div>

  );
};

export default Product;
