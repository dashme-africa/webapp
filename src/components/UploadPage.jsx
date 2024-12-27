import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const apiURL = import.meta.env.VITE_API_URL;


const UploadPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sell');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    priceCategory: '',
    location: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploader, setUploader] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const displayAlert = (message, variant = 'success', duration = 5000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };

  // Fetch uploader info on component mount
  useEffect(() => {
    const fetchUploader = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${apiURL}/userProfile/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUploader(response.data);
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
      category: '',
      price: '',
      priceCategory: '',
      location: '',
      image: null,
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
      if (uploader && !uploader.isVerified) {
        displayAlert(t('upload.verifiedError'), 'danger');
        setIsSubmitting(false);
        return;
        // Redirect to the home page
      }
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
        updatedData.append('uploader', uploader._id);
      }

      // Append the image only if it exists
      if (formData.image) {
        updatedData.append('image', formData.image);
      } else {
        displayAlert(t('upload.addImageError'), 'danger');
      }

      // Determine the endpoint based on activeTab
      const endpoint = activeTab === 'sell'
        ? `${apiURL}/products`
        : `${apiURL}/products/donate`;

      try {
        // Send the data to the server
        const response = await axios.post(endpoint, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


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

        // console.log('Success:', response.data);
        displayAlert(t('upload.successMessage'));

        setTimeout(() => {
          // Redirect to the home page
          navigate('/');
        }, 3000);

      } catch (error) {
        if (error.response) {
          // console.error('Error uploading data:', error.response.data.message);
          displayAlert(`${error.response.data.message}`, 'danger');
        } else {
          // console.error('Unexpected error:', error.message);
          displayAlert('An unexpected error occurred.', 'danger');
        }
      }
    } catch (error) {
      // console.error('Error uploading data:', error);
      displayAlert(t('upload.errorMessage'), 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const myProducts = () => {
    navigate('/my-products');
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" className="ms-2" onClick={myProducts}>{t('upload.myProducts')}</Button>
      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn me-2 ${activeTab === 'sell' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => handleTabChange('sell')}
        >
          {t('upload.sell')}
        </button>
        <button
          className={`btn ${activeTab === 'donate' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => handleTabChange('donate')}
        >
          {t('upload.donate')}
        </button>
      </div>

      {/* Form Content */}
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">{activeTab === 'sell' ? t('upload.sell') : t('upload.donate')}</h3>
            <Alert variant={alertVariant} show={showAlert}>
              {alertMessage}
            </Alert>
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
                  <span className="text-muted">{t('upload.uploadPhotos')}</span>
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
              <label className="form-label">{t('upload.title')}</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t('upload.enterTitle')}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">{t('upload.description')}</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('upload.enterDescription')}
                required
              ></textarea>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">{t('upload.itemCategory')}</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  {t('upload.selectCategory')}
                </option>
                {activeTab === 'sell' ? (
                  <>
                    <option value="Clothes">Clothes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Household-Items">Household Items</option>
                  </>
                ) : (
                  <>
                    <option value="Clothes">Clothes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Household-Items">Household Items</option>
                  </>
                )}
              </select>
            </div>

            {/* Price */}
            {activeTab === 'sell' && (
              <div className="mb-3">
                <label className="form-label">{t('upload.price')}</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder={t('upload.enterPrice')}
                  required
                />
              </div>
            )}

            {/* Price Category */}
            {activeTab === 'sell' && (
              <div className="mb-3">
                <label className="form-label">{t('upload.priceCategory')}</label>
                <select
                  className="form-select"
                  name="priceCategory"
                  value={formData.priceCategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    {t('upload.selectCategory')}
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
              <label className="form-label">{t('upload.location')}</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t('upload.enterLocation')}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('upload.submitting') : t('upload.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
