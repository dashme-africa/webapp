import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../api.service";
import { toast } from "sonner";
const apiURL = import.meta.env.VITE_API_URL;

const ConfirmationPage = () => {
	const [transactionStatus, setTransactionStatus] = useState(null);
	const [loading, setLoading] = useState(true);
	const [transactionData, setTransactionData] = useState(null);
	const [bookingStatus, setbookingStatus] = useState(null);

	const transactionReference = new URLSearchParams(window.location.search).get(
		"reference"
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (transactionReference) {
			verifyTransaction(transactionReference);
		}
	}, [transactionReference]);

	// useEffect(() => {
	//   if (transactionStatus === 'success') {
	//     const timer = setTimeout(() => {
	//       // Navigate to the transaction details page with reference as query param
	//       navigate(`/transaction-details?reference=${transactionReference}`);
	//     }, 5000);
	//     return () => clearTimeout(timer);
	//   }
	// }, [transactionStatus, transactionReference, navigate]);

	// http://localhost:5173/confirmationPage?trxref=pyto5avis0&reference=pyto5avis0

	const verifyTransaction = async (reference) => {
		setLoading(true);
		const res = await useFetch(`/verify-transaction/${reference}`);
		setLoading(false);
		console.log(res);

		if (!res.ok) return toast.error(res.message);

		toast.success(res.message);
		setTransactionData(res.data.transactionDetails);
		setTransactionStatus(res.data.transactionDetails.status);
		setbookingStatus(res.data.bookingStatus);

		return;
	};
	return (
		<div className="confirmation-page p-4">
			<h1>Transaction Confirmation</h1>

			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					{transactionStatus === "success" ? (
						<div>
							<h2>Payment Successful!</h2>
							<p>Your transaction has been successfully completed.</p>
							<p>
								Amount: {transactionData.amount / 100}{" "}
								{transactionData.currency}
							</p>
							<p>
								Paid on: {new Date(transactionData.paidAt).toLocaleString()}
							</p>
							<p>Payment Method: {transactionData.paymentMethod}</p>
							<p>
								Booking Status:{" "}
								<span
									className={
										bookingStatus === "Failed to book shipment"
											? "text-danger"
											: "text-success"
									}
								>
									{bookingStatus}
								</span>
							</p>
							<button
								onClick={() =>
									navigate(
										`/transaction-details?reference=${transactionReference}`
									)
								}
							>
								View Transaction Details
							</button>
						</div>
					) : (
						<div>
							<h2>Payment Failed</h2>
							<p>Your payment was not successful. Please try again.</p>
							<button onClick={() => navigate(-1)}>Go Back</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ConfirmationPage;
