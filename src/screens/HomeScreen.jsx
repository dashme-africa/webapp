import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';
const apiURL = import.meta.env.VITE_API_URL;

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/products`);
        // Sort products by createdAt in descending order
        const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Header Row with "Recommended for You" and "See All" */}
      <Row className="align-items-center mb-1 mt-5 px-5">
        <Col>
          <h4 className="mb-0">Recommended for You</h4>
        </Col>
        <Col className="text-end">
          <Link to="/products" className="text-success fs-5 text-decoration-none">
            See All
          </Link>
        </Col>
      </Row>

      {/* Product Cards */}
      <Row className="px-5">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
