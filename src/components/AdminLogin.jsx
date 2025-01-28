import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(true);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("danger");
	const [passwordType, setPasswordType] = useState("password");
	const [icon, setIcon] = useState(<FaEyeSlash />);

	const displayAlert = (message, variant = "danger", duration = 5000) => {
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

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const { data } = await axios.post(`${apiURL}/admin/login`, {
				email,
				password,
			});
			localStorage.setItem("adminToken", data.token);
			displayAlert("Login Successful", "success");
			setTimeout(() => {
				navigate("/adminDashboard");
			}, 2000);
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<Container className="d-flex justify-content-center align-items-center vh-100">
			<Form
				onSubmit={handleLogin}
				className="p-4 border rounded shadow"
				style={{ width: "300px" }}
			>
				<h2 className="text-center mb-4">Admin Login</h2>
				{/* {error && <Alert variant="danger">{error}</Alert>} */}
				{/* <Alert variant={alertVariant} show={showAlert}>
          {alertMessage}
        </Alert> */}
				{error && (
					<p
						className={`px-3 mb-4 py-2 border ${
							alertVariant == "success"
								? "text-green-700 border-green-700"
								: "text-red-700 border-red-700"
						}`}
					>
						{error}
					</p>
				)}
				<Form.Group className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<div className="position-relative">
						<Form.Control
							type={passwordType}
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<span
							className="position-absolute p-2 top-50 end-0 translate-middle-y cursor-pointer"
							onClick={togglePassword}
						>
							{icon}
						</span>
					</div>
				</Form.Group>

				<Button type="submit" variant="success" className="w-100">
					{" "}
					Login{" "}
				</Button>
			</Form>
		</Container>
	);
};

export default AdminLogin;
