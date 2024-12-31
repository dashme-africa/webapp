import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const apiURL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    displayAlert("");

    try {
      const response = await fetch(`${apiURL}/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(response)

      if (response.ok) {
        displayAlert("A reset link has been sent to your email address.");
      } else {
        displayAlert(data.message || "An error occurred. Please try again.", "danger");
      }
    } catch (error) {
      displayAlert("An error occurred. Please try again.");
    } finally {
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

          <Alert
            variant={alertVariant}
            show={showAlert}
            style={{
              position: 'fixed',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000
            }}
          >
            {alertMessage}
          </Alert>

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
          style={{
            backgroundColor: "#000000",
            borderRadius: "20px"
          }}
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
