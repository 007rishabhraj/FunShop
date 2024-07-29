import { useEffect, useState } from 'react';
import { FaEdit, FaEnvelope, FaUser } from 'react-icons/fa';
import EditProfile from '../components/EditProfile';
import { axiosInstance } from '../App';
import { useAuth } from '../store/Auth';

const Account = () => {
    const { user, setUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        (async () => {
            const order = await Promise.all(
                user.orders.map(async (order) => {
                    const response = await axiosInstance.get(
                        `/orders/${order.order}`
                    );
                    return { ...response.data.data, expand: false };
                })
            );
            setOrder(order);
        })();
    }, [user]);

    const userProfile = {
        name: user.name,
        email: user.email,
    };

    const onClick = async () => {
        try {
            const response = await axiosInstance.delete('/user');
            console.log(response.data);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(order);
    return (
        <div className="font-sans antialiased bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl font-bold mr-4">
                            <FaUser />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold mb-2">
                                {userProfile.name}
                            </h1>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        {editMode ? (
                            <EditProfile
                                userProfile={userProfile}
                                onSubmit={() => setEditMode(false)}
                            />
                        ) : (
                            <a
                                href="#"
                                className="text-blue-600 hover:underline mx-1.5"
                                onClick={() => setEditMode(!editMode)}
                            >
                                Edit Profile
                            </a>
                        )}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline mx-1.5"
                            onClick={() => setEditMode(!editMode)}
                        >
                            <FaEdit />
                        </a>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Account Information
                    </h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold mb-2">
                                Contact Information
                            </h3>
                            <p className="flex items-center mb-2">
                                <FaEnvelope className="text-gray-500 mr-2" />{' '}
                                {userProfile.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Order History
                    </h2>
                    <div className="divide-y divide-gray-200">
                        {/* Example Order */}
                        {user.orders.map((order, index) => (
                            <div
                                key={order._id}
                                className="py-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Order {order.order}
                                    </h3>
                                </div>
                                <div
                                    onClick={() =>
                                        setOrder((t) => {
                                            const temp = [...t];
                                            temp[index].expand =
                                                !temp[index].expand;
                                            return temp;
                                        })
                                    }
                                    className="text-blue-600 hover:underline"
                                >
                                    View Details
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className="bg-red-500 mt-4  hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Account;
