import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // If using React Router
import { Alert } from "react-bootstrap";
const apiURL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
const [searchParams] = useSearchParams();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
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

const navigate = useNavigate();

    // Get token from the URL
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            displayAlert("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        displayAlert("");

        try {
            const response = await fetch(`${apiURL}/users/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            if (response.ok) {
                displayAlert("Password reset successful. You can now log in.");
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            } else {
                displayAlert(data.message || "Failed to reset password. Try again.", "danger");
            }
        } catch (error) {
            displayAlert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row g-0 justify-content-center">
                <div className="col-md-6 p-5 bg-light">
                    <h2 className="mb-4 text-center">Reset Password</h2>
                    <p className="text-center mb-4">
                        Enter a new password below to reset your account password.
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
                        {/* Password Input */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-success w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
