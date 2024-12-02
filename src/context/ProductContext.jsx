import React, { createContext, useContext, useState } from 'react';

// Create a Context for the products
const ProductContext = createContext();

// Custom hook to use the ProductContext
export const useProducts = () => useContext(ProductContext);

// Provider component to wrap the app
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { _id: '1', name: 'Example Product 1', image: 'https://via.placeholder.com/150' },
    { _id: '2', name: 'Example Product 2', image: 'https://via.placeholder.com/150' },
  ]);

  const addProduct = (product) => setProducts((prev) => [...prev, product]);

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
