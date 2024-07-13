import  { useState } from 'react';
import { FaEdit, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import EditProfile from '../components/EditProfile';
const Account = () => {
  const [editMode, setEditMode] = useState(false); // State to manage edit mode

  // Placeholder user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, Springfield, IL 62701',
    phoneNumber: '(123) 456-7890',
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle form submission from EditProfile (not implemented here)
  const handleEditProfileSubmit = (updatedProfile) => {
    // Update userProfile with updatedProfile data
    console.log('Updated profile:', updatedProfile);
    // Ideally, you would make an API call here to update the profile on the server
    setEditMode(false); // Exit edit mode after submission
  };

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
              <p className="text-gray-600">{userProfile.email}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {/* Conditionally render Edit Profile link or EditProfile component */}
            {editMode ? (
              <EditProfile
                userProfile={userProfile}
                onSubmit={handleEditProfileSubmit}
              />
            ) : (
              <a
                href="#"
                className="text-blue-600 hover:underline mx-1.5"
                onClick={toggleEditMode}
              >
                Edit Profile
              </a>
            )}
            <a
              href="#"
              className="text-blue-600 hover:underline mx-1.5"
              onClick={toggleEditMode}
            >
              <FaEdit />
            </a>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <p className="flex items-center mb-2">
                <FaEnvelope className="text-gray-500 mr-2" />{' '}
                {userProfile.email}
              </p>
              <p className="flex items-center mb-2">
                <FaPhone className="text-gray-500 mr-2" />{' '}
                {userProfile.phoneNumber}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p>{userProfile.address}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <div className="divide-y divide-gray-200">
            {/* Example Order */}
            <div className="py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Order #12345</h3>
                <p className="text-gray-600">Placed on January 15, 2024</p>
              </div>
              <a href="#" className="text-blue-600 hover:underline">
                View Details
              </a>
            </div>
            <div className="py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Order #12346</h3>
                <p className="text-gray-600">Placed on February 10, 2024</p>
              </div>
              <a href="#" className="text-blue-600 hover:underline">
                View Details
              </a>
            </div>
            {/* Add more orders here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
