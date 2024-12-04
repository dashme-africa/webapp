import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        'https://dashmeafrica-backend.vercel.app/api/users/register',
        formData
      );
      alert('Registration Successful');
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      setError(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
    <p className='text-center fs-4 mb-5'>Already registered? <a className='text-decoration-none text-success' href="/login">Log In</a></p>
      <h2 className="text-center mb-4">Register with email</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* <label className="form-label">Full name</label> */}
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name eg. Felix Ekong…"
            required
          />
        </div>
        <div className="mb-3">
          {/* <label className="form-label">Username</label> */}
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username eg. Fel24…"
            required
          />
        </div>
        <div className="mb-3">
          {/* <label className="form-label">Email</label> */}
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email eg. felixek..@gmail.com"
            required
          />
        </div>
        <div className="mb-3">
          {/* <label className="form-label">Password</label> */}
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          {/* <label className="form-label">Confirm Password</label> */}
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
