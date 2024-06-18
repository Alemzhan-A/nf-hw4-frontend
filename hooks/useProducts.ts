import { useQuery } from 'react-query';
import { getProducts } from '../services/productsService';
import { Product } from '../types';

const useProducts = () => {
  return useQuery<Product[]>('products', async () => {
    const apiProducts = await getProducts();
    const storedProducts = localStorage.getItem('products');
    const localProducts = storedProducts ? JSON.parse(storedProducts) : [];
    const allProducts = [...localProducts, ...apiProducts];
    console.log('Retrieved products:', allProducts);
    return allProducts;
  });
};

export default useProducts;
