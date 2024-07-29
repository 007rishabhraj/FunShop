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
    <div className="flex w-full ">
      <div className="bg-red-600 w-[20%]">asdf</div>
      <div
        className=" w-[80%]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <ProductCard products={products} />
      </div>
    </div>
  );
};

export default Search;
