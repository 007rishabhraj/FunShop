import { useState } from "react";
import ProductList from "../components/ProductList";
import FilterSortBar from "../components/FilterSortBar";

const Search = () => {
    const productsData = [
        { id: 1, name: 'Product 1', price: 100, category: 'A' },
        { id: 2, name: 'Product 2', price: 200, category: 'B' },
        { id: 3, name: 'Product 3', price: 150, category: 'A' },
        // Add more products as needed
      ];
      const [products, setProducts] = useState(productsData);
      const [sortOption, setSortOption] = useState('');
      const [filterOption, setFilterOption] = useState('');
    
      const handleSort = (option) => {
        setSortOption(option);
        let sortedProducts = [...products];
        if (option === 'price-asc') {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'price-desc') {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
      };
    
      const handleFilter = (option) => {
        setFilterOption(option);
        if (option === '') {
          setProducts(productsData);
        } else {
          const filteredProducts = productsData.filter(
            (product) => product.category === option
          );
          setProducts(filteredProducts);
        }
      };
    
      return (
        <div className="container mx-auto p-4">
          <FilterSortBar onSort={handleSort} onFilter={handleFilter} />
          <ProductList products={products} />
        </div>
      );
};

export default Search;
