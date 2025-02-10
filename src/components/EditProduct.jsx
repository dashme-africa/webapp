import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminFetch } from "../api.service";
import { toast } from "sonner";
import useProductStore from "../store/product.store";
const apiURL = import.meta.env.VITE_API_URL;

const EditProduct = () => {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const updateProduct = useProductStore((st) => st.update);
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await useAdminFetch(`/adminProduct/${id}`);
			console.log(res);

			if (!res.ok) return toast.error(res.message);
			// toast.success(res.message);

			setProduct(res.data);
		};

		fetchProduct();
	}, [id, navigate]);

	// Handle image file change
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	// Handle input changes
	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", product.title);
		formData.append("description", product.description);
		formData.append("price", product.price);
		formData.append("category", product.category);
		formData.append("location", product.location);
		formData.append("tag", product.tag);
		formData.append("priceCategory", product.priceCategory);

		// If there's an image, append it to the form data
		if (image) {
			formData.append("image", image);
		}

		// Log the FormData content for debugging
		formData.forEach((value, key) => {
			console.log(key, value);
		});

		const res = await useAdminFetch(`/adminProduct/${id}`, "PUT", formData);
		// console.log(res);

		if (!res.ok) return toast.error(res.message);
		toast.success(res.message);

		updateProduct(res.data);
		navigate("/adminDashboard");
	};

	return (
		<div className="container my-5">
			<h1>Edit Product</h1>
			{error && <div className="alert alert-danger">{error}</div>}
			{successMessage && (
				<div className="alert alert-success">{successMessage}</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label>Title</label>
					<input
						type="text"
						className="form-control"
						name="title"
						value={product.title || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label>Description</label>
					<textarea
						className="form-control"
						name="description"
						value={product.description || ""}
						onChange={handleChange}
					></textarea>
				</div>
				<div className="mb-3">
					<label>Price</label>
					<input
						type="number"
						className="form-control"
						name="price"
						value={product.price || ""}
						onChange={handleChange}
						disabled={product.tag === "donate"}
					/>
				</div>
				<div className="mb-3">
					<label>Price Category</label>
					<input
						type="text"
						className="form-control"
						name="priceCategory"
						value={product.priceCategory || ""}
						onChange={handleChange}
						disabled={product.tag === "donate"}
					/>
				</div>
				<div className="mb-3">
					<label>Category</label>
					<input
						type="text"
						className="form-control"
						name="category"
						value={product.category || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label>Location</label>
					<input
						type="text"
						className="form-control"
						name="location"
						value={product.location || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label>Tag (sell or donate)</label>
					<select
						className="form-control"
						name="tag"
						value={product.tag || "sell"}
						onChange={handleChange}
					>
						<option value="sell">Sell</option>
						<option value="donate">Donate</option>
					</select>
				</div>
				<div className="mb-3">
					<label>Product Image</label>
					<input
						type="file"
						className="form-control"
						onChange={handleImageChange}
					/>
					{product.primaryImage && (
						<div className="mt-3">
							<img
								src={product.primaryImage}
								alt="Product"
								style={{ width: "100px", height: "100px", objectFit: "cover" }}
							/>
						</div>
					)}
				</div>
				<button type="submit" className="btn btn-success">
					Update Product
				</button>
			</form>
		</div>
	);
};

export default EditProduct;
