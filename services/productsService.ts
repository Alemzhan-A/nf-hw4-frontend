import axiosInstance from './axiosInstance';
import { Product } from '../types';

const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get('/products');
  return data;
};

const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  const newProduct = { ...product, id: products.length + 1 };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axiosInstance.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.location;
};

const uploadImages = async (files: File[]): Promise<string> => {
  if (files.length > 0) {
    return uploadImage(files[0]);
  }
  return '';
};

export { getProducts, createProduct, uploadImage, uploadImages };
