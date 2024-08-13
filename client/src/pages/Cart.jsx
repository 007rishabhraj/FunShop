import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../App';
const Cart = () => {
    const [products, setProducts] = useState([]);
    const [productDetailsMap, setProductDetailsMap] = useState({});

    const fetchProductDetails = async (productId) => {
        try {
            const res = await axiosInstance.get(`/product/${productId}`);
            return res.data.result;
        } catch (error) {
            console.error(
                `Error fetching data for product ID ${productId}:`,
                error
            );
            return null;
        }
    };

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const res = await axiosInstance.get('/cart');
                const cartProducts = res.data.data.data;
                setProducts(cartProducts);

                const fetchAllProductDetails = async () => {
                    const productDetailsObj = {};
                    for (const item of cartProducts) {
                        const { productId } = item;
                        try {
                            const productDetails = await fetchProductDetails(
                                productId
                            );
                        } catch (error) {
                            console.log(error.message);
                        }
                        productDetailsObj[productId] = productDetails;
                    }
                    setProductDetailsMap(productDetailsObj);
                };

                fetchAllProductDetails();
            } catch (error) {
                console.error(
                    'Error fetching cart products or product details:',
                    error
                );
            }
        };

        fetchCartProducts();
    }, []);

    const subtotal = 100;
    return (
        <div className="flex flex-col justify-between lg:flex-row p-6 m-auto lg:p-8">
            {/* Left side - Cart Items */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <div className="space-y-6">
                    {products.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-around items-center border-b pb-4"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img
                                        src="./cat.png"
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className='space-x-4"'>
                                    <h3 className="text-lg font-semibold">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="border border-gray-300 rounded p-2">
                                    {item.quantity}
                                </span>
                                <p className="text-lg font-semibold">
                                    {item.price}
                                </p>
                                <button
                                    className="text-gray-500 hover:text-red-600"
                                    onClick={() => handleDeleteBtn}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side - Cart Total */}
            <div className="lg:w-1/3 mt-8 lg:mt-0 lg:ml-8">
                <div className="bg-gray-900 text-white p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Cart total</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>{subtotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax</p>
                            <p>$0</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping in India</p>
                            <p>$1</p>
                        </div>
                        <div className="text-sm text-gray-400">
                            <p>
                                We only charge for shipping when you have over
                                2kg items
                            </p>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>${subtotal + 1}</p>
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
