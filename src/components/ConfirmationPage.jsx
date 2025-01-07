import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiURL = import.meta.env.VITE_API_URL;

const ConfirmationPage = () => {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [bookingStatus, setbookingStatus] = useState(null);

  const transactionReference = new URLSearchParams(window.location.search).get('reference');
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

  const verifyTransaction = async (reference) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/verify-transaction/${reference}`);
      setTransactionData(response.data.transactionDetails);
      setTransactionStatus(response.data.transactionDetails.status);
      setbookingStatus(response.data.bookingStatus);
      console.log(response.data.bookingStatus)
    } catch (err) {
      setError('Error verifying the transaction.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="confirmation-page p-4">
      <h1>Transaction Confirmation</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
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
              <button onClick={() => navigate(`/transaction-details?reference=${transactionReference}`)}>
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

