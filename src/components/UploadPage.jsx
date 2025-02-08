import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user.store";
import { toast } from "sonner";
import { useFetch } from "../api.service";
const apiURL = import.meta.env.VITE_API_URL;

const UploadPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState("sell");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		price: "",
		priceCategory: "",
		location: "",
		image: null,
		specification: "",
		condition: "",
		images: [],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const user = useUserStore((st) => st.user);
	const addProduct = useUserStore((st) => st.addProduct);

	// useEffect(() => {
	// 	const fetchUploader = async () => {
	// 		const token = localStorage.getItem("token");
	// 		if (token) {
	// 			try {
	// 				const response = await axios.get(`${apiURL}/userProfile/profile`, {
	// 					headers: { Authorization: `Bearer ${token}` },
	// 				});
	// 				setUploader(response.data);
	// 				if (
	// 					!response.data.fullName ||
	// 					!response.data.email ||
	// 					!response.data.city ||
	// 					!response.data.state ||
	// 					!response.data.country ||
	// 					!response.data.bio ||
	// 					!response.data.phoneNumber
	// 				) {
	// 					toast.error(
	// 						"Please complete your profile info to upload a product",
	//
	// 					);
	// 					setTimeout(() => {
	// 						navigate("/profile"); // Redirect to profile if bank is not verified
	// 					}, 3000);
	// 				} else if (!response.data.isVerified) {
	// 					toast.error(
	// 						"Please verify your bank details to upload a product.",
	//
	// 					);
	// 					setTimeout(() => {
	// 						navigate("/profile"); // Redirect to profile if bank is not verified
	// 					}, 3000);
	// 				} else {
	// 					toast.error(
	// 						"Reach a wider audience! Upload your product now.",
	// 						"success"
	// 					);
	// 				}
	// 			} catch (error) {
	// 				console.error("Failed to fetch uploader info:", error);
	// 			}
	// 		} else {
	// 			toast.error("Please log in to access the upload page.", );
	// 			const timer = setTimeout(() => {
	// 				navigate("/login", { replace: true });
	// 			}, 2000);
	// 			return () => clearTimeout(timer);
	// 		}
	// 	};
	// 	fetchUploader();
	// }, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Check for image file sizes (10MB limit)
		if (
			formData.images &&
			formData.images.some((file) => file.size > 10 * 1024 * 1024)
		) {
			toast.error("Each Image file size should not exceed 10MB");
			setIsSubmitting(false);
			return;
		}

		// console.log(formData.images.length);
		// Frontend validation for the number of images
		if (formData.images && formData.images.length > 10) {
			toast.error(t("upload.maxImagesError"));
			setIsSubmitting(false);
			return;
		}

		if (formData.video && formData.video.size > 10 * 1024 * 1024) {
			// 10MB limit
			toast.error("Video file size should not exceed 10MB");
			setIsSubmitting(false);
			return;
		}

		// Ensure video is compulsory for specific categories
		const categoriesRequiringVideo = [
			"Accessories",
			"Household-Items",
			"Electronics",
		];
		if (
			categoriesRequiringVideo.some(
				(category) => category.toLowerCase() === formData.category.toLowerCase()
			) &&
			(!formData.video || formData.video === null)
		) {
			toast.error("A video is required for the selected category");
			setIsSubmitting(false);
			return;
		}

		try {
			const uploadedImages = await Promise.all(
				formData.images.map(async (image) => {
					const formDataForCloudinary = new FormData();
					formDataForCloudinary.append("file", image);
					formDataForCloudinary.append("upload_preset", "dashme-upload-preset");
					const { data } = await axios.post(
						"https://api.cloudinary.com/v1_1/dsa52qglg/image/upload",
						formDataForCloudinary
					);
					return data.secure_url;
				})
			);

			// Update the primaryImageIndex to match the index in the uploadedImages array
			formData.primaryImageIndex = uploadedImages.indexOf(
				uploadedImages[formData.primaryImageIndex]
			);

			// If a video is provided, upload it to Cloudinary
			let uploadedVideo = null;
			if (formData.video) {
				const formDataForVideo = new FormData();
				formDataForVideo.append("file", formData.video);
				formDataForVideo.append("upload_preset", "dashme-upload-preset"); // Replace with your upload preset

				const videoResponse = await axios.post(
					"https://api.cloudinary.com/v1_1/dsa52qglg/video/upload", // Replace with your Cloudinary URL
					formDataForVideo
				);
				uploadedVideo = videoResponse.data.secure_url; // Store the video URL
			}

			// Ensure primary image index is selected and valid
			if (
				formData.primaryImageIndex === null ||
				formData.primaryImageIndex < 0 ||
				formData.primaryImageIndex >= uploadedImages.length
			) {
				toast.error(t("upload.selectPrimaryImage"));
				setIsSubmitting(false);
				return;
			}

			// Create final formData for backend submission
			const updatedData = {
				title: formData.title,
				description: formData.description,
				category: formData.category,
				price: formData.price,
				priceCategory: formData.priceCategory,
				location: `${user.city}, ${user.state}, ${user.country}`,
				specification: formData.specification,
				condition: formData.condition,
				primaryImageIndex: formData.primaryImageIndex,
				images: uploadedImages.join(", "),
				video: uploadedVideo,
				uploader: user.id,
			};

			// Verify uploader profile completeness
			if (
				!user ||
				!user.fullName ||
				!user.email ||
				!user.phoneNumber ||
				!user.city ||
				!user.state ||
				!user.country ||
				!user.bio
			) {
				toast.error(
					"Please complete your profile info before uploading a product."
				);
				setIsSubmitting(false);
				setTimeout(() => {
					navigate("/profile");
				}, 2000);
				return;
			}

			// Verify uploader
			if (user && !user.isVerified) {
				toast.error(t("upload.verifiedError"));
				setIsSubmitting(false);
				setTimeout(() => {
					navigate("/profile");
				}, 2000);
				return;
			}

			// Ensure at least one image is uploaded
			if (!formData.images || formData.images.length === 0) {
				toast.error(t("upload.addImageError"));
				setIsSubmitting(false);
				return;
			}

			// Now handle submission to your backend
			const endpoint = activeTab === "sell" ? `/products` : `/products/donate`;

			const res = await useFetch(endpoint, "POST", updatedData);
			setIsSubmitting(false);

			if (!res.ok) return toast.error(res.message);
			toast.success(res.message);
			addProduct(res.data);
			// console.log(res);
			navigate("/");
		} catch (error) {
			console.error("An unexpected error occurred:", error);
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				toast.error(`${error.response.data.message}`);
			} else {
				toast.error("An unexpected error occurred.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setFormData({
			title: "",
			description: "",
			category: "",
			price: "",
			priceCategory: "",
			location: "",
			image: null,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setFormData((prevData) => ({
			...prevData,
			images: [...(prevData.images || []), ...files],
		}));
	};

	const handleRemoveImage = (index) => {
		setFormData((prevData) => {
			const updatedImages = [...prevData.images];
			updatedImages.splice(index, 1);
			return {
				...prevData,
				images: updatedImages,
				primaryImageIndex:
					prevData.primaryImageIndex === index
						? null
						: prevData.primaryImageIndex > index
						? prevData.primaryImageIndex - 1
						: prevData.primaryImageIndex,
			};
		});
	};

	const handleVideoChange = (e) => {
		const file = e.target.files[0];

		if (file && file.size > 10 * 1024 * 1024) {
			// 10MB limit
			toast.error("Video file size should not exceed 10MB");
			return;
		}

		setFormData((prevData) => ({
			...prevData,
			video: file,
		}));
	};

	const myProducts = () => {
		navigate("/my-products");
	};

	return (
		<div className="container mt-5">
			<Button variant="primary" className="ms-2 mb-4" onClick={myProducts}>
				{t("upload.myProducts")}
			</Button>
			{/* Tabs */}
			<div className="d-flex justify-content-center mb-4">
				<button
					className={`btn me-2 ${
						activeTab === "sell" ? "btn-success" : "btn-outline-secondary"
					}`}
					onClick={() => handleTabChange("sell")}
				>
					{t("upload.sell")}
				</button>
				<button
					className={`btn ${
						activeTab === "donate" ? "btn-success" : "btn-outline-secondary"
					}`}
					onClick={() => handleTabChange("donate")}
				>
					{t("upload.donate")}
				</button>
			</div>

			{/* Form Content */}
			<div className="card shadow">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<h3 className="text-center mb-4">
							{activeTab === "sell" ? t("upload.sell") : t("upload.donate")}
						</h3>

						{/* Image Upload */}
						<div className="mb-3">
							<label htmlFor="imageUpload" className="form-label">
								{t("upload.uploadPhotos")}
							</label>
							<input
								type="file"
								id="imageUpload"
								className="form-control"
								multiple
								accept="image/*"
								onChange={handleImageChange}
							/>
							<div className="mt-3 d-flex flex-wrap gap-3">
								{formData.images?.map((image, index) => (
									<div key={index} className="image-preview position-relative">
										<img
											src={URL.createObjectURL(image)}
											alt={`Preview ${index}`}
											className="img-thumbnail"
											style={{ width: "100px", marginRight: "10px" }}
										/>
										<div>
											<input
												type="radio"
												name="primaryImage"
												value={index}
												checked={formData.primaryImageIndex === index}
												onChange={() =>
													setFormData((prevData) => ({
														...prevData,
														primaryImageIndex: index,
													}))
												}
											/>
											<label>&nbsp;{t("upload.setAsPrimary")}</label>
										</div>
										<button
											type="button"
											className="btn-close position-absolute top-0 end-0"
											onClick={() => handleRemoveImage(index)}
										></button>
									</div>
								))}
							</div>
							<i>
								Upload multiple photos for items with multiple views (e.g.,
								right, left, top, bottom) to ensure credibility. Each image
								should not exceed 10MB.
							</i>
						</div>

						{/* Video Upload */}
						<div className="mb-3">
							<label htmlFor="videoUpload" className="form-label">
								Upload a Product Video
							</label>
							<input
								type="file"
								id="videoUpload"
								className="form-control"
								accept="video/*"
								onChange={handleVideoChange}
							/>
							<i>
								Please upload a proof video of the product to verify its
								authenticity. This video will be reviewed by our admin team
								before your product is approved for display.
							</i>
						</div>

						{/* Title */}
						<div className="mb-3">
							<label className="form-label">{t("upload.title")}</label>
							<input
								type="text"
								className="form-control"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								placeholder={t("upload.enterTitle")}
								required
							/>
						</div>

						{/* Description */}
						<div className="mb-3">
							<label className="form-label">{t("upload.description")}</label>
							<textarea
								className="form-control"
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								placeholder={t("upload.enterDescription")}
								required
							></textarea>
						</div>

						{/* Specification */}
						<div className="mb-3">
							<label className="form-label">
								Specification (if any defects, kindly state){" "}
							</label>
							<textarea
								className="form-control"
								name="specification"
								value={formData.specification}
								onChange={handleInputChange}
								placeholder="Enter product specification"
								required
							></textarea>
						</div>

						{/* Category */}
						<div className="mb-3">
							<label className="form-label">{t("upload.itemCategory")}</label>
							<select
								className="form-select"
								name="category"
								value={formData.category}
								onChange={handleInputChange}
								required
							>
								<option value="" disabled>
									{t("upload.selectCategory")}
								</option>
								{activeTab === "sell" ? (
									<>
										<option value="Clothes">Clothes</option>
										<option value="Electronics">Electronics</option>
										<option value="Accessories">
											Accessories - sandals, watches, shoes etc
										</option>
										<option value="Household-Items">Household Items</option>
									</>
								) : (
									<>
										<option value="Clothes">Clothes</option>
										<option value="Electronics">Electronics</option>
										<option value="Accessories">
											Accessories - sandals, watches, shoes etc
										</option>
										<option value="Household-Items">Household Items</option>
									</>
								)}
							</select>
						</div>

						{/* Price */}
						{activeTab === "sell" && (
							<div className="mb-3">
								<label className="form-label">{t("upload.price")}</label>
								<input
									type="number"
									className="form-control"
									name="price"
									value={formData.price}
									onChange={handleInputChange}
									placeholder={t("upload.enterPrice")}
									required
								/>
							</div>
						)}

						{/* Price Category */}
						{activeTab === "sell" && (
							<div className="mb-3">
								<label className="form-label">
									{t("upload.priceCategory")}
								</label>
								<select
									className="form-select"
									name="priceCategory"
									value={formData.priceCategory}
									onChange={handleInputChange}
									required
								>
									<option value="" disabled>
										{t("upload.selectCategory")}
									</option>
									<>
										<option value="500-15000">N500 - N15,000</option>
										<option value="15000-25000">N15,000 - N25,000</option>
										<option value="25000-50000">N25,000 - N50,000</option>
									</>
								</select>
							</div>
						)}

						{/* Condition */}
						<div className="mb-3">
							<label className="form-label">Condition</label>
							<select
								className="form-select"
								name="condition"
								value={formData.condition}
								onChange={handleInputChange}
								required
							>
								<option value="" disabled>
									{t("upload.selectCategory")}
								</option>
								<>
									<option value="New">New</option>
									<option value="Fairly Used">Fairly Used</option>
									<option value="Refurbished">Refurbished</option>
								</>
							</select>
						</div>

						{/* Location */}
						<div className="mb-3">
							<label className="form-label">{t("upload.location")}</label>
							<input
								type="text"
								className="form-control"
								name="location"
								value={
									user ? `${user.city}, ${user.state}, ${user.country}` : ""
								}
								onChange={handleInputChange}
								placeholder={t("upload.enterLocation")}
								disabled={true}
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-success w-100"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("upload.submitting") : t("upload.submit")}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UploadPage;
