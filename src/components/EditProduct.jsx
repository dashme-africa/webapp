import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const apiURL = import.meta.env.VITE_API_URL;

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
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
        const { data } = await axios.get(`${apiURL}/adminProduct/${id}`, config);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('location', product.location);
      formData.append('tag', product.tag);
      formData.append('priceCategory', product.priceCategory);

      // If there's an image, append it to the form data
      if (image) {
        formData.append('image', image);
      }

      // Log the FormData content for debugging
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${apiURL}/adminProduct/${id}`,
        formData,
        config
      );
      console.log(data);

      // Set success message after successful update
      setSuccessMessage('Product updated successfully!');
      setError('');
      setTimeout(() => {
        navigate('/adminDashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container my-5">
      <h1>Edit Product</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={product.title || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description || ''}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price || ''}
            onChange={handleChange}
            disabled={product.tag === 'donate'}
          />
        </div>
        <div className="mb-3">
          <label>Price Category</label>
          <input
            type="text"
            className="form-control"
            name="priceCategory"
            value={product.priceCategory || ''}
            onChange={handleChange}
            disabled={product.tag === 'donate'}
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={product.category || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={product.location || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Tag (sell or donate)</label>
          <select
            className="form-control"
            name="tag"
            value={product.tag || 'sell'}
            onChange={handleChange}
          >
            <option value="sell">Sell</option>
            <option value="donate">Donate</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {product.image && (
            <div className="mt-3">
              <img
                src={product.image}
                alt="Product"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
