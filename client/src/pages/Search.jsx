import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Select, SelectItem, Slider, Spinner, Button } from '@nextui-org/react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardModel from '../components/Card';
import useOnScreen from '../hooks/useOnScreen';

const Search = () => {
    const location = useLocation();
    const category = location.state?.category;
    const navigate = useNavigate();
    const [sliderValue, setSliderValue] = useState([0, 1000]);
    const [hasPropsChanged, setHasPropsChanged] = useState(false);
    const [filter, setFilter] = useState({
        minPrice: 0,
        maxPrice: 100000,
        sort: 'price',
        order: 'asc',
        page: 1,
        limit: 15,
        slug: [],
    });

    useEffect(() => {
        if (category) {
            setFilter((prev) => ({
                ...prev,
                slug: [category],
            }));
            setHasPropsChanged(true); // Mark that props have changed
        }
    }, [category]);

    useEffect(() => {
        if (hasPropsChanged) {
            setFilter((prev) => ({
                ...prev,
                page: 1, // Reset page to 1 if props have changed
            }));
        }
    }, [hasPropsChanged]);

    const { products, hasMore, loading, error } = useOnScreen(
        filter,
        hasPropsChanged,
        setHasPropsChanged
    );
    const observer = useRef();
    const lastProductRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    console.log('visible');
                    setFilter((prevFilter) => ({
                        ...prevFilter,
                        page: prevFilter.page + 1,
                    }));
                    console.log(filter.page);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );
    const onClickHandler = (itemId) => {
        navigate(`/product/${itemId}`);
    };

    const handleSliderChange = (newValue) => {
        setSliderValue(newValue);
        console.log(newValue);
    };

    const handleGoBtnSubmit = async () => {
        setHasPropsChanged(true);
        setFilter((prevFilter) => ({
            ...prevFilter,
            minPrice: sliderValue[0],
            maxPrice: sliderValue[1],
        }));
        console.log(filter.minPrice, filter.maxPrice);
    };


    return (
        <div className="flex flex-col w-full -z-10">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 sm:ml-20">
                <span className="text-lg font-bold">Filters: </span>
                <Select
                    label="Sort By:"
                    className="w-72"
                    size="sm"
                    variant="bordered"
                    defaultSelectedKeys={['plh']}
                    onChange={(e) => {
                        if (e.target.value === 'plh') {
                            setFilter((t) => ({
                                ...t,
                                sortBy: 'price',
                                order: 'asc',
                            }));
                        } else if (e.target.value === 'phl') {
                            setFilter((t) => ({
                                ...t,
                                sortBy: 'price',
                                order: 'desc',
                            }));
                        } else if (e.target.value === 'rlh') {
                            setFilter((t) => ({
                                ...t,
                                sortBy: 'ratingsAverage',
                                order: 'asc',
                            }));
                        } else {
                            setFilter((t) => ({
                                ...t,
                                sortBy: 'ratingsAverage',
                                order: 'desc',
                            }));
                        }
                    }}
                    placeholder=" "
                >
                    <SelectItem key="plh">Price (Low to High)</SelectItem>
                    <SelectItem key="phl">Price (High to Low)</SelectItem>
                    <SelectItem key="rlh">Rating (Low to High)</SelectItem>
                    <SelectItem key="rhl">Rating (high to Low)</SelectItem>
                </Select>
                <Slider
                    label="Price Range"
                    className="w-72"
                    radius="lg"
                    size="md"
                    step={50}
                    value={sliderValue}
                    minValue={0}
                    maxValue={1000}
                    defaultValue={[10, 400]}
                    onChange={handleSliderChange}
                    formatOptions={{ style: 'currency', currency: 'INR' }}
                />
                <div className="items-center justify-center">
                    <Button
                        color="primary"
                        onClick={() => handleGoBtnSubmit()}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleGoBtnSubmit();
                            }
                        }}
                    >
                        Go
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 mx-auto">
                {products.length > 0 && products.map((item, index) => {
                    if (products.length - 1 === index) {
                        return (
                            <div
                                key={index}
                                ref={lastProductRef}
                                className="cursor-pointer"
                                onClick={() => onClickHandler(item._id)}
                            >
                                <CardModel
                                    name={item.name}
                                    price={item.price}
                                    id={item._id}
                                    image={item.images[0]}
                                    description={item.description}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={index}
                                className="cursor-pointer"
                                onClick={() => onClickHandler(item._id)}
                            >
                                <CardModel
                                    name={item.name}
                                    price={item.price}
                                    id={item._id}
                                    image={item.images[0]}
                                    description={item.description}
                                />
                            </div>
                        );
                    }
                })}
            </div>
            {!products.length && <div className='w-full h-full flex justify-center items-center'>
                <img src="./cat.jpg" alt="" className=''/>
                </div>}
            {hasMore && (
                <div>
                    {
                        <div className="w-full h-20 my-8 flex justify-center items-center">
                            <Spinner
                                label="Loading..."
                                size="lg"
                                color="primary"
                            />
                        </div>
                    }
                </div>
            )}
            <div>{error && 'Error'}</div>
        </div>
    );
};

export default Search;
