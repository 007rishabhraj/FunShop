import { useState, useEffect, useMemo } from 'react';
import { axiosInstance } from '../App';
import ProductCard from '../components/ProductCard';
import {
    Slider,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Spinner,
} from '@nextui-org/react';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState({
        all: true,
        under999: false,
        between999And1499: false,
        between1499And1999: false,
        above1999: false,
    });
    const constructQueryParams = (selectedOptions) => {
        const queryParams = [];
        if (selectedOptions.under999) queryParams.push('price[lt]=999');
        if (selectedOptions.exactly999) queryParams.push('price=999');
        if (selectedOptions.between999And1499)
            queryParams.push('price[gte]=999&price[lte]=1499');
        if (selectedOptions.between1499And1999)
            queryParams.push('price[gte]=1499&price[lte]=1999');
        if (selectedOptions.above1999) queryParams.push('price[gt]=1999');

        return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    };
    const handleCheckboxChange = (option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: !selectedOptions[option],
        });
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             setInterval(() => {
    //                 console.log('running');
    //             }, 5000);
    //             const queryParams = constructQueryParams(selectedOptions);
    //             const response = await axiosInstance.get(
    //                 `/product`
    //             );
    //             console.log(response.data.data.products);
    //             const productsData = response.data.data.products;
    //             setProducts(productsData);
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         }
    //         setLoading(false);
    //     };

    //     fetchProducts();
    // }, [selectedOptions]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const queryParams = constructQueryParams(selectedOptions);
                const response = await axiosInstance.get(`/product`);
                console.log(response.data.data.products);
                const productsData = response.data.data.products;
                setTimeout(() => {
                    setProducts(productsData);
                    setLoading(false);
                }, 1500); // Wait for 2 seconds
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedOptions]);

    return (
        <div className="flex  w-full ">
            <div className="w-72 hidden md:block border-r-4 border-gray-900">
                <div className="flex flex-col bg-emerald-800 p-2">
                    <div className="text-white flex justify-center text-2xl p-2 font-semibold">
                        Filters
                    </div>
                    <div className="p-4 bg-white rounded shadow-md w-64">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <h2 className="text-lg font-semibold">
                                Price ( INR )
                            </h2>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${
                                    isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </div>
                        {isOpen && (
                            <ul className="mt-4">
                                <li className="mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            checked={selectedOptions.all}
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            onChange={() =>
                                                handleCheckboxChange('under999')
                                            }
                                        />
                                        <span className="ml-2">All</span>
                                    </label>
                                </li>
                                <li className="mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            checked={
                                                selectedOptions.between999And1499
                                            }
                                            type="checkbox"
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    'between999And1499'
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2">
                                            &#8377; 999 - &#8377; 1,499
                                        </span>
                                    </label>
                                </li>
                                <li className="mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            checked={
                                                selectedOptions.between1499And1999
                                            }
                                            type="checkbox"
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    'between1499And1999'
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2">
                                            &#8377; 1,499 - &#8377; 1,999
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <label className="inline-flex items-center">
                                        <input
                                            checked={selectedOptions.above1999}
                                            type="checkbox"
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    'above1999'
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2">
                                            Above &#8377; 1,999
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            {loading && (
                <div className="h-[100vh] w-full flex justify-center items-center">
                    <Spinner size="lg" color="primary" />
                </div>
            )}
            {!loading && <ProductCard products={products} />}
        </div>
    );
};

export default Search;
