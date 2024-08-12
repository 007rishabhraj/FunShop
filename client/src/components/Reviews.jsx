import { FaRegStar, FaStar } from 'react-icons/fa';

const Reviews = () => {
    const reviews = [
        {
            rating: 4,
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae laborum sequi ratione, nostrum facilis magnam voluptates dolores quae pariatur debitis obcaecati a? Minima, ad! Consequuntur error est tenetur at ullam!',
        },
        {
            rating: 4,
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae laborum sequi ratione, nostrum facilis magnam voluptates dolores quae pariatur debitis obcaecati a? Minima, ad! Consequuntur error est tenetur at ullam!',
        },
        {
            rating: 3,
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae laborum sequi ratione, nostrum facilis magnam voluptates dolores quae pariatur debitis obcaecati a? Minima, ad! Consequuntur error est tenetur at ullam!',
        },
        {
            rating: 4,
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae laborum sequi ratione, nostrum facilis magnam voluptates dolores quae pariatur debitis obcaecati a? Minima, ad! Consequuntur error est tenetur at ullam!',
        },
        {
            rating: 4,
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae laborum sequi ratione, nostrum facilis magnam voluptates dolores quae pariatur debitis obcaecati a? Minima, ad! Consequuntur error est tenetur at ullam!',
        },
    ];
    return (
        <div className="p-5">
            <h3 className="text-3xl font-semibold">
                Customer Rating and Reviews
            </h3>
            {reviews.length === 0 ? (
                <div className="flex items-center mx-auto justify-around">
                    <div className="flex items-center space-x-4">
                        <div className="text-2xl">
                            No Reviews. Be The first one to do it.
                        </div>
                        <button className="bg-blue-500 border-2 rounded-md p-2 text-2xl shadow-lg text-white">
                            Add Review
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {reviews.map((item, index) => (
                        <div key={item.id || index} className="p-4">
                            <div className="flex items-center text-xl">
                                {Array.from({ length: item.rating }).map(
                                    (_, starIndex) => (
                                        <FaStar
                                            key={`full-${index}-${starIndex}`}
                                            className="text-yellow-600"
                                        />
                                    )
                                )}
                                {Array.from({ length: 5 - item.rating }).map(
                                    (_, starIndex) => (
                                        <FaRegStar
                                            key={`empty-${index}-${starIndex}`}
                                        />
                                    )
                                )}
                                <div className="ml-2">{item.rating}/5</div>
                            </div>
                            <div>{item.review}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
