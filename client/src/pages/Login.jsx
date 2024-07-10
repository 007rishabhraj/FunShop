import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000128]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-4">
        <LoginForm />
      </div>
      <div className="text-white mt-4">
        Create new account?{" "}
        <Link to="/signup" className="text-indigo-500">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
