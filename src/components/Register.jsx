import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const apiURL = import.meta.env.VITE_API_URL;
const siteKey = "6LcNPqwqAAAAAGaqwfOrxhB8t8av07unRcvt-UfC"; // Google reCAPTCHA site key

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null); // Store the reCAPTCHA token
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const navigate = useNavigate();
  
  const displayAlert = (message, variant = 'success', duration = 5000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token); // Store reCAPTCHA token on verification
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      displayAlert("Please complete the reCAPTCHA verification.", "danger");
      return;
    }

    if (!formData.password || !formData.confirmPassword || !formData.fullName || !formData.username || !formData.email) {
      displayAlert('All fields are required', 'danger');
      return
    }

    if (formData.password !== formData.confirmPassword) {
      displayAlert('Passwords do not match.', 'danger');
      return
    }

    // Check if username looks like an email address
    const usernameLooksLikeEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.username);
    if (usernameLooksLikeEmail) {
      displayAlert('Username cannot be an email address.', 'danger');
      return;
    }

    setIsSubmitting(true);

    const data = { ...formData, captchaToken }; // Include captchaToken in the data

    try {
      const response = await axios.post(
        `${apiURL}/users/register`,
        data,
      );

      displayAlert('Registration Successful.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      displayAlert(errorMessage, "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="g-recaptcha" data-sitekey="6LcNPqwqAAAAAGaqwfOrxhB8t8av07unRcvt-UfC"></div>
      <div className="row g-0">
        {/* Left Column: Form */}
        <div className="col-md-6 p-5 bg-light">
          <h2 className="mb-4">Register with email</h2>
          <Alert variant={alertVariant} show={showAlert}>
            {alertMessage}
          </Alert>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name (e.g., Felix Ekong)"
                required
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username (e.g., Fel24)"
                required
              />
              <small className="form-text text-muted">
                Please use only letters and numbers. Pick something unique — usernames can't be changed later.
              </small>
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (e.g., felixek..@gmail.com)"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
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

            {/* Confirm Password */}
            <div className="mb-4">
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

            {/* Terms */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheckbox"
                required
              />
              <label htmlFor="termsCheckbox" className="form-check-label">
                I’d like to receive promotional offers and updates about DashMe Africa.
              </label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeCheckbox"
                required
              />
              <label htmlFor="agreeCheckbox" className="form-check-label">
              <p className="mr-2">I agree to DashMe Africa <a href="https://docs.google.com/document/d/1AViIna3B8tHU7kk_sEHDod9LanB9MerP/edit#heading=h.gjdgxs">T&Cs</a></p>
              
              </label>
            </div>

            {/* Add reCAPTCHA */}
            <ReCAPTCHA sitekey={siteKey} onChange={handleCaptcha} />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success mt-4 w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a className="text-decoration-none text-success" href="/login">
              Log In
            </a>
          </p>
          <p className="text-center">
            <a className="text-decoration-none text-success" href="https://wa.me/message/7J6DBJ5F6ESGB1">
              Having trouble?
            </a>
          </p>
        </div>

        {/* Right Column: Image/Logo */}
        <div
          className="col-md-6 text-center d-flex justify-content-center align-items-center rounded-lg"
          style={{
            backgroundColor: "#000000",
            borderRadius: "20px"
          }}
        >

          <img
            src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733432339/Frame_4_1_2_ooduat.png"
            alt="DashMe Africa Logo"
            className="img-fluid"
            style={{ maxWidth: "70%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

