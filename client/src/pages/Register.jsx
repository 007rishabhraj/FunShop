import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm"; // Import RegisterForm component

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000128]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-4">
        <RegisterForm /> {/* Include RegisterForm component */}
      </div>
      <div className="text-white mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-500">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
