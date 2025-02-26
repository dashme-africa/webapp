import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

import useNotifications from "../hooks/useNotifications";
import { toast } from "sonner";
import { useAdminFetch, useFetch } from "../api.service";
import useProductStore from "../store/product.store";

const AdminDashboard = () => {
	const products = useProductStore((st) => st.products);
	const setProducts = useProductStore((st) => st.updateAll);
	const removeProduct = useProductStore((st) => st.remove);
	const updateStatus = useProductStore((st) => st.updateStatus);
	const [error, setError] = useState("");
	const { unreadCount } = useNotifications(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await useAdminFetch("/adminProduct");
			console.log(res);

			if (!res.ok) return toast.error(res.message);

			setProducts(res.data);
		};

		fetchProducts();
	}, [navigate]);

	const deleteProduct = async (id) => {
		if (!window.confirm("Are you sure you want to delete this product?"))
			return;

		const res = await useAdminFetch(`/adminProduct/${id}`, "DELETE");
		// console.log(res);
		if (!res.ok) return toast.error(res.message);

		toast.success(res.message);
		removeProduct(id);
	};

	const editProduct = (id) => {
		navigate(`/admin/products/edit/${id}`);
	};

	const updateProductStatus = async (id, status) => {
		const res = await useAdminFetch(`/adminProduct/${id}/status`, "PUT", {
			status,
		});

		if (!res.ok) return toast.error(res.message);

		toast.success(res.message);

		updateStatus(id, status);
	};

	return (
		<div className="container my-5">
			<div className="flex mb-3 gap-3">
				<h1>Admin Dashboard</h1>

				{/* Notifications Bell */}
				<Nav.Link
					href="/admin/notifications"
					className="me-3 position-relative"
				>
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
				<Nav.Link href="/admin/transactions" className="me-3 position-relative">
					Transactions
				</Nav.Link>
			</div>

			{/* Table for products */}
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
						<tr key={product.id}>
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
								{product.user?.username} ({product.uploader.email}) -{" "}
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
												updateProductStatus(product.id, "approved")
											}
										>
											Approve
										</button>
										<button
											className="btn btn-danger btn-sm me-2"
											onClick={() =>
												updateProductStatus(product.id, "rejected")
											}
										>
											Reject
										</button>
									</>
								)}
								<button
									className="btn btn-primary btn-sm me-2"
									onClick={() => editProduct(product.id)}
								>
									Edit
								</button>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => deleteProduct(product.id)}
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
