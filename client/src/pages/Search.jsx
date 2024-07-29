import { useState, useEffect } from 'react';
import { axiosInstance } from '../App';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/product');
        console.log(response.data.data.products);
        const productsData = response.data.data.products;
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex  w-full ">
      <div className="w-72 hidden md:block border-r-4 border-gray-900 ">
        filters
      </div>
      <ProductCard products={products} />
    </div>
  );
};

export default Search;
