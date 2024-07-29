import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';


const LogOutModal = ({ showLogInModal, onConfirm, onClose }) => {
  console.log('login modal');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = async () => {
    if (!user) navigate('/login', { state: { from: location, productId } });
    else {
      const res = await axiosInstance.post('/');
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">You are not Logged In!!!</h2>
        <p className="mb-6">Login/SignUp to enjoy our service.</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
