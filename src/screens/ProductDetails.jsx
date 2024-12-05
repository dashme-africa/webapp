// src/screens/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route params
import axios from 'axios';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://dashmeafrica-backend.vercel.app/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center my-5">{error}</Alert>;
  }

  return (
    product && (
      <div className="container my-5">
        <Card className="border-0 shadow">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title className="fs-3">{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>
              <strong>Category:</strong> {product.category}
            </Card.Text>
            {product.tag === 'sell' && (
              <>
                <Card.Text>
                  <strong>Price:</strong> N{product.price}
                </Card.Text>
                <Card.Text>
                  <strong>Price Category:</strong> {product.priceCategory}
                </Card.Text>
              </>
            )}
            <Card.Text>
              <strong>Location:</strong> {product.location}
            </Card.Text>
            <Card.Text>
              <strong>Tag:</strong> {product.tag}
            </Card.Text>
            <Button variant="success" className="text-white">
              {product.tag === 'sell' ? 'Buy Now' : 'Donate'}
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  );
};

export default ProductDetails;
