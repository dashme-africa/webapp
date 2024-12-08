import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const UploadPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [activeTab, setActiveTab] = useState('sell');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    price: '',
    priceCategory: '$0-50',
    location: '',
    image: null, // Change to single image URL
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploader, setUploader] = useState(null); // Store uploader info


  // Fetch uploader info on component mount
  useEffect(() => {
    const fetchUploader = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://dashmeafrica-backend.vercel.app/api/userProfile/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUploader(response.data); // Set uploader info
        } catch (error) {
          console.error('Failed to fetch uploader info:', error);
        }
      }
    };

    fetchUploader();
  }, []);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({
      title: '',
      description: '',
      category: 'Electronics',
      price: '',
      priceCategory: '$0-50',
      location: '',
      image: null, // Change to single image URL
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Create a FormData object
      const updatedData = new FormData();
  
      // Append form fields
      updatedData.append('title', formData.title);
      updatedData.append('description', formData.description);
      updatedData.append('category', formData.category);
      updatedData.append('price', formData.price);
      updatedData.append('priceCategory', formData.priceCategory);
      updatedData.append('location', formData.location);
  

      if (uploader) {
        updatedData.append('uploader', uploader._id); // Assuming _id is the user ID
      }

      // Append the image only if it exists
      if (formData.image) {
        updatedData.append('image', formData.image);
      }
  
      // Log the FormData content for debugging
      // updatedData.forEach((value, key) => {
      //   console.log(key, value);
      // });
  
//       // Determine the endpoint based on activeTab
      const endpoint = activeTab === 'sell'  
        ? 'https://dashmeafrica-backend.vercel.app/api/products' 
        // ? 'http://localhost:5000/api/products' 
        : 'https://dashmeafrica-backend.vercel.app/api/products/donate';
  
      // Send the data to the server
      const response = await axios.post(endpoint, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert(`Product Successfully Uploaded`);
  
      // Reset the form
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        priceCategory: '',
        location: '',
        image: null,
      });

      // Redirect to the home page
      navigate('/'); // Replace '/' with the route to your home page if different
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  
  return (
    <div className="container mt-5">
      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn me-2 ${activeTab === 'sell' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => handleTabChange('sell')}
        >
          Sell
        </button>
        <button
          className={`btn ${activeTab === 'donate' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => handleTabChange('donate')}
        >
          Donate
        </button>
      </div>

      {/* Form Content */}
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">{activeTab === 'sell' ? 'Sell' : 'Donate'}</h3>

            {/* Image Upload */}
            <div className="mb-3 text-center">
              <label
                htmlFor="imageUpload"
                className="d-block border border-2 border-secondary rounded bg-light p-5"
                style={{ cursor: 'pointer' }}
              >
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="img-fluid"
                    style={{ maxHeight: '150px' }}
                  />
                ) : (
                  <span className="text-muted">Click to upload a photo</span>
                )}
              </label>
              <input
                type="file"
                id="imageUpload"
                className="d-none"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Item Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {activeTab === 'sell' ? (
                  <>
                    <option value="clothes">Clothes</option>
                    <option value="electronics">Electronics</option>
                    <option value="accessories">Accessories</option>
                    <option value="household-items">Household Items</option>
                  </>
                ) : (
                  <>
                    <option value="clothes">Clothes</option>
                    <option value="electronics">Electronics</option>
                    <option value="accessories">Accessories</option>
                    <option value="household-items">Household Items</option>
                  </>
                )}
              </select>
            </div>

            {/* Price */}
            {activeTab === 'sell' && (
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </div>
            )}

            {/* Price Category */}
            {activeTab === 'sell' && (
            <div className="mb-3">
              <label className="form-label">Price Category</label>
              <select
                className="form-select"
                name="priceCategory"
                value={formData.priceCategory}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                  <>
                    <option value="500-15000">N500 - N15,000</option>
                    <option value="15000-25000">N15,000 - N25,000</option>
                    <option value="25000-50000">N25,000 - N50,000</option>
                  </>
                
              </select>
            </div>
            )}

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
