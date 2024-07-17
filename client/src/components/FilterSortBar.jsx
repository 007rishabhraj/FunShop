import React from 'react';

const FilterSortBar = ({ onSort, onFilter }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="mb-2 md:mb-0">
        <label className="mr-2">Sort by:</label>
        <select onChange={(e) => onSort(e.target.value)} className="p-2 border rounded">
          <option value="">Select</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div>
        <label className="mr-2">Filter by Category:</label>
        <select onChange={(e) => onFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
