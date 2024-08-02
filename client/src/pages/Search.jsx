import { useState, useEffect } from 'react';
import { axiosInstance } from '../App';
import ProductCard from '../components/ProductCard';
import { Select, SelectItem, Slider, Spinner } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParam] = useSearchParams();
    const keyword = searchParam.get('keyword');
    const [filter, setFilter] = useState({
        keyword: keyword ? keyword : '',
        order: 'asc',
        sortBy: 'price',
        minPrice: 0,
        maxPrice: 10000000,
    });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    useEffect(() => {
        if (keyword) {
            setFilter((t) => ({ ...t, keyword: keyword ? keyword : '' }));
        } else {
            setFilter((t) => ({ ...t, keyword: '' }));
        }
    }, [keyword]);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/product?keyword=${filter.keyword}&order=${filter.order}&field=${filter.sortBy}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&page=${page}`
                );

                const productsData = response.data.data.products;
                setTotalPage(response.data.total);
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filter, page]);

    return (
        <div className="flex flex-col  w-full ">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4  sm:ml-20">
                <span className="text-lg font-bold ">Filters: </span>
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
                    minValue={0}
                    maxValue={100000}
                    defaultValue={[0, 100000]}
                    formatOptions={{ style: 'currency', currency: 'INR' }}
                />
            </div>
            {loading && (
                <div className="h-[100vh] w-full flex justify-center items-center">
                    <Spinner label="Loading..." size="lg" color="primary" />
                </div>
            )}
            {!loading && (
                <>
                    <ProductCard
                        products={products}
                        totalPage={totalPage}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </div>
    );
};

export default Search;
