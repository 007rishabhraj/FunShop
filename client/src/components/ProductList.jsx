import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
