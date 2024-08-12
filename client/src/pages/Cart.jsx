// // import  { useState } from 'react';
// // import { FaTrash, FaUndo } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';
// // const Cart = () => {
// //   // Sample cart items (in a real app, this would come from state or context)
// //   const [cartItems, setCartItems] = useState([
// //     { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
// //     { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
// //     { id: 3, name: 'Product 3', price: 19.99, quantity: 3 },
// //   ]);

// //   // State for confirmation popup
// //   const [showConfirm, setShowConfirm] = useState(false);
// //   const [itemToRemove, setItemToRemove] = useState(null);
// //   const [lastRemovedItem, setLastRemovedItem] = useState(null);

// //   // Calculate total price
// //   const calculateTotal = () => {
// //     return cartItems
// //       .reduce((total, item) => total + item.price * item.quantity, 0)
// //       .toFixed(2);
// //   };

// //   // Handle quantity change
// //   const handleQuantityChange = (id, event) => {
// //     const newQuantity = parseInt(event.target.value, 10);
// //     setCartItems(
// //       cartItems.map((item) =>
// //         item.id === id ? { ...item, quantity: newQuantity } : item
// //       )
// //     );
// //   };

// //   // Show confirmation popup
// //   const handleRemoveItem = (id) => {
// //     setItemToRemove(id);
// //     setShowConfirm(true);
// //   };

// //   // Confirm removal
// //   const confirmRemoveItem = () => {
// //     const item = cartItems.find((item) => item.id === itemToRemove);
// //     setLastRemovedItem(item);
// //     setCartItems(cartItems.filter((item) => item.id !== itemToRemove));
// //     setShowConfirm(false);
// //     setItemToRemove(null);
// //   };

// //   // Undo removal
// //   const undoRemoveItem = () => {
// //     if (lastRemovedItem) {
// //       setCartItems([...cartItems, lastRemovedItem]);
// //       setLastRemovedItem(null);
// //     }
// //   };

// //   // Cancel removal
// //   const cancelRemoveItem = () => {
// //     setShowConfirm(false);
// //     setItemToRemove(null);
// //   };

// //   return (
// //     <div className="font-sans antialiased bg-gray-100 min-h-screen py-8">
// //       <div className="container mx-auto px-4">
// //         <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

// //         {cartItems.length === 0 ? (
// //           <div className="bg-white shadow-md rounded-lg p-6">
// //             <p className="text-lg">Your cart is empty.</p>
// //           </div>
// //         ) : (
// //           <div className="bg-white shadow-md rounded-lg p-6 mb-8">
// //             <table className="w-full divide-y divide-gray-200">
// //               <thead>
// //                 <tr>
// //                   <th className="py-3 px-6 text-left text-gray-500">Product</th>
// //                   <th className="py-3 px-6 text-left text-gray-500">Price</th>
// //                   <th className="py-3 px-6 text-left text-gray-500">
// //                     Quantity
// //                   </th>
// //                   <th className="py-3 px-6 text-left text-gray-500">Total</th>
// //                   <th className="py-3 px-6 text-left text-gray-500">Remove</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {cartItems.map((item) => (
// //                   <tr key={item.id}>
// //                     <td className="py-4 px-6">{item.name}</td>
// //                     <td className="py-4 px-6">${item.price.toFixed(2)}</td>
// //                     <td className="py-4 px-6">
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         value={item.quantity}
// //                         onChange={(e) => handleQuantityChange(item.id, e)}
// //                         className="w-16 p-1 border border-gray-300 rounded-md"
// //                       />
// //                     </td>
// //                     <td className="py-4 px-6">
// //                       ${(item.price * item.quantity).toFixed(2)}
// //                     </td>
// //                     <td className="py-4 px-6">
// //                       <button
// //                         onClick={() => handleRemoveItem(item.id)}
// //                         className="text-red-600 hover:text-red-700"
// //                       >
// //                         <FaTrash />
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             <div className="mt-6 flex justify-between items-center">
// //               <h2 className="text-xl font-semibold">
// //                 Total: ${calculateTotal()}
// //               </h2>
// //               <Link
// //                 to="/checkout"
// //                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
// //               >
// //                 Proceed to Checkout
// //               </Link>
// //             </div>
// //           </div>
// //         )}

// //         {/* Confirmation Popup */}
// //         {showConfirm && (
// //           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
// //             <div className="bg-white rounded-lg p-6 shadow-md w-96">
// //               <h2 className="text-xl font-semibold mb-4">Confirm Removal</h2>
// //               <p className="text-gray-700 mb-4">
// //                 Are you sure you want to remove this item from your cart?
// //               </p>
// //               <div className="flex justify-end space-x-4">
// //                 <button
// //                   onClick={confirmRemoveItem}
// //                   className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
// //                 >
// //                   Yes, Remove
// //                 </button>
// //                 <button
// //                   onClick={cancelRemoveItem}
// //                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Undo Removal */}
// //         {lastRemovedItem && (
// //           <div className="fixed bottom-4 right-4 bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
// //             <p className="text-gray-700">Item removed. </p>
// //             <button
// //               onClick={undoRemoveItem}
// //               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2"
// //             >
// //               <FaUndo />
// //               <span>Undo</span>
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

// // src/components/CartItem.js
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../store/Auth';
// import { axiosInstance } from '../App';
// import { RiDeleteBin6Line } from 'react-icons/ri';

// const Cart = () => {
//     const { user } = useAuth();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const product = {
//         _id: '66ac7b46b95e437178d0c333',
//         name: 'Trendy Queen Womens Crop Tank Tops Cute Backless Tops Going Out Outfits Y2K Summer Trendy Clothes Basics Clothing',
//         slug: ['fashion', 'clothing'],
//         ratingsAverage: null,
//         ratingsQuantity: 0,
//         price: 14.97,
//         description:
//             'MATERIAL: Made from a premium blend of 12% spandex and 88% polyester, fabric offers soft, breathable and stretchy, keeping you cool and comfortable in the spring and summer. FEATURES: Trendy Queen Crop Tank Tops features a slimming, crop top cut and sides slits design that accentuates curves with ease. Stretch fabric provides a tailored fit for a personalized comfort experience. DESIGN: Sweetheart neckline with a thick straps, the carefully crafted design ensures a stylish look while still being comfortable to wear. whether worn alone or layered for added style. MATCH: Versatile design allows for easy pairing with skirts, jeans, shorts, gym shorts, or leggings, joggers making it a key piece for your day-to-night wardrobe. OCCASION: Suitable for a variety of occasions, you can wear this tank tops to yoga, workout, running, going out, party, vacation, or relax and travel at home. Womens Backless Sleeveles Crop Tank Top',
//         images: [
//             'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQr_2_pJboYTVJtnskHDloW93lMrhjO33YKx8avxCD04gPt35RiIbDpU-wdtiICBfLgn_iZclxfuU4EifEO_EnZkpEj3eOd&usqp=CAE',
//             'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTDiLzbc8b0cUWWeBo4k6HdOK47YH6Mx1n5bnYfJeoTpZjvEq4qZUPdJ5_L-IVjxtzMWtsDIq84ZMqr0WVvYDPAfbIh7aWW&usqp=CAE',
//             'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMQweWU_ewOXZQuZzCSFyiMgRB0MILizcKZ09u-ioNEB2p_fN960muJFwmuYz23hOenagn-U7CB_2a6Xx790WTyVdmxt0&usqp=CAE',
//             'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR5gE3HkX5QEfCeD_Lm9RRb7LjQxR9dk9OQXJIg2P8bxgagWAZpEdHbWlLxjmLKqUZMVQbWOKVyeMQS3kEn-L7LU-v41eOe&usqp=CAE',
//             'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT-h-B6Wn8bzy_5lV_oyUyG2MB2pN9Zdaj47nYpnjXK2GyVIXPLkN4p1zPU_rCcGz342CW5kDQleHM4kEsVIs_6Emxq0ccluA&usqp=CAE',
//             'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmzuvJNBRwPVDdl0rhI01sPyX6lWId1Al5MapMXdy3-wGuskCqdEwKpdzPkF1DBZrXCP2Nw_U_EsmxZBozqGT2kdXXPGqhug&usqp=CAE',
//         ],
//     };
//     return (
//         <div className="flex h-[78.75vh] w-full py-10 px-5 justify-evenly items-start">
//             <div className="flex flex-col m-5">
//                 <div className="text-3xl font-semibold">Your Cart</div>
//                 <div className="flex justify-between">
//                     <div>
//                         <span>Products</span>
//                     </div>
//                     <div className='flex justify-end space-x-9 mr-[70px]'>
//                         <span>Quantity</span>
//                         <span>Price</span>
//                     </div>
//                 </div>
//                 <div className="flex space-x-10 items-start justify-center m-5">
//                     <div className="w-10 h-10 rounded-md">
//                         <img src={product.images[0]} alt="" />
//                     </div>
//                     <div className="w-[20vw] truncate">{product.name}</div>
//                     <div className="">{20}</div>
//                     <div>{product.price}</div>
//                     <button>
//                         <RiDeleteBin6Line />
//                     </button>
//                 </div>
//                 <div className="flex space-x-10 items-start justify-center m-5">
//                     <div className="w-10 h-10 rounded-md">
//                         <img src={product.images[0]} alt="" />
//                     </div>
//                     <div className="w-[20vw] truncate">{product.name}</div>
//                     <div className="">{20}</div>
//                     <div>{product.price}</div>
//                     <button>
//                         <RiDeleteBin6Line />
//                     </button>
//                 </div>
//                 <div className="flex space-x-10 items-start justify-center m-5">
//                     <div className="w-10 h-10 rounded-md">
//                         <img src={product.images[0]} alt="" />
//                     </div>
//                     <div className="w-[20vw] truncate">{product.name}</div>
//                     <div className="">{20}</div>
//                     <div>{product.price}</div>
//                     <button>
//                         <RiDeleteBin6Line />
//                     </button>
//                 </div>
//             </div>
//             <div className="bg-[#19181a] text-white p-5 min-h-[80%] rounded-lg flex-col flex justify-evenly">
//                 <div className="text-4xl justify-center font-bold">
//                     Cart Total
//                 </div>
//                 <div className="flex justify-between">
//                     <p>Subtotal</p>
//                     <p>${100}</p>
//                 </div>
//                 <hr className="opacity-50 h-[2px] bg-[#c4b7b2]" />
//                 <div className="flex justify-between border-bo">
//                     <p>Tax</p>
//                     <p>${100}</p>
//                 </div>
//                 <hr className="opacity-50 h-[2px] bg-[#c4b7b2]" />
//                 <div className="flex justify-between border-bo">
//                     <p>Shipping</p>
//                     <p>${100}</p>
//                 </div>
//                 <div className=" break-words w-[20vw]">
//                     We only charge for shipping when you have over 2 kgs.
//                 </div>
//                 <hr className="opacity-50 h-[2px] bg-[#c4b7b2]" />
//                 <div className="flex justify-between">
//                     <p>Total</p>
//                     <p>${600}</p>
//                 </div>
//                 <div className="flex justify-center ">
//                     <button className="bg-white text-black px-7 py-4 rounded-md font-semibold">
//                         Continue To Payment
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;

import React from 'react';

const CartItem = ({ product }) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-[#c4b7b2]">
            <div className="flex items-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-500">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-8">
                <select className="border border-gray-300 rounded-md p-2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <p className="text-lg font-semibold">{product.price}</p>
                <button className="text-gray-500 hover:text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const Cart = () => {
    const product = {
        _id: '66ac7b46b95e437178d0c333',
        name: 'Trendy Queen Womens Crop Tank Tops Cute Backless Tops Going Out Outfits Y2K Summer Trendy Clothes Basics Clothing',
        slug: ['fashion', 'clothing'],
        ratingsAverage: null,
        ratingsQuantity: 0,
        price: 14.97,
        description:
            'MATERIAL: Made from a premium blend of 12% spandex and 88% polyester, fabric offers soft, breathable and stretchy, keeping you cool and comfortable in the spring and summer. FEATURES: Trendy Queen Crop Tank Tops features a slimming, crop top cut and sides slits design that accentuates curves with ease. Stretch fabric provides a tailored fit for a personalized comfort experience. DESIGN: Sweetheart neckline with a thick straps, the carefully crafted design ensures a stylish look while still being comfortable to wear. whether worn alone or layered for added style. MATCH: Versatile design allows for easy pairing with skirts, jeans, shorts, gym shorts, or leggings, joggers making it a key piece for your day-to-night wardrobe. OCCASION: Suitable for a variety of occasions, you can wear this tank tops to yoga, workout, running, going out, party, vacation, or relax and travel at home. Womens Backless Sleeveles Crop Tank Top',
        images: [
            'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQr_2_pJboYTVJtnskHDloW93lMrhjO33YKx8avxCD04gPt35RiIbDpU-wdtiICBfLgn_iZclxfuU4EifEO_EnZkpEj3eOd&usqp=CAE',
            'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTDiLzbc8b0cUWWeBo4k6HdOK47YH6Mx1n5bnYfJeoTpZjvEq4qZUPdJ5_L-IVjxtzMWtsDIq84ZMqr0WVvYDPAfbIh7aWW&usqp=CAE',
            'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMQweWU_ewOXZQuZzCSFyiMgRB0MILizcKZ09u-ioNEB2p_fN960muJFwmuYz23hOenagn-U7CB_2a6Xx790WTyVdmxt0&usqp=CAE',
            'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR5gE3HkX5QEfCeD_Lm9RRb7LjQxR9dk9OQXJIg2P8bxgagWAZpEdHbWlLxjmLKqUZMVQbWOKVyeMQS3kEn-L7LU-v41eOe&usqp=CAE',
            'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT-h-B6Wn8bzy_5lV_oyUyG2MB2pN9Zdaj47nYpnjXK2GyVIXPLkN4p1zPU_rCcGz342CW5kDQleHM4kEsVIs_6Emxq0ccluA&usqp=CAE',
            'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmzuvJNBRwPVDdl0rhI01sPyX6lWId1Al5MapMXdy3-wGuskCqdEwKpdzPkF1DBZrXCP2Nw_U_EsmxZBozqGT2kdXXPGqhug&usqp=CAE',
        ],
    };
    const products = [product, product, product];

    return (
        <div className="flex h-[80vh] justify-center">
            <div className="flex w-[68vw] justify-around py-10">
                {/* <div className="max-w-3xl py-8">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">PRODUCT</span>
                        <div className="flex space-x-20">
                            <span className="text-gray-600">QUANTITY</span>
                            <span className="text-gray-600">PRICE</span>
                        </div>
                    </div>
                    {products.map((product) => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </div> */}
                <div className="grid grid-cols-[4fr_1fr_1fr] gap-4 p-4 rounded shadow-md">
                    <div className="font-bold">Products</div>
                    <div className="font-bold">Qunatity</div>
                    <div className="font-bold">Price</div>
                    {products.map((currproduct) => {
                        return (
                            <>
                                <div className="flex flex-row">
                                    <div className="w-10 h-10 rounded-md">
                                        <img src={product.images[0]} alt="" />
                                    </div>
                                    <div className='truncate'>{currproduct.name}</div>
                                </div>
                                <div>{20}</div>
                                <div>{currproduct.price}</div>
                            </>
                        );
                    })}
                </div>
                <div className="bg-[#19181a] text-white p-5 min-h-[80%] max-h-[500px] rounded-lg flex-col flex justify-evenly">
                    <div className="text-4xl justify-center font-bold">
                        Cart Total
                    </div>
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>${100}</p>
                    </div>
                    <hr className="opacity-50 h-[2px] bg-[#c4b7b2]" />
                    <div className="flex justify-between border-bo">
                        <p>Tax</p>
                        <p>${100}</p>
                    </div>
                    <hr className="opacity-50 h-[2px] bg-[#c4b7b2]" />
                    <div className="flex justify-between border-bo">
                        <p>Shipping</p>
                        <p>${100}</p>
                    </div>
                    <div className=" break-words w-[20vw]">
                        We only charge for shipping when you have over 2 kgs.
                    </div>
                    <hr className="opacity-50 h-[2px] bg-[#c4b7b2]" />
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>${600}</p>
                    </div>
                    <div className="flex justify-center ">
                        <button className="bg-white text-black px-7 py-4 rounded-md font-semibold">
                            Continue To Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
