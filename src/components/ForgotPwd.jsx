import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate API call
    try {
      // Replace this with your actual API call
      setTimeout(() => {
        setMessage("A reset link has been sent to your email address.");
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-0">
        {/* Left Column: Form */}
        <div className="col-md-6 p-5 bg-light">
          <h2 className="mb-4 text-center">Forgotten your password?</h2>
          <p className="text-center mb-4">
            Enter your email address and we’ll send you instructions to reset your password.
          </p>

          {message && <div className="alert alert-success">{message}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Continue"}
            </button>
          </form>

          {/* Help Text */}
          <p className="text-center mt-3">
            <a href="/help" className="text-success text-decoration-none">
              Having trouble? 
            </a> &nbsp;
            <a href="/login" className="text-success text-decoration-none">
              Go back
            </a>
          </p>
        </div>

        {/* Right Column: Image/Logo */}
        <div
          className="col-md-6 text-center d-flex justify-content-center align-items-center rounded-lg"
          style={{ backgroundColor: "#000000", 
            borderRadius: "20px"  }}
        >
          <img
            src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733432339/Frame_4_1_2_ooduat.png" // Replace with your logo/image URL
            alt="DashMe Africa Logo"
            className="img-fluid"
            style={{ maxWidth: "70%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
