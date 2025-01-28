import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../custom.css";
import MyProducts from "./MyProducts";

const AccountSummary = () => {
	const { t } = useTranslation();
	const [user, setUser] = useState(null);
	const [image, setImage] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	/**@type {[IBank[]]} */
	const [banks, setBanks] = useState([]);
	const [filteredBanks, setFilteredBanks] = useState([]);
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		city: "",
		state: "",
		country: "",
		bio: "",
		accountName: "",
		accountNumber: "",
		bankName: "",
		bankCode: 0,
		phoneNumber: "",
	});
	const [isVerified, setIsVerified] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const [activeTab, setActiveTab] = useState("profile");
	const [transactions, setTransactions] = useState([]);
	const [orders, setOrders] = useState([]); // New state for orders
	const navigate = useNavigate();

	const displayAlert = (message, variant = "success", duration = 10000) => {
		setAlertMessage(message);
		setAlertVariant(variant);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, duration);
	};

	useEffect(() => {
		// Fetch user profile
		const fetchProfile = async () => {
			const token = localStorage.getItem("token");

			if (token) {
				try {
					const { data } = await axios.get(`${apiURL}/userProfile/profile`, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setUser(data);
					setFormData((prevData) => ({
						...prevData,
						fullName: data.fullName || "",
						username: data.username || "",
						email: data.email || "",
						city: data.city || "",
						state: data.state || "",
						country: data.country || "",
						bio: data.bio || "",
						accountName: data.accountName || "",
						accountNumber: data.accountNumber || "",
						bankName: data.bankName || "",
						phoneNumber: data.phoneNumber || "",
					}));

					setIsVerified(data.isVerified || false);
				} catch (error) {
					console.error("Failed to fetch user profile", error);
				}
			}
		};

		fetchProfile();
	}, []);

	useEffect(() => {
		const fetchBanks = async () => {
			try {
				const response = await axios.get(`${apiURL}/userProfile/banks`);
				setBanks(response.data);
			} catch (error) {
				console.error("Error fetching bank list:", error.message);
			}
		};
		fetchBanks();
	}, []);

	useEffect(() => {
		if (activeTab === "transactions") {
			fetchTransactions();
		}
	}, [activeTab]);

	useEffect(() => {
		const tab = searchParams.get("tab");
		if (tab === "orders") {
			setActiveTab("orders");
		}
	}, [searchParams]);

	// Fetch orders
	const fetchOrders = async () => {
		const userId = user.id;
		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.get(`${apiURL}/orders/user/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const ordersWithShipmentStatus = await Promise.all(
				data.orders.map(async (order) => {
					if (order.shipmentReference) {
						const shipmentStatusResponse = await axios.get(
							`${apiURL}/track-shipment/${order.shipmentReference}`,
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
						// console.log(shipmentStatusResponse.data.data.current_status)
						return {
							...order,
							shipmentStatus: shipmentStatusResponse.data.data.current_status,
						};
					} else {
						return {
							...order,
							shipmentStatus: { current_status: "Not Available" },
						};
					}
				})
			);
			setOrders(ordersWithShipmentStatus);
		} catch (error) {
			console.error("Failed to fetch orders", error);
		}
	};

	useEffect(() => {
		if (user) {
			fetchOrders();
		}
	}, [user]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				document.getElementById("profile-img").src = reader.result;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));

		if (name === "bankName") {
			const filtered = banks.filter((bank) =>
				bank.name.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredBanks(filtered);
		}
	};

	const handleSelectBank = (bankName, bankCode) => {
		setFormData((prevData) => ({
			...prevData,
			bankName,
			bankCode,
		}));
		setFilteredBanks([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		// Initialize formDataToSubmit first
		const formDataToSubmit = new FormData();

		Object.keys(formData).forEach((key) => {
			formDataToSubmit.append(key, formData[key]);
		});

		// Append image if it exists
		if (image) {
			formDataToSubmit.append("image", image);
		}

		// Validate form data
		if (
			!formData.fullName ||
			!formData.username ||
			!formData.city ||
			!formData.state ||
			!formData.country ||
			!formData.bio ||
			!formData.phoneNumber
		) {
			displayAlert("Please complete your profile information", "danger");
			return;
		}

		// Validate account details before proceeding
		if (
			!formData.accountName ||
			!formData.accountNumber ||
			!formData.bankName ||
			!isVerified
		) {
			displayAlert(`${t("profile.verifyBankDetails")}`, "danger");
			return;
		}

		// Conditionally append isVerified if necessary
		if (formData.accountNumber && formData.bankName) {
			formDataToSubmit.append("isVerified", isVerified);
		}

		// console.log(formData);

		try {
			const response = await axios.put(
				`${apiURL}/userProfile/profile`,
				formDataToSubmit,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data) {
				setUser(response.data);
				displayAlert(t("profile.profileUpdated"));
				setTimeout(() => {
					navigate("/upload");
				}, 3000);
			} else {
				displayAlert(
					response.data.message || t("profile.failedToUpdate"),
					"danger"
				);
			}
		} catch (error) {
			displayAlert("Failed to update profile.", "danger");
			console.error("Failed to update profile:", error);
		}
	};
	// console.log(banks);

	const verifyBankDetails = async () => {
		try {
			let { accountNumber, bankName, bankCode } = formData;
			if (!bankCode) {
				bankCode = banks.find((bnk) => bnk.name == bankName)?.code;
			}
			if (!accountNumber || !bankName) {
				displayAlert(
					"Please fill in the account number and bank name to verify.",
					"danger"
				);
				return;
			}
			if (!bankCode) {
				displayAlert("Please select bank name from the list", "danger");
				return;
			}

			const response = await axios.get(
				`${apiURL}/userProfile/resolve-account`,
				{
					params: {
						account_number: accountNumber,
						bank_name: bankName,
						bank_code: bankCode,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.data.data?.account_name) {
				setFormData((prevData) => ({
					...prevData,
					accountName: response.data.data.account_name,
				}));
				setIsVerified(true);
				displayAlert(t("profile.bankVerified"));
			} else {
				displayAlert(t("profile.bankVerificationFailed"), "danger");
			}
		} catch (error) {
			// console.error("Bank verification error:", error);
			displayAlert("Error verifying bank details. Try again later.", "danger");
		}
	};

	if (!user) {
		return <div className="text-center py-5">{t("profile.loading")}</div>;
	}

	// Fetch transactions
	const fetchTransactions = async () => {
		// setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.get(`${apiURL}/transactions`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTransactions(data.data); // Set transactions data
			// console.log("Transactions fetched successfully", data);
		} catch (error) {
			console.error("Failed to fetch transactions", error);
		} finally {
			// setLoading(false);
		}
	};

	const renderContent = () => {
		switch (activeTab) {
			case "profile":
				return (
					<Col
						md={12}
						className="bg-light p-3 rounded mb-4  border-light border-2 "
					>
						<h4 className="text-success mb-2">Edit Your Profile</h4>
						{!isVerified ||
						!formData.fullName ||
						!formData.email ||
						!formData.city ||
						!formData.state ||
						!formData.country ||
						!formData.bio ||
						!formData.phoneNumber ? (
							<i className="d-block text-danger">
								Ensure profile info is complete and bank details are verified to
								enable product upload
							</i>
						) : null}

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
						<Form onSubmit={handleSubmit}>
							{/* Profile Details? */}
							<Row className="mb-3 gx-5 mt-4">
								{/* Profile Picture */}
								<Col md={3}>
									<div className="mb-4 bg-light text-center">
										<img
											id="profile-img"
											src={
												user.profilePicture || "https://via.placeholder.com/150"
											}
											alt="Profile"
											className="rounded-circle border py-3 px-3 img-fluid"
											style={{
												width: "150px",
												height: "150px",
												objectFit: "cover",
											}}
										/>{" "}
										<br />
										<label className="btn btn-outline-success btn-sm mt-3">
											{t("profile.uploadPicture")}
											<input
												type="file"
												accept="image/*"
												onChange={handleImageChange}
												className="d-none"
											/>
										</label>
									</div>
								</Col>

								{/* Profile info */}
								<Col md={9}>
									<Row>
										<Col md={12}>
											<Form.Group className="mb-4">
												<Form.Label>{t("profile.fullName")}</Form.Label>
												<Form.Control
													type="text"
													name="fullName"
													className="form-control"
													value={formData.fullName}
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md={6}>
											<Form.Group className="mb-4">
												<Form.Label>Phone No. (whatsapp only)</Form.Label>
												<Form.Control
													type="text"
													name="phoneNumber"
													className="form-control"
													value={formData.phoneNumber}
													placeholder="e.g. 08012345678"
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
										<Col md={6}>
											<Form.Group className="mb-4">
												<Form.Label>{t("profile.email")}</Form.Label>
												<Form.Control
													type="email"
													readOnly
													className="form-control"
													value={formData.email}
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col md={4}>
											<Form.Group className="mb-4">
												<Form.Label>City</Form.Label>
												<Form.Control
													type="text"
													name="city"
													className="form-control"
													value={formData.city}
													onChange={handleChange}
													placeholder="e.g. Ikeja"
												/>
											</Form.Group>
										</Col>

										<Col md={4}>
											<Form.Group className="mb-4">
												<Form.Label>State</Form.Label>
												<Form.Control
													type="text"
													name="state"
													className="form-control"
													value={formData.state}
													onChange={handleChange}
													placeholder="e.g. Lagos"
												/>
											</Form.Group>
										</Col>

										<Col md={4}>
											<Form.Group className="mb-4">
												<Form.Label>Country</Form.Label>
												<Form.Control
													type="text"
													name="country"
													className="form-control"
													value={formData.country}
													onChange={handleChange}
													placeholder="e.g. Nigeria"
												/>
											</Form.Group>
										</Col>
									</Row>

									<Form.Group className="mb-4">
										<Form.Label>{t("profile.bio")}</Form.Label>
										<Form.Control
											name="bio"
											className="form-control"
											rows="3"
											value={formData.bio}
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>

							{/* Verify Bank Details */}
							<Row>
								<h4 className="mb-3 text-success">
									{t("profile.bankDetails")}
								</h4>
								<i className="mb-3">
									I agree to DashMe Africa{" "}
									<a href="https://docs.google.com/document/d/1AViIna3B8tHU7kk_sEHDod9LanB9MerP/edit#heading=h.gjdgxs">
										T&Cs
									</a>
								</i>
								<Col md={6}>
									<Form.Group className="mb-4">
										<Form.Label>{t("profile.accountName")}</Form.Label>
										<Form.Control
											type="text"
											name="accountName"
											id="accountName"
											className="form-control"
											placeholder="Will display after acc. no is verified"
											value={formData.accountName}
											onChange={handleChange}
											disabled={isVerified}
											readOnly
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-4">
										<Form.Label htmlFor="accountNumber">
											{t("profile.accountNumber")}
										</Form.Label>
										<Form.Control
											type="text"
											name="accountNumber"
											id="accountNumber"
											className="form-control"
											value={formData.accountNumber}
											onChange={handleChange}
											disabled={isVerified}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-4">
										<Form.Label htmlFor="bankName">
											{t("profile.bankName", {})}
										</Form.Label>
										<Form.Control
											type="text"
											name="bankName"
											id="bankName"
											className="form-control"
											placeholder="Type to find bank name"
											value={formData.bankName}
											onChange={handleChange}
											disabled={isVerified}
										/>
										{filteredBanks.length > 0 && (
											<ul className="list-group mt-1">
												{filteredBanks.map((bank) => (
													<li
														key={bank.code}
														className="list-group-item"
														onClick={() =>
															handleSelectBank(bank.name, bank.code)
														}
														style={{ cursor: "pointer" }}
													>
														{bank.name}
													</li>
												))}
											</ul>
										)}
									</Form.Group>
								</Col>
							</Row>
							<Form.Group className="mb-4 d-flex justify-content-between">
								<Button
									type="button"
									onClick={verifyBankDetails}
									disabled={isVerified}
									className="w-50 me-3"
								>
									{isVerified
										? `${t("profile.verified")}`
										: `${t("profile.verify")}`}
								</Button>
								<Button type="submit" variant="success" className="w-50">
									{t("profile.saveChanges")}
								</Button>
							</Form.Group>
						</Form>
					</Col>
				);
			case "orders":
				return orders.length > 0 ? (
					<div className="p-3">
						<h4 className="text-success mb-3">View and Track Orders</h4>
						<Table striped hover responsive>
							<thead className="table-success text-center">
								<tr>
									<th>No.</th>
									{/* <th>Order ID</th> */}
									<th>Product Image</th>
									<th>Title</th>
									<th>Total</th>
									<th>Quantity</th>
									<th>Shipment Status</th>
								</tr>
							</thead>

							<tbody className="text-center">
								{orders.map((order, index) => (
									<tr key={order.id}>
										<td>{index + 1}</td>
										{/* <td>{order.id}</td> */}
										<td>
											<img
												src={order.productId.primaryImage}
												width="70px"
												alt=""
											/>
										</td>
										<td>{order.productId.title}</td>
										{/* <td>{new Date(order.createdAt).toLocaleString()}</td> */}
										<td>
											₦{order.productId.price.toFixed(2)}
											{}
										</td>
										<td>{order.quantity}</td>
										<td>
											{order?.shipmentStatus === "pending" ? (
												<span className="text-warning">Pending</span>
											) : order.shipmentStatus?.current_status === "shipped" ? (
												<span className="text-success">Shipped</span>
											) : order.shipmentStatus?.current_status ===
											  "Not Available" ? (
												<span>Not Available</span>
											) : (
												<span className="text-danger">Error</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				) : (
					<p className="text-center text-muted">No orders yet</p>
				);

			case "transactions":
				return transactions.length > 0 ? (
					<div className="p-3">
						<h4 className="text-success mb-3">View Transactions</h4>
						<Table striped hover responsive>
							<thead className="table-success text-center">
								<tr>
									<th>No.</th>
									<th>Date</th>
									<th>Amount</th>
									<th>Method</th>
									<th>Status</th>
									<th>Reference</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{transactions.map((transaction, index) => (
									<tr key={transaction.id}>
										<td>{index + 1}</td>
										<td>{new Date(transaction.paidAt).toLocaleString()}</td>
										<td>₦{(transaction.amount / 100).toFixed(2)}</td>
										<td>{transaction.paymentMethod}</td>
										<td
											className={
												transaction.status === "success"
													? "text-success"
													: "text-danger"
											}
										>
											{transaction.status}
										</td>
										<td>{transaction.reference}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				) : (
					<p className="text-center text-muted">No transactions yet</p>
				);

			case "my-products":
				return <MyProducts />;
			default:
				return <h4>Select a section</h4>;
		}
	};

	return (
		<Container className="my-5">
			<h5 className="text-end mb-3">
				Welcome, <span className="text-success">{user?.username}</span>
			</h5>
			<Row>
				<Col md={3} className="px-4 py-4">
					<div className="mb-4">
						<h5 className="mb-4">Account Summary</h5>
						<ul className="list-unstyled">
							<li
								className={`px-3 py-3 rounded ${
									activeTab === "profile"
										? "bg-success text-white"
										: "hover-bg-success"
								}`}
								style={{ cursor: "pointer" }}
								onClick={() => setActiveTab("profile")}
							>
								My Profile
							</li>
							<li
								className={`px-3 py-3 rounded ${
									activeTab === "orders"
										? "bg-success text-white"
										: "hover-bg-success"
								}`}
								style={{ cursor: "pointer" }}
								onClick={() => setActiveTab("orders")}
							>
								My Orders
							</li>
							<li
								className={`px-3 py-3 rounded ${
									activeTab === "transactions"
										? "bg-success text-white"
										: "hover-bg-success"
								}`}
								style={{ cursor: "pointer" }}
								onClick={() => setActiveTab("transactions")}
							>
								My Transactions
							</li>
							<li
								className={`px-3 py-3 rounded ${
									activeTab === "my-products"
										? "bg-success text-white"
										: "hover-bg-success"
								}`}
								style={{ cursor: "pointer" }}
								onClick={() => setActiveTab("my-products")}
							>
								My Products
							</li>
						</ul>
					</div>
				</Col>

				<Col
					md={9}
					className="bg-light py-4 px-4 rounded shadow-sm mb-4 border border-light border-2"
				>
					{renderContent()}
				</Col>
			</Row>
		</Container>
	);
};

export default AccountSummary;
