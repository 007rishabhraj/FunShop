import React, { useState } from 'react';
import { FaCreditCard, FaShippingFast } from 'react-icons/fa';

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [cartItems] = useState([
    { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    { id: 3, name: 'Product 3', price: 19.99, quantity: 3 },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Order placed successfully!');
  };

  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <table className="w-full divide-y divide-gray-200 mb-6">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-500">Product</th>
                <th className="py-3 px-6 text-left text-gray-500">Price</th>
                <th className="py-3 px-6 text-left text-gray-500">Quantity</th>
                <th className="py-3 px-6 text-left text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                  <td className="py-4 px-6">{item.quantity}</td>
                  <td className="py-4 px-6">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ${calculateTotal()}</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="expDate" className="block text-gray-700">Expiration Date</label>
              <input
                type="text"
                id="expDate"
                name="expDate"
                value={form.expDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-gray-700">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
