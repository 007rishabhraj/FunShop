import  { useState } from 'react';
import { FaTrash, FaUndo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Cart = () => {
  // Sample cart items (in a real app, this would come from state or context)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    { id: 3, name: 'Product 3', price: 19.99, quantity: 3 },
  ]);

  // State for confirmation popup
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [lastRemovedItem, setLastRemovedItem] = useState(null);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (id, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Show confirmation popup
  const handleRemoveItem = (id) => {
    setItemToRemove(id);
    setShowConfirm(true);
  };

  // Confirm removal
  const confirmRemoveItem = () => {
    const item = cartItems.find((item) => item.id === itemToRemove);
    setLastRemovedItem(item);
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove));
    setShowConfirm(false);
    setItemToRemove(null);
  };

  // Undo removal
  const undoRemoveItem = () => {
    if (lastRemovedItem) {
      setCartItems([...cartItems, lastRemovedItem]);
      setLastRemovedItem(null);
    }
  };

  // Cancel removal
  const cancelRemoveItem = () => {
    setShowConfirm(false);
    setItemToRemove(null);
  };

  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left text-gray-500">Product</th>
                  <th className="py-3 px-6 text-left text-gray-500">Price</th>
                  <th className="py-3 px-6 text-left text-gray-500">
                    Quantity
                  </th>
                  <th className="py-3 px-6 text-left text-gray-500">Total</th>
                  <th className="py-3 px-6 text-left text-gray-500">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        className="w-16 p-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="py-4 px-6">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Total: ${calculateTotal()}
              </h2>
              <Link
                to="/checkout"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}

        {/* Confirmation Popup */}
        {showConfirm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">Confirm Removal</h2>
              <p className="text-gray-700 mb-4">
                Are you sure you want to remove this item from your cart?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={confirmRemoveItem}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Yes, Remove
                </button>
                <button
                  onClick={cancelRemoveItem}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Undo Removal */}
        {lastRemovedItem && (
          <div className="fixed bottom-4 right-4 bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
            <p className="text-gray-700">Item removed. </p>
            <button
              onClick={undoRemoveItem}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2"
            >
              <FaUndo />
              <span>Undo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
