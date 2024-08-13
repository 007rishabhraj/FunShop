import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../App';
import _ from 'lodash';
const Cart = () => {
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState([]);
    const fetchProductDetails = async (id) => {
        // console.log(id);
        const res = await axiosInstance.get(`/product/${id}`);
        return res;
    };
    const handleDeleteBtn = async (productId, quantity) => {
        // console.log(productId, quantity);
        try {
            const res = await axiosInstance.delete('/cart', {
                data: { productId, quantity }
            });
            // console.log(res.data);
    
            // Update the state by removing the deleted product
            setProducts(prevProducts => 
                prevProducts.filter(product => product.productId !== productId)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get(`/cart`);
            setProductIds(res.data.data.data);
            const result = await Promise.all(
                res.data.data.data.map((item, index) =>
                    fetchProductDetails(item.productId)
                )
            );
            let temp = [];
            const newResult = result.map((item, index) => {
                // console.log(res.data.data.data[index]);
                temp.push({
                    ...item.data.data.product,
                    ...res.data.data.data[index],
                });
            });
            setProducts(temp);
        };
        fetchData();
    }, []);
    const subTotal = products
        .map((item) => item.price * item.quantity)
        .reduce((acc, value) => acc + value, 0);
    return (
        <div className="flex flex-col justify-between lg:flex-row p-6 m-auto lg:p-8 ">
            {/* Left side - Cart Items */}
            <div className="flex-1 min-w-[60%] max-w-[70%] min-h-[70vh] max-h-[70vh] overflow-y-scroll">
                <h2 className="text-2xl font-bold mb-4 ">Your Cart</h2>
                <div className="space-y-6 ">
                    {products.map((item, index) => (
                        <div className="flex justify-between items-center border-b pb-4 max-w-[70%]" key={index}>
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-contain rounded "
                                    />
                                </div>
                                <div className='space-x-4" w-[25vw]'>
                                    <h3 className="text-lg font-semibold truncate">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="border border-gray-300 rounded p-2">
                                    {item.quantity}
                                </span>
                                <p className="text-lg font-semibold">
                                    ${_.round(item.price, 2).toFixed(2)}
                                </p>
                                <button
                                    className="text-gray-500 hover:text-red-600"
                                    onClick={() =>
                                        handleDeleteBtn(
                                            item.productId,
                                            item.quantity
                                        )
                                    }
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side - Cart Total */}
            <div className="lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 min-w-[20vw] max-[30vw] max-w-[70%] min-h-[70vh]">
                <div className="bg-gray-900 text-white p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Cart total</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>${subTotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax</p>
                            <p>$2.99</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping in India</p>
                            <p>$3.99</p>
                        </div>
                        <div className="text-sm text-gray-400">
                            <p>
                                We only charge for shipping when you have over
                                2kg items
                            </p>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>${_.round(subTotal + 2.99 + 3.99, 2).toFixed(2)}</p>
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
