import React from 'react';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">${product.price}</p>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;