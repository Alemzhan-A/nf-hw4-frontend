import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct, uploadImages } from '../services/productsService';
import { Product } from '@/types';

const ProductForm: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (files.length > 0) {
        const imageUrl = await uploadImages(files);
        mutation.mutate({ ...product, image: imageUrl });
      } else {
        mutation.mutate(product);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-coral-light focus:outline-none"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-coral-light focus:outline-none"
          />
        </div>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-coral-light focus:outline-none"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-coral-light focus:outline-none"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-coral-light focus:outline-none"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-coral text-white py-3 px-6 rounded-lg transition-all duration-300 ${isSubmitting ? 'bg-coral-dark cursor-not-allowed' : 'hover:bg-coral-dark'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
