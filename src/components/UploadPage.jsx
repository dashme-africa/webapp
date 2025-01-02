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
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch uploader info:', error);
        }
      } else {
        displayAlert('Please log in to access the upload page.', 'danger');
        const timer = setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);

        return () => clearTimeout(timer);
        }
      };
      fetchUploader();
    }, [navigate]);


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
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...(prevData.images || []), ...files],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check for image file sizes (10MB limit)
    if (formData.images && formData.images.some((file) => file.size > 10 * 1024 * 1024)) {
      displayAlert('Each Image file size should not exceed 10MB', 'danger');
      setIsSubmitting(false);
      return;
    }

    // Frontend validation for the number of images
    if (formData.images && formData.images.length > 10) {
      displayAlert(t('upload.maxImagesError'), 'danger');
      setIsSubmitting(false);
      return;
    }

    if (formData.video && formData.video.size > 10 * 1024 * 1024) { // 10MB limit
      displayAlert('Video file size should not exceed 10MB', 'danger');
      setIsSubmitting(false);
      return;
    }

    // Ensure video is compulsory for specific categories
    const categoriesRequiringVideo = ['Accessories', 'Household-Items', 'Electronics'];
    if (
      categoriesRequiringVideo.includes(formData.category) &&
      (!formData.video || formData.video === null)
    ) {
      displayAlert('A video is required for the selected category', 'danger');
      setIsSubmitting(false);
      return;
    }

    try {

        // Verify uploader profile completeness
      if (!uploader || !uploader.fullName || !uploader.email || !uploader.phoneNumber || !uploader.address) {
        displayAlert('Please complete your profile before uploading a product.', 'danger');
        setIsSubmitting(false);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
        return;
      }

      // Verify uploader
      if (uploader && !uploader.isVerified) {
        displayAlert(t('upload.verifiedError'), 'danger');
        setIsSubmitting(false);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
        return;
      }
      
      // Create FormData
      const updatedData = new FormData();

      // Append all fields from formData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file) => updatedData.append('images', file));
        } else if (key === 'video') {
          if (value) updatedData.append('video', value);
        } else {
          updatedData.append(key, value);
        }
      });


      // Add the primary image index
      if (formData.primaryImageIndex !== null && formData.primaryImageIndex >= 0) {
        updatedData.append('primaryImageIndex', formData.primaryImageIndex);
      } else {
        displayAlert(t('upload.selectPrimaryImage'), 'danger');
        setIsSubmitting(false);
        return;
      }

      // Append uploader ID if available
      if (uploader) {
        updatedData.append('uploader', uploader._id);
      }

      // Ensure at least one image is uploaded
      if (!formData.images || formData.images.length === 0) {
        displayAlert(t('upload.addImageError'), 'danger');
        setIsSubmitting(false);
        return;
      }

      // Determine the endpoint based on activeTab
      const endpoint = activeTab === 'sell'
        ? `${apiURL}/products`
        : `${apiURL}/products/donate`;

      // Send data to the server
      const response = await axios.post(endpoint, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form data
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        priceCategory: '',
        location: '',
        images: [],
        video: null,
        primaryImageIndex: null,
      });

      // Show success message
      displayAlert(t('upload.successMessage'));

      // Redirect after a delay
      setTimeout(() => navigate('/'), 3000);

    } catch (error) {
      if (error.response) {
        displayAlert(`${error.response.data.message}`, 'danger');
      } else {
        displayAlert('An unexpected error occurred.', 'danger');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
        primaryImageIndex:
          prevData.primaryImageIndex === index
            ? null
            : prevData.primaryImageIndex > index
              ? prevData.primaryImageIndex - 1
              : prevData.primaryImageIndex,
      };
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
      displayAlert('Video file size should not exceed 10MB', 'danger');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      video: file,
    }));
  };

  const myProducts = () => {
    navigate('/my-products');
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" className="ms-2 mb-4" onClick={myProducts}>{t('upload.myProducts')}</Button>
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


            <Alert
              variant={alertVariant}
              show={showAlert}
              style={{
                position: 'fixed',
                top: '10%',
                left: '50%',
                zIndex: 1000,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {alertMessage}
            </Alert>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="imageUpload" className="form-label">{t('upload.uploadPhotos')}</label>
              <input
                type="file"
                id="imageUpload"
                className="form-control"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="mt-3 d-flex flex-wrap gap-3">
                {formData.images?.map((image, index) => (
                  <div key={index} className="image-preview position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="img-thumbnail"
                      style={{ width: '100px', marginRight: '10px' }}
                    />
                    <div>
                      <input
                        type="radio"
                        name="primaryImage"
                        value={index}
                        checked={formData.primaryImageIndex === index}
                        onChange={() =>
                          setFormData((prevData) => ({ ...prevData, primaryImageIndex: index }))
                        }
                      />
                      <label>&nbsp;{t('upload.setAsPrimary')}</label>
                    </div>
                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0"
                      onClick={() => handleRemoveImage(index)}
                    ></button>
                  </div>
                ))}
              </div>
              <i>Upload multiple photos for items with multiple views (e.g., right, left, top, bottom) to ensure credibility. Each image should not exceed 10MB.
              </i>
            </div>

            <div className="mb-3">
              <label htmlFor="videoUpload" className="form-label">Upload a Product Video</label>
              <input
                type="file"
                id="videoUpload"
                className="form-control"
                accept="video/*"
                onChange={handleVideoChange}
              />
              <i>Please upload a proof video of the product to verify its authenticity. This video will be reviewed by our admin team before your product is approved for display.</i>
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
                    <option value="Accessories">Accessories - sandals, watches, shoes etc</option>
                    <option value="Household-Items">Household Items</option>
                  </>
                ) : (
                  <>
                    <option value="Clothes">Clothes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories - sandals, watches, shoes etc</option>
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
