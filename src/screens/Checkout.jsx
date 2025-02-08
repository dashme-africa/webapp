import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;
import { toast } from "sonner";
import useAuthStore from "../store/auth.store";
import useUserStore from "../store/user.store";
import { useFetch } from "../api.service";

const Checkout = () => {
	const { state } = useLocation();
	/**@type {{product:import("../types").Product}} */
	const { product, sellerId } = state || {};
	const [quantity, setQuantity] = useState(1);
	const [$user, setUser] = useState({ fullName: "", email: "" });
	const user = useUserStore((st) => st.user);
	const [couriers, setCouriers] = useState([]);
	const [suggestions, setSuggestions] = useState({
		toAddress: [],
		fromAddress: [],
	});
	const [type, setType] = useState("");
	const [selectedCourier, setSelectedCourier] = useState("");
	const [rateDetails, setRateDetails] = useState(null);
	const [sellerBankDetails, setSellerBankDetails] = useState(null);

	const navigate = useNavigate();
	const isAuthenticated = useAuthStore((st) => st.authed);
	const [deliveryDetails, setDeliveryDetails] = useState({
		fromAddress: { name: "", email: "", address: "", phone: "" },
		toAddress: {
			name: user?.fullName,
			email: user?.email,
			city: user?.city,
			state: user?.state,
			country: user?.country,
			phone: user?.phoneNumber,
		},
		parcels: { width: "10", length: "10", height: "5", weight: "2" },
		items: [
			{
				name: product?.title || "",
				description: product?.description || "",
				weight: "2",
				category: product?.category || "",
				amount: product?.price || 0,
				quantity: quantity,
			},
		],
	});
	// console.log(state);

	useEffect(() => {
		setSellerBankDetails(product.user);
	}, [sellerId]);

	// useEffect(() => {
	// 	const fetchSellerDetails = async () => {
	// 		if (sellerId) {
	// 			try {
	// 				const { data } = await axios.get(
	// 					`${apiURL}/payment/seller/${sellerId}`
	// 				);
	// 				const sellerAddress = `${data.seller.city}, ${data.seller.state}, ${data.seller.country}`;
	// 				setDeliveryDetails((prev) => ({
	// 					...prev,
	// 					fromAddress: {
	// 						name: data.seller.fullName,
	// 						email: data.seller.email,
	// 						address: sellerAddress,
	// 						phone: data.seller.phoneNumber,
	// 					},
	// 				}));
	// 				setSellerBankDetails(data);
	// 			} catch (error) {
	// 				console.error("Error fetching seller details:", error);
	// 			}
	// 		}
	// 	};

	// 	fetchSellerDetails();
	// }, [sellerId]);

	const handleFetchCouriers = async () => {
		if (!type) {
			toast.error("Please select type and fetch couriers.", "danger");
			return;
		}
		try {
			const response = await axios.get(`${apiURL}/couriers`, {
				params: { type },
			});
			setCouriers(response.data.data || []);
			toast.error(
				"Couriers fetched successfully! You can now choose a courier."
			);
		} catch (error) {
			console.error("Error fetching couriers:", error);
			toast.error("Failed to fetch couriers.", "danger");
		}
	};

	const handleFetchRate = async () => {
		if (!selectedCourier) {
			toast.error("Please select a courier to calculate rate", "danger");
			return;
		}
		const validatePayload = (payload) => {
			const { toAddress } = payload;

			if (!toAddress?.name) {
				setTimeout(() => {
					navigate("/login");
				}, 2000); // redirect after 2 seconds
				return "Name is required. Please login to proceed.";
			}
			if (!toAddress) {
				return "Invalid address details. Please fill in the required fields.";
			}
			if (!toAddress?.email) {
				return "Email is required.";
			}
			if (!deliveryDetails.toAddress.city) {
				return "City is required.";
			}
			if (!deliveryDetails.toAddress.state) {
				return "State is required.";
			}
			if (!deliveryDetails.toAddress.country) {
				return "Country is required.";
			}
			if (!toAddress.phone || !/^0\d{10}$/.test(toAddress.phone)) {
				return "Invalid phone number. Please enter 11 digits starting with 0.";
			}
			return null;
		};

		try {
			const address = `${deliveryDetails.toAddress.city}, ${deliveryDetails.toAddress.state}, ${deliveryDetails.toAddress.country}`;

			const payload = {
				type,
				carrierName: selectedCourier,
				fromAddress: deliveryDetails.fromAddress,
				toAddress: {
					name: deliveryDetails.toAddress.name,
					email: deliveryDetails.toAddress.email,
					address,
					phone: deliveryDetails.toAddress.phone,
				},
				parcels: deliveryDetails.parcels,
				items: deliveryDetails.items,
			};

			// console.log("Payload:", payload);

			// Validate payload before making the request
			const validationError = validatePayload(payload);
			if (validationError) {
				toast.error(validationError, "danger");
				return;
			}
			const { data } = await axios.post(`${apiURL}/rates`, payload);
			// console.log(data);

			if (data.data.rates && data.data.rates.status === true) {
				setRateDetails(data.data.rates);
				toast.error("Rate fetched successfully!. Proceed to payment");
			} else {
				const errorMessage = data.data.rates.message || "Failed to fetch rates";
				toast.error(errorMessage, "danger");
			}
		} catch (error) {
			console.error(
				"Error fetching rates:",
				error.response?.data || error.message
			);
			toast.error("Failed to fetch rates.", "danger");
		}
	};

	const handleQuantityChange = (change) => {
		setQuantity((prev) => Math.max(1, prev + change));
		setDeliveryDetails((prev) => ({
			...prev,
			items: prev.items.map((item) => ({
				...item,
				quantity: quantity + change,
			})),
		}));
	};

	const total = product?.price * quantity + (rateDetails?.amount || 0);

	const handlePayment = async () => {
		if (!sellerBankDetails) {
			toast.error(
				"The seller's bank account details have not been verified",
				"danger"
			);
			return;
		}
		// if (!rateDetails) {
		// 	toast.error("Calculate Rate before proceeding to checkout", "danger");
		// 	return;
		// }

		const productAmount = product.price * quantity;
		// const shippingAmount = rateDetails.amount;
		const totalAmount = productAmount; //+ shippingAmount;

		const platformCharge = Math.floor((10 / 100) * productAmount); //+ shippingAmount;
		const subaccountResponse = await useFetch("/payment/subaccount", "POST", {
			businessName: sellerBankDetails.accountName,
			bankName: sellerBankDetails.bankName,
			accountNumber: sellerBankDetails.accountNumber,
			percentageCharge: 10,
		});
		// console.log(subaccountResponse);

		if (!subaccountResponse.ok) return toast.error(subaccountResponse.message);

		const subaccountCode = subaccountResponse.data.data.subaccount_code;
		console.log({
			email: user.email,
			amount: totalAmount * 100, // convert to kobo
			subaccount: subaccountCode,
			transaction_charge: platformCharge * 100, // convert to kobo
			// redis_key: rateDetails.redis_key,
			// rate_id: rateDetails.courier.id,
			// rate_amount: rateDetails.amount,
			product_id: product.id, // Pass product ID
			quantity: quantity, // Pass quantity
			product_amount: product.price, // Pass amount of product (before rate was added
			seller_id: product.uploader, // Pass seller ID
			user_id: user.id, // Pass user ID
		});

		const transactionResponse = await useFetch(
			`/payment/initialize-transaction`,
			"POST",
			{
				email: user.email,
				amount: totalAmount * 100, // convert to kobo
				subaccount: subaccountCode,
				transaction_charge: platformCharge * 100, // convert to kobo
				// redis_key: rateDetails.redis_key,
				// rate_id: rateDetails.courier.id,
				// rate_amount: rateDetails.amount,
				product_id: product.id, // Pass product ID
				quantity: quantity, // Pass quantity
				product_amount: product.price, // Pass amount of product (before rate was added
				seller_id: product.uploader, // Pass seller ID
				user_id: user.id, // Pass user ID
			}
		);
		console.log(transactionResponse);

		if (!transactionResponse.ok)
			return toast.error(transactionResponse.message);

		toast.success(transactionResponse.message);

		window.location.href = transactionResponse.data.data.authorization_url;

		return;
		// Initiating subaccount creation for the seller
		// const subaccountResponse = await axios.post(
		// 	`${apiURL}/payment/subaccount`,
		// 	{
		// businessName: sellerBankDetails.seller.accountName,
		// bankName: sellerBankDetails.seller.bankName,
		// accountNumber: sellerBankDetails.seller.accountNumber,
		// percentageCharge: 10,
		// 	}
		// );

		// const subaccountCode = subaccountResponse.data.data.subaccount_code;

		// Pass product ID, quantity, amount, rate amount, and seller ID
		// console.log({
		// 	email: user.email,
		// 	amount: totalAmount * 100, // convert to kobo
		// 	subaccount: subaccountCode,
		// 	transaction_charge: platformCharge * 100, // convert to kobo
		// 	redis_key: rateDetails.redis_key,
		// 	rate_id: rateDetails.courier.id,
		// 	rate_amount: rateDetails.amount,
		// 	product_id: product.id, // Pass product ID
		// 	quantity: quantity, // Pass quantity
		// 	product_amount: product.price, // Pass amount of product (before rate was added
		// 	seller_id: sellerId, // Pass seller ID
		// 	user_id: user.id, // Pass user ID
		// });

		// Initializing the transaction with metadata
		// const transactionResponse = await axios.post(
		// 	`${apiURL}/payment/initialize-transaction`,
		// 	{
		// 		email: user.email,
		// 		amount: totalAmount * 100, // convert to kobo
		// 		subaccount: subaccountCode,
		// 		transaction_charge: platformCharge * 100, // convert to kobo
		// 		redis_key: rateDetails.redis_key,
		// 		rate_id: rateDetails.courier.id,
		// 		rate_amount: rateDetails.amount,
		// 		product_id: product.id, // Pass product ID
		// 		quantity: quantity, // Pass quantity
		// 		product_amount: product.price, // Pass amount of product (before rate was added
		// 		seller_id: sellerId, // Pass seller ID
		// 		user_id: user.id, // Pass user ID
		// 	}
		// );

		toast.error("Payment initialization successful. Redirecting...");
		// Redirect to Paystack payment page
		window.location.href = transactionResponse.data.data.authorization_url;
	};

	const handleInputChange = (section, field, value, index = null) => {
		// console.log(`Updating ${section}.${field} with value: ${value}`);
		setDeliveryDetails((prevDetails) => {
			const updatedDetails = { ...prevDetails };
			if (index !== null) {
				updatedDetails[section][index][field] = value;
			} else {
				updatedDetails[section][field] = value;
			}
			return updatedDetails;
		});
	};

	return (
		<div className="container my-5">
			<div className="row justify-content-between">
				{/* Billing Details */}
				<div className="col-md-6">
					<h3 className="mb-4 text-success">Billing Details</h3>

					<i>
						Having Troubles During Checkout, click either live chat or{" "}
						<a
							href="https://wa.me/message/7J6DBJ5F6ESGB1"
							className="text-dark "
						>
							send whatsapp
						</a>
					</i>

					<Form>
						<Form.Group className="mb-2 mt-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								defaultValue={
									deliveryDetails.toAddress
										? deliveryDetails.toAddress.name
										: ""
								}
								placeholder="Only registered users can checkout."
								readOnly
							/>
						</Form.Group>
						{!isAuthenticated && (
							<p>
								Please register <Link to="/register">here</Link>
							</p>
						)}
						<Form.Group className="mb-2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								value={deliveryDetails.toAddress?.email}
								placeholder="Only registered users can checkout"
								readOnly
							/>
						</Form.Group>

						{/* Address Details */}
						<Form.Group className="mb-2">
							<div className="d-flex justify-content-between">
								<div className="me-2 flex-grow-1">
									<Form.Label>City</Form.Label>
									<Form.Control
										value={deliveryDetails.toAddress?.city}
										onChange={(e) =>
											handleInputChange("toAddress", "city", e.target.value)
										}
										placeholder="e.g. Ikeja"
									/>
								</div>
								<div className="flex-grow-1">
									<Form.Label>State/Province</Form.Label>
									<Form.Control
										value={deliveryDetails.toAddress?.state}
										onChange={(e) =>
											handleInputChange("toAddress", "state", e.target.value)
										}
										placeholder="e.g. Lagos"
									/>
								</div>
							</div>
						</Form.Group>

						<Form.Group className="mb-2">
							<div className="d-flex justify-content-between">
								<div className="me-2 flex-grow-1">
									<Form.Label>Country</Form.Label>
									<Form.Control
										value={deliveryDetails.toAddress?.country}
										onChange={(e) =>
											handleInputChange("toAddress", "country", e.target.value)
										}
										placeholder="e.g. Nigeria"
									/>
								</div>
								<div className="flex-grow-1">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										value={deliveryDetails.toAddress?.phone}
										placeholder="e.g. 08012345678"
										onChange={(e) =>
											setDeliveryDetails((prev) => ({
												...prev,
												toAddress: { ...prev.toAddress, phone: e.target.value },
											}))
										}
									/>
								</div>
							</div>
						</Form.Group>

						{/* <Form.Group className="mb-2">
							<Form.Label>Type</Form.Label>
							<br />
							<i>
								*Interstate (deliveries between states eg. From Lagos to Abuja)*
							</i>{" "}
							<br />
							<i>
								*Intrastate (deliveries within the state eg. From Ajah to VI)*
							</i>
							<Form.Select
								value={type}
								onChange={(e) => setType(e.target.value)}
							>
								<option value="">Select Type</option>
								<option value="interstate">Interstate</option>
								<option value="intrastate">Intrastate</option>
							</Form.Select>
						</Form.Group>
						<Button className="mb-3" onClick={handleFetchCouriers}>
							Fetch Couriers
						</Button>
						<Form.Group className="mb-2">
							<Form.Label>Courier</Form.Label>
							<Form.Select
								value={selectedCourier}
								onChange={(e) => setSelectedCourier(e.target.value)}
							>
								<option value="">Select Courier</option>
								{couriers.map((courier, idx) => (
									<option key={idx} value={courier.name}>
										{courier.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Button className="mb-3" onClick={handleFetchRate}>
							Calculate Rate
						</Button> */}
					</Form>
				</div>

				{/* Product Summary */}
				<div className="col-md-4">
					<Card className="p-4">
						<h5>Order Summary</h5>
						{product && (
							<div className="mb-4">
								<div className="d-flex align-items-center justify-content-between">
									<img
										src={product.primaryImage}
										alt={product.title}
										style={{
											width: "50px",
											height: "50px",
											objectFit: "cover",
										}}
									/>
									<div className="ms-3">
										<h6>{product.title}</h6>
										<p>Price: N{product.price}</p>
									</div>
									<div className="d-flex align-items-center">
										<Button
											variant="outline-secondary"
											onClick={() => handleQuantityChange(-1)}
											className="px-2"
										>
											-
										</Button>
										<span className="px-3">{quantity}</span>
										<Button
											variant="outline-secondary"
											onClick={() => handleQuantityChange(1)}
											className="px-2"
										>
											+
										</Button>
									</div>
								</div>
							</div>
						)}
						{rateDetails && (
							<div className="mt-4">
								<h5>Shipping Details:</h5>
								<p>Courier: {rateDetails.courier.name}</p>
								<p>
									Amount: {rateDetails.amount} {rateDetails.currency}
								</p>
								<p>Estimated Delivery: {rateDetails.estimated_days}</p>
								<p>Pickup Info: {rateDetails.pickup}</p>
							</div>
						)}
						<div className="d-flex justify-content-between">
							<p>Total</p>
							<p>N{total}</p>
						</div>
						<Button variant="success" className="w-100" onClick={handlePayment}>
							Proceed to Payment
						</Button>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
