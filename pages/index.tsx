import useProducts from '../hooks/useProducts';
import ProductList from '../components/ProductList';

const Home = () => {
  const { data, error, isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={data || []} />
    </div>
  );
};

export default Home;
