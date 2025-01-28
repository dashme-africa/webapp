import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

import useNotifications from "../hooks/useNotifications";

const AdminDashboard = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const { unreadCount } = useNotifications(true);
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const displayAlert = (message, variant = "success", duration = 5000) => {
		setAlertMessage(message);
		setAlertVariant(variant);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, duration);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			const token = localStorage.getItem("adminToken");
			if (!token) {
				navigate("/adminLogin");
				return;
			}

			try {
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				const { data } = await axios.get(`${apiURL}/adminProduct`, config);
				setProducts(data);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch products");
			}
		};

		fetchProducts();
	}, [navigate]);

	const deleteProduct = async (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			try {
				const token = localStorage.getItem("adminToken");
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				await axios.delete(`${apiURL}/adminProduct/${id}`, config);
				setProducts(products.filter((product) => product._id !== id));
			} catch (err) {
				// Add better error logging
				console.error("Error:", err);
				setError(
					err.response?.data?.message ||
						"Failed to delete product. Please try again later."
				);
			}
		}
	};

	const editProduct = (id) => {
		navigate(`/admin/products/edit/${id}`);
	};

	const updateProductStatus = async (id, status) => {
		const token = localStorage.getItem("adminToken");

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.put(
				`${apiURL}/adminProduct/${id}/status`,
				{ status },
				config
			);

			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product._id === id
						? { ...product, status: data.product.status }
						: product
				)
			);

			displayAlert(data.message);
		} catch (err) {
			console.error("Error updating product status:", err);
			setError(
				err.response?.data?.message || "Failed to update product status"
			);
		}
	};

	return (
		<div className="container my-5">
			<h1>Admin Dashboard</h1>

			{/* Notifications Bell */}
			<Nav.Link href="/admin/notifications" className="me-3 position-relative">
				<FaBell size={30} />
				{unreadCount > 0 && (
					<span
						className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger"
						style={{ fontSize: "0.8em" }}
					>
						{unreadCount}
					</span>
				)}
			</Nav.Link>
			<Alert
				variant={alertVariant}
				show={showAlert}
				style={{
					position: "fixed",
					top: "10%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: 1000,
				}}
			>
				{alertMessage}
			</Alert>

			{/* Table for products */}
			{error && <div className="alert alert-danger">{error}</div>}
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Image</th>
						<th>Proof Video</th>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th>Category</th>
						<th>Tag</th>
						<th>Uploader Details</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product._id}>
							<td>
								<Link to={product.primaryImage}>
									<img
										src={product.primaryImage || "/placeholder.png"}
										alt={product.title}
										style={{
											width: "80px",
											height: "80px",
											objectFit: "cover",
										}}
									/>
								</Link>
							</td>
							<td>
								{product.videoUrl ? (
									<video
										src={product.videoUrl}
										alt={product.title}
										style={{
											width: "250px",
											height: "250px",
											objectFit: "cover",
										}}
										controls
									/>
								) : (
									<p>No video</p>
								)}
							</td>
							<td>{product.title}</td>
							<td>{product.description || "No description available"}</td>
							<td>
								{product.tag === "donate"
									? "N/A"
									: product.price || "Not provided"}
							</td>
							<td>{product.category}</td>
							<td>{product.tag || "Not specified"}</td>
							<td>
								{product.user.username} ({product.uploader.email}) -{" "}
								{product.uploader.phoneNumber}
							</td>

							<td>
								<span
									className={`badge ${
										product.status === "approved"
											? "bg-success"
											: product.status === "rejected"
											? "bg-danger"
											: "bg-warning text-dark"
									}`}
								>
									{product.status}
								</span>
							</td>
							<td>
								{product.status === "pending" && (
									<>
										<button
											className="btn btn-success btn-sm me-2"
											onClick={() =>
												updateProductStatus(product._id, "approved")
											}
										>
											Approve
										</button>
										<button
											className="btn btn-danger btn-sm me-2"
											onClick={() =>
												updateProductStatus(product._id, "rejected")
											}
										>
											Reject
										</button>
									</>
								)}
								<button
									className="btn btn-primary btn-sm me-2"
									onClick={() => editProduct(product._id)}
								>
									Edit
								</button>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => deleteProduct(product._id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default AdminDashboard;
