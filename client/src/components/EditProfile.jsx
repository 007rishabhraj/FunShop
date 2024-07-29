import { useState } from 'react';
import { axiosInstance } from '../App';
import { useAuth } from '../store/Auth';

const EditProfile = ({ userProfile }) => {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        name: userProfile.name,
        email: userProfile.email,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.patch('/user', formData);
        if (res.status === 200) setUser(res.data.user);
    };

    return (
        <div className="container mx-auto px-4 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
