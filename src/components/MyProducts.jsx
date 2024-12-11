import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploaderId, setUploaderId] = useState(null);  // State for the current user ID

  useEffect(() => {
    // Function to fetch the current user data (from localStorage or API)
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const { data } = await axios.get(
            'https://dashmeafrica-backend.vercel.app/api/userProfile/profile',
            // "https://dashmeafrica-backend.vercel.app/api/userProfile/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const currentUserId = data._id;  // Assuming the user ID is in response.data.user._id
          setUploaderId(currentUserId);  // Set the uploader ID for fetching products
        } catch (err) {
          setError('Failed to fetch user data. Please try again.');
        }
      }
    };

    fetchUserData();
  }, []);  // Empty dependency array means this effect runs only once after the first render

  useEffect(() => {
    if (uploaderId) {
      const fetchMyProducts = async () => {
        try {
          const response = await axios.get(`https://dashmeafrica-backend.vercel.app/api/myProducts?uploader=${uploaderId}`);
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          setError('You have not uploaded any product');
          setLoading(false);
        }
      };

      fetchMyProducts();
    }
  }, [uploaderId]);  // This effect will run every time uploaderId is updated

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dashmeafrica-backend.vercel.app/api/myProducts/delete/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingProduct(null);
    setShowModal(false);
  };

  const handleModalSave = async () => {
    try {
      const { _id, ...updatedProduct } = editingProduct;
      const response = await axios.put(`https://dashmeafrica-backend.vercel.app/api/myProducts/${_id}`, updatedProduct);
      setProducts(products.map((prod) => (prod._id === _id ? response.data : prod)));
      handleModalClose();
    } catch (err) {
      alert('Failed to save changes. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">My Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-muted">
          <h4>You have not uploaded any product</h4>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={4} className="mb-4" key={product._id}>
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>Price:</strong> N{product.price}</Card.Text>
                  <Button variant="primary" className="me-2" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
  
      {/* Modal for editing product */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProductsPage;
