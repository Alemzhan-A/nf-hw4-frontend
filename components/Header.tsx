import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-coral text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Otirik OLX</h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="relative group">
              <a href="/" className="px-3 py-2 block rounded-md transition-colors duration-300 hover:bg-coral-dark">
                Home
              </a>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
              <a href="/" className="px-3 py-2 block rounded-md transition-colors duration-300 hover:bg-coral-dark">
                Products
              </a>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
              <a href="/create-product" className="px-3 py-2 block rounded-md transition-colors duration-300 hover:bg-coral-dark">
                Add Product
              </a>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
