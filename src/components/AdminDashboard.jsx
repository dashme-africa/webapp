import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/adminLogin');
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          'https://dashmeafrica-backend.vercel.app/api/adminProduct',
          config
        );
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      }
    };

    fetchProducts();
  }, [navigate]);

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(
          `https://dashmeafrica-backend.vercel.app/api/adminProduct/${id}`,
          config
        );
        setProducts(products.filter((product) => product._id !== id));
      } catch (err) {
        // Add better error logging
        console.error('Error:', err);  // Log the complete error for debugging
        setError(
          err.response?.data?.message || 'Failed to delete product. Please try again later.'
        );
      }
    }
  };
  

  const editProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className="container my-5">
      <h1>Admin Dashboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image || '/placeholder.png'} // Provide a placeholder image URL for missing images
                  alt={product.title}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description || 'No description available'}</td>
              <td>
                {product.tag === 'donate' ? 'N/A' : product.price || 'Not provided'}
              </td>
              <td>{product.category}</td>
              <td>{product.tag || 'Not specified'}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => editProduct(product._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
