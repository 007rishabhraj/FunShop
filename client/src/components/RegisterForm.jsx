import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Importing icons from React Icons library
import { axiosInstance } from '../App';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const {setUser}  = useAuth()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputError, setInputError] = useState({
    password: null,
    confirmPassword: null,
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });

    if (name === 'password' && value.length <= 4) {
      setInputError((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be more than 4 characters',
      }));
    } else {
      setInputError((prevErrors) => ({
        ...prevErrors,
        password: null,
      }));
    }

    if (name === 'confirmPassword' && value !== input.password) {
      setInputError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setInputError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = input;
    try {
      const response = await axiosInstance.post(
        '/user/signup',
        body,
      );
      console.log(response);
      setUser(response.data.user)
      navigate('/')
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="Full name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <input
            type="text"
            name="name"
            value={input.name}
            required
            onChange={changeHandler}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={changeHandler}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              onChange={changeHandler}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent flex items-center"
            >
              {showPassword ? (
                <HiEyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <HiEye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {inputError.password && (
            <div className="text-xs text-red-800 absolute">
              {inputError.password}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              onChange={changeHandler}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent flex items-center"
            >
              {showConfirmPassword ? (
                <HiEyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <HiEye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {inputError.confirmPassword && (
            <div className="text-xs text-red-800 absolute">
              {inputError.confirmPassword}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
