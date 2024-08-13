import { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { axiosInstance } from '../App';

const ReviewSection = ({ productId }) => {
    const [newReview, setNewReview] = useState('');
    const [userReviews, setUserReviews] = useState([]);
    const { user } = useAuth();

    const handleAddReview = () => {
        if (newReview.trim()) {
            setUserReviews([...userReviews, newReview]);
            setNewReview('');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(productId);

                // Using `params` to pass `productId` as a query parameter
                const response = await axiosInstance.get(`/review/${productId}`
                );

                // Assuming your API returns an array of reviews
                const reviews = response.data.data;
                console.log(reviews);

                setUserReviews(reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error.message);
            }
        };

        fetchData();
    }, [productId]); // Add `productId` to the dependency array
    console.log(userReviews);
    
    return (
        <div className="max-w-2xl flex flex-col justify-center items-center mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

            {userReviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
            ) : (
                <ul className="space-y-3">
                    {userReviews.map((review, index) => (
                        <li
                            key={index}
                            className="p-4 bg-gray-100 rounded shadow-sm"
                        >
                            {review.description}
                        </li>
                    ))}
                </ul>
            )}

            {user ? (
                <div className="mt-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="3"
                        placeholder="Add your review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleAddReview}
                        className="mt-2 px-4 py-2 bg-[#2563EB] text-white rounded hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                </div>
            ) : (
                <p className="mt-4 text-red-500">
                    Please log in to add a review.
                </p>
            )}
        </div>
    );
};

export default ReviewSection;
