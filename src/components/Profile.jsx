import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../custom.css";
import MyProducts from "./MyProducts";
import useUserStore from "../store/user.store";
import { toast } from "sonner";
import { useFetch } from "../api.service";

const AccountSummary = () => {
	const { t } = useTranslation();
	const [_, setUser] = useState(null);
	const user = useUserStore((st) => st.user);
	const updateProfile = useUserStore((st) => st.updateProfile);
	const [image, setImage] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	/**@type {[import("../types").IBank[]]} */
	const [banks, setBanks] = useState([]);
	const [filteredBanks, setFilteredBanks] = useState([]);
	const [accountName, setAccountName] = useState(user?.bankName || "");
	const [formData, setFormData] = useState({
		fullName: user?.fullName,
		username: user?.username,
		city: user?.city,
		state: user?.state,
		country: user?.country,
		street: user?.street,
		bio: user?.bio,
		accountName: user?.accountName,
		accountNumber: user?.accountNumber,
		bankName: user?.bankName,
		bankCode: getBankCode(user?.bankName) || 0,
		phoneNumber: user?.phoneNumber,
	});
	const [isVerified, setIsVerified] = useState(
		user?.accountName && user?.accountNumber && user?.bankName
	);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const [activeTab, setActiveTab] = useState("profile");
	const [transactions, setTransactions] = useState([]);
	/**@type {[import("../types").Order[]]} */
	const [orders, setOrders] = useState([]); // New state for orders
	// const orders = useUserStore((st) => st.user)?.order;
	const navigate = useNavigate();

	/**@type {React.MutableRefObject<HTMLFormElement|null>} */
	const formRef = useRef(null);

	const displayAlert = (message, variant = "success", duration = 10000) => {
		setAlertMessage(message);
		setAlertVariant(variant);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, duration);
	};

	useEffect(() => {
		const fetchBanks = async () => {
			const res = await useFetch("/userProfile/banks");
			// console.log(res);

			if (!res.ok) return toast.error(res.message);
			setBanks(res.data);
		};
		fetchBanks();
	}, []);

	useEffect(() => {
		if (activeTab === "transactions") {
			fetchTransactions();
		}
	}, [activeTab]);

	useEffect(() => {
		if (activeTab === "orders") {
			fetchOrders();
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
		const userId = user?.id;
		const res = await useFetch(`/orders/user/${userId}`);

		// console.log(res);

		if (!res.ok) return toast.error(res.message);

		const ordersWithShipmentStatus = await Promise.all(
			res.data.map(async (order) => {
				if (order.shipmentReference) {
					const shipmentStatusResponse = await useFetch(
						`/track-shipment/${order.shipmentReference}`
					);

					// const shipmentStatusResponse = await axios.get(
					// 	`${apiURL}/track-shipment/${order.shipmentReference}`,
					// 	{
					// 		headers: {
					// 			Authorization: `Bearer ${token}`,
					// 		},
					// 	}
					// );
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
		return;
	};

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
		if (name == "accountName" || name == "accountNumber" || name == "bankName")
			setIsVerified(false);
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

	/**
	 *
	 * @param {React.FormEvent<HTMLFormElement>} ev
	 * @returns
	 */
	async function handleSubmit(ev) {
		ev.preventDefault();

		// Initialize formDataToSubmit first
		// console.log("state");
		// console.table([formData]);
		// console.log("formData");
		// console.table([Object.fromEntries(new FormData(ev.currentTarget))]);
		const formDataToSubmit = new FormData(ev.currentTarget);
		const formData = Object.fromEntries(formDataToSubmit);

		// Object.keys(formData).forEach((key) => {
		// 	formDataToSubmit.append(key, formData[key]);
		// });

		// Append image if it exists
		if (image) {
			formDataToSubmit.append("image", image);
		}

		// Validate form data
		// console.log([...formDataToSubmit.entries()]);
		// console.log(formData);

		if (
			!formData.fullName ||
			!formData.city ||
			!formData.state ||
			!formData.country ||
			!formData.street ||
			!formData.bio ||
			!formData.phoneNumber
		) {
			toast.error("Please complete your profile information");
			return;
		}

		// Validate account details before proceeding
		if (
			!formData.accountName ||
			!formData.accountNumber ||
			!formData.bankName ||
			!isVerified
		) {
			toast.error(`${t("profile.verifyBankDetails")}`);
			return;
		}

		// Conditionally append isVerified if necessary
		if (formData.accountNumber && formData.bankName) {
			formDataToSubmit.append("isVerified", isVerified);
		}

		const res = await useFetch("/userProfile/profile", "PUT", formDataToSubmit);
		if (!res.ok) return toast.error(res.message);

		toast.success(res.message);
		updateProfile(res.data);
		navigate("/upload");
	}
	// console.log(banks);

	const verifyBankDetails = async () => {
		const formData = Object.fromEntries(new FormData(formRef.current));

		let { accountNumber, bankName, bankCode } = formData;

		if (!bankCode) {
			bankCode = getBankCode(bankName);
		}
		// console.log({ accountNumber, bankName, bankCode });
		// return;

		if (!accountNumber || !bankName) {
			toast.error("Please fill in the account number and bank name to verify.");
			return;
		}
		if (!bankCode) {
			toast.error("Please select bank name from the list");
			return;
		}

		const searchParams = new URLSearchParams({
			account_number: accountNumber,
			bank_name: bankName,
			bank_code: bankCode,
		});

		// return console.log({
		// 	account_number: accountNumber,
		// 	bank_name: bankName,
		// 	bank_code: bankCode,
		// });

		const queryString = searchParams.toString();

		const res = await useFetch(`/userProfile/resolve-account?${queryString}`);
		// console.log(res);
		if (!res.ok) return toast.error(res.message);

		setAccountName(res.data.data.account_name);

		setIsVerified(true);

		toast.success(t("profile.bankVerified"));
	};

	if (!user) {
		return <div className="text-center py-5">{t("profile.loading")}</div>;
	}

	// Fetch transactions
	const fetchTransactions = async () => {
		const res = await useFetch("/transactions");
		if (!res.ok) return toast.error(res.message);
		console.log(res);

		setTransactions(res.data); // Set transactions data
	};

	function getBankCode(bankName) {
		return banks?.find((bnk) => bnk.name == bankName)?.code;
	}

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
						!formData.street ||
						!formData.bio ||
						!formData.phoneNumber ? (
							<i className="d-block text-danger">
								Ensure profile info is complete and bank details are verified to
								enable product upload
							</i>
						) : null}

						<Form ref={formRef} onSubmit={handleSubmit}>
							{/* Profile Details? */}
							<Row className="mb-3 gx-5 mt-4">
								{/* Profile Picture */}
								<Col md={3}>
									<div className="mb-4 bg-light text-center">
										<img
											id="profile-img"
											src={
												user?.profilePicture ||
												"https://via.placeholder.com/150"
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
													// value={formData.fullName}
													defaultValue={user?.fullName}
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
													defaultValue={user?.phoneNumber}
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
													// name="email"
													readOnly
													className="form-control"
													defaultValue={user?.email}
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Form.Group className="mb-4">
											<Form.Label>Address Line 1 (street)</Form.Label>
											<Form.Control
												type="text"
												name="street"
												className="form-control"
												defaultValue={user?.street}
												onChange={handleChange}
												placeholder="e.g. No. 9 Mary street"
											/>
										</Form.Group>
										<Col md={4}>
											<Form.Group className="mb-4">
												<Form.Label>City</Form.Label>
												<Form.Control
													type="text"
													name="city"
													className="form-control"
													defaultValue={user?.city}
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
													defaultValue={user?.state}
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
													defaultValue={user?.country}
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
											defaultValue={user?.bio}
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
											defaultValue={accountName}
											// onChange={handleChange}
											// disabled={isVerified}
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
											defaultValue={user?.accountNumber}
											onChange={handleChange}
											// readOnly={isVerified}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-4">
										<Form.Label htmlFor="bankName">
											{t("profile.bankName", {})}
										</Form.Label>
										{/* <Form.Control
											type="text"
											name="bankName"
											id="bankName"
											className="form-control"
											placeholder="Type to find bank name"
											defaultValue={user?.bankName}
											onChange={handleChange}
											// readOnly={isVerified}
										/> */}

										<Form.Select
											type="text"
											name="bankName"
											id="bankName"
											className="form-control"
											placeholder="Type to find bank name"
											defaultValue={user?.bankName}
											onChange={() => setIsVerified(false)}
										>
											<option value="null" selected disabled>
												Select bank name
											</option>
											{banks.map((bank) => (
												<option
													// selected={bank.name === user?.bankName}
													key={bank.id}
													value={bank.name}
												>
													{bank.name}
												</option>
											))}
										</Form.Select>
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
												src={order.product.primaryImage}
												width="70px"
												alt=""
											/>
										</td>
										<td>{order.product.title}</td>
										{/* <td>{new Date(order.createdAt).toLocaleString()}</td> */}
										<td>
											₦{order.product.price?.toFixed(2)}
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
					className="bg-light py-4 px-4 rounded shadow-sm mb-4  border-light border-2"
				>
					{renderContent()}
				</Col>
			</Row>
		</Container>
	);
};

export default AccountSummary;
