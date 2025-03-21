import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;
import { toast } from "sonner";
import { useFetch } from "../api.service";
import useAdminStore from "../store/admin.store";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [passwordType, setPasswordType] = useState("password");
	const [icon, setIcon] = useState(<FaEyeSlash />);
	const authenticate = useAdminStore((st) => st.authenticate);
	const updateAdmin = useAdminStore((st) => st.updateAdmin);

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

		const res = await useFetch("/admin/login", "POST", { email, password });
		// console.log(res);

		if (!res.ok) return toast.error(res.message);
		toast.success(res.message);

		authenticate(res.data.token);
		updateAdmin(res.data.admin);
		navigate("/adminDashboard");
	};

	return (
		<Container className="d-flex justify-content-center align-items-center vh-100">
			<Form
				onSubmit={handleLogin}
				className="p-4 border rounded shadow"
				style={{ width: "300px" }}
			>
				<h2 className="text-center mb-4">Admin Login</h2>

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
					Login
				</Button>
			</Form>
		</Container>
	);
};

export default AdminLogin;
