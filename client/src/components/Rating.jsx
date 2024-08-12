import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa';

const Rating = ({ rating }) => {
    const wholeStar = Math.floor(rating);
    const pointStar = Number(rating) - wholeStar;
    const remaining = 5 - Math.ceil(rating);
    const width = (16 * pointStar).toFixed(1);
    console.log(wholeStar, pointStar, remaining, width);
    return (
        <>
            {Array.from({ length: wholeStar }).map((_, index) => (
                <FaStar key={`full-${index}`} />
            ))}
            {pointStar !== 0 && <FaStarHalf key="half-star" />}
            {Array.from({ length: remaining }).map((_, index) => (
                <FaRegStar key={`empty-${index}`} />
            ))}
        </>
    );
};

export default Rating;
