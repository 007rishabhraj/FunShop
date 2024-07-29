import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { axiosInstance } from '../App';
import { useAuth } from '../store/Auth';
import { IoWarning } from "react-icons/io5";
import { useNavigate,useLocation } from 'react-router-dom';

const LoginForm = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  // const productId = location.state?.productId;
  const {user,setUser} = useAuth()
  const [input, setInput] = useState({ email: '', password: '' });
  const [error,setError] = useState(null)
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);
    //api request
    try {
      const response = await axiosInstance.post('/user/login', input);
      console.log(response.data);
      setUser(response.data.user)
      navigate(from, { state: { productId } });
      // console.log(user); 
    } catch (error) {
      console.log(error);
      setError('Invalid Credentials')
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    setError(null)
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={input.email}
            onChange={changeHandler}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            value={input.password}
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
        <div className="text-sm">
          {
            input.password && error && <div className='text-red-500 text-lg flex items-center gap-2 ml-2'>
              <IoWarning />
              {error}
            </div>
          }
          <a
            href="/forgot-password"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Forgot Password?
          </a>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="w-full flex justify-center py-2 px-4 bg-stone-700 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
