import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get(
            'https://dashmeafrica-backend.vercel.app/api/userProfile/profile',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
          setFormData({
            firstName: response.data.fullName || '',
            lastName: response.data.lastname || '',
            username: response.data.username || '',
            email: response.data.email || '',
            address: response.data.address || '',
            bio: response.data.bio || '',
          });
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        // 'https://dashmeafrica-backend.vercel.app/api/userProfile/profile',
        'http://localhost:5000/api/userProfile/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row g-0">
        <div className="col-md-4 bg-light text-center p-4">
          <div className="mb-4">
            <img
              src={image || user.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="rounded-circle img-fluid"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <label className="btn btn-outline-primary btn-sm">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="d-none"
            />
          </label>
          <h3 className="fw-bold">{user.username || 'Buzz Brain'}</h3>
        </div>
        <div className="col-md-8 p-4">
          <h4 className="fw-bold">Edit Your Profile</h4>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
