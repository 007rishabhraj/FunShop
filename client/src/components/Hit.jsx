import { Highlight } from 'react-instantsearch';
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils';
import { useNavigate } from 'react-router-dom';

export const Hit = ({ hit,onProductClick}) => {
    const navigate = useNavigate();
    console.log('Hit data:', hit);
    const handleClick = (itemId) => {
        console.log('Hello world');
        onProductClick()
        navigate(`/product/${itemId}`);
    };
    return (
        <article>
            <h1>
                <Highlight
                    attribute="name"
                    hit={hit}
                    onClick={() => handleClick(hit._id)}
                    className="cursor-pointer"
                />
            </h1>
        </article>
    );
};


