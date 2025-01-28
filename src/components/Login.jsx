import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
const apiURL = import.meta.env.VITE_API_URL;
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const [passwordType, setPasswordType] = useState("password");
	const [icon, setIcon] = useState(<FaEyeSlash />);
	const navigate = useNavigate();
	// Redirect if already logged in
	// useEffect(() => {
	//   if (localStorage.getItem("token")) {
	//     navigate("/");
	//   }
	// }, [navigate]);

	const displayAlert = (message, variant = "success", duration = 5000) => {
		setAlertMessage(message);
		setAlertVariant(variant);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, duration);
	};

	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			setIcon(<FaEye />);
		} else {
			setPasswordType("password");
			setIcon(<FaEyeSlash />);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await axios.post(`${apiURL}/users/login`, {
				email,
				password,
			});

			// Save token to local storage
			localStorage.setItem("token", response.data.token);

			displayAlert("Login Successful", "success");
			setTimeout(() => {
				// Navigate to home page
				navigate("/");
			}, 2000);
		} catch (error) {
			displayAlert(
				error.response?.data?.message || "Invalid credentials",
				"danger"
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
					<h2 className="mb-4 text-center">Welcome Back!</h2>
					{/* <Alert variant={alertVariant} show={showAlert}>
            {alertMessage}
          </Alert> */}
					{showAlert && (
						<p
							className={`px-3 mb-4 py-2 border ${
								alertVariant == "success"
									? "text-green-700 border-green-700"
									: "text-red-700 border-red-700"
							}`}
						>
							{alertMessage}
						</p>
					)}
					<form onSubmit={handleSubmit}>
						{/* Email */}
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="form-control"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email (e.g., felixek@gmail.com)"
								required
							/>
						</div>

						{/* Password */}
						<div className="mb-3 ">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<div className="position-relative">
								<input
									type={passwordType}
									id="password"
									className="form-control"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									required
								/>
								<span
									className="position-absolute p-2 top-50 end-0 translate-middle-y cursor-pointer"
									onClick={togglePassword}
								>
									{icon}
								</span>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-success w-100"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Logging in..." : "Login"}
						</button>
					</form>

					{/* Additional Links */}
					<p className="text-center mt-3">
						Don't have an account?{" "}
						<a className="text-decoration-none text-success" href="/register">
							Sign Up
						</a>
					</p>
					<p className="text-center">
						<a
							className="text-decoration-none text-success"
							href="/forgot-password"
						>
							Forgot Password?
						</a>
					</p>
				</div>

				{/* Right Column: Image/Logo */}
				<div
					className="col-md-6 text-center d-flex justify-content-center align-items-center rounded-lg"
					style={{
						backgroundColor: "#000000",
						borderRadius: "20px",
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

export default Login;
