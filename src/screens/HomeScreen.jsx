import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // State to store products

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://dashmeafrica-backend.vercel.app/api/products'); // Make a GET request to your backend
        setProducts(data); // Store fetched products in state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []); // Empty array ensures this runs only once when the component mounts

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
            {console.log(product)}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
