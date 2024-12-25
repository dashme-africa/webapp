import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL; s

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${apiURL}/users/register`,
        formData
      );
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-0">
        {/* Left Column: Form */}
        <div className="col-md-6 p-5 bg-light">
          <h2 className="mb-4">Register with email</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100"
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
            <a className="text-decoration-none text-success" href="/help">
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

