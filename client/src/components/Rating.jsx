import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa';

const Rating = ({ rating }) => {
    const wholeStar = Math.floor(rating);
    const pointStar = Number(rating) - wholeStar;
    const remaining = 5 - Math.ceil(rating);
    const width = (16 * pointStar).toFixed(1);
    console.log(wholeStar, pointStar, remaining, width);
    return (
        <>
            {new Array(wholeStar).fill(<FaStar />)}
            {pointStar !== 0 && <FaStarHalf />}
            {new Array(remaining).fill(<FaRegStar />)}
        </>
    );
};

export default Rating;
