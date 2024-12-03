// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: 'Electronics',
//     subcategory: '',
//     price: '',
//     priceCategory: '$0-50',
//     location: '',
//     image: '', // Change to single image URL
//     isPremium: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCheckboxChange = () => {
//     setFormData({ ...formData, isPremium: !formData.isPremium });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.category || !formData.price || !formData.image) {
//       console.error('Error: Please fill all required fields and upload at least one image');
//       return;
//     }

//     try {
//       const response = await axios.post('https://dashmeafrica-backend.vercel.app/api/products', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Product uploaded:', response.data);
//     } catch (error) {
//       console.error('Error uploading product:', error.response?.data?.message || error.message);
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       name: '',
//       description: '',
//       category: 'Electronics',
//       subcategory: '',
//       price: '',
//       priceCategory: '$0-50',
//       location: '',
//       image: '', // Clear image URL
//       isPremium: false,
//     });
//   };

//   return (
//     <div className="container py-5">
//       <div className="col-md-6 mx-auto bg-white p-4 border rounded">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               placeholder="Enter a catchy name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               id="description"
//               name="description"
//               placeholder="Provide more detailed information"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="category" className="form-label">Item Category</label>
//             <select
//               className="form-select"
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//             >
//               <option>Electronics</option>
//               <option>Clothes</option>
//               <option>Furniture</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="subcategory" className="form-label">Subcategory</label>
//             <input
//               type="text"
//               className="form-control"
//               id="subcategory"
//               name="subcategory"
//               placeholder="e.g. Smartphones, Laptops"
//               value={formData.subcategory}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="price" className="form-label">Price</label>
//             <input
//               type="number"
//               className="form-control"
//               id="price"
//               name="price"
//               placeholder="e.g. 499.99"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="priceCategory" className="form-label">Price Category</label>
//             <select
//               className="form-select"
//               id="priceCategory"
//               name="priceCategory"
//               value={formData.priceCategory}
//               onChange={handleChange}
//             >
//               <option>$0-50</option>
//               <option>$51-200</option>
//               <option>$200+</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="location" className="form-label">Location</label>
//             <input
//               type="text"
//               className="form-control"
//               id="location"
//               name="location"
//               placeholder="City or postal code"
//               value={formData.location}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="image" className="form-label">Image URL</label>
//             <input
//               type="text"
//               className="form-control"
//               id="image"
//               name="image"
//               placeholder="Enter image URL"
//               value={formData.image}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="d-flex justify-content-between mb-3">
//             <div>
//               <div className="form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="premium"
//                   checked={formData.isPremium}
//                   onChange={handleCheckboxChange}
//                 />
//                 <label className="form-check-label" htmlFor="premium">
//                   Show as premium
//                 </label>
//               </div>
//             </div>
//             <div>
//               <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
//               <button type="submit" className="btn btn-primary">Submit</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadForm;


import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadPage = () => {
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
  
      // Append the image only if it exists
      if (formData.image) {
        updatedData.append('image', formData.image);
      }
  
      // Log the FormData content for debugging
      updatedData.forEach((value, key) => {
        console.log(key, value);  // Debugging the FormData
      });
  
      // Determine the endpoint based on activeTab
      const endpoint = activeTab === 'sell'  
        ? 'https://dashmeafrica-backend.vercel.app/api/products' 
        : 'http://localhost:5000/api/products';
  
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
                    <option value="books">Books</option>
                    <option value="clothes">Clothes</option>
                    <option value="other">Other</option>
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
                {activeTab === 'sell' ? (
                  <>
                    <option value="500-25000">N500 - N25,000</option>
                    <option value="25000-50000">N25,000 - N50,000</option>
                  </>
                ) : (
                  <>
                    <option value="books">Books</option>
                    <option value="clothes">Clothes</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>
            </div>

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
