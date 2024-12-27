// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const apiURL = import.meta.env.VITE_API_URL;

// const ConfirmationPage = () => {
//   const [transactionStatus, setTransactionStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [transactionData, setTransactionData] = useState(null);

//   const transactionReference = new URLSearchParams(window.location.search).get('reference');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (transactionReference) {
//       verifyTransaction(transactionReference);
//     }
//   }, [transactionReference]);

//   useEffect(() => {
//     if (transactionStatus === 'success') {
//       const timer = setTimeout(() => {
//         navigate(`/transaction-details?reference=${transactionReference}`);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [transactionStatus, transactionReference, navigate]);

//   const verifyTransaction = async (reference) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiURL}/verify-transaction/${reference}`);
//       // console.log(response.data)
//       setTransactionData(response.data);
//       setTransactionStatus(response.data.status);
//     } catch (err) {
//       setError('Error verifying the transaction.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMessage = () => {
//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     if (error) {
//       return <p style={{ color: 'red' }}>{error}</p>;
//     }

//     switch (transactionStatus) {
//       case 'success':
//         return (
//           <div>
//             <h2>Payment Successful!</h2>
//             <p>Your transaction has been successfully completed.</p>
//             <p>Amount: {transactionData.amount / 100} {transactionData.currency}</p>
//             <p>Paid on: {new Date(transactionData.paid_at).toLocaleString()}</p>
//             <p>Payment Method: {transactionData.channel}</p>
//           </div>
//         );
//       case 'failed':
//         return <p style={{ color: 'red' }}>Payment failed. Please try again.</p>;
//       case 'pending':
//         return <p>Your payment is still being processed. Please wait.</p>;
//       case 'abandoned':
//         return <p>Your payment was abandoned. Please try again.</p>;
//       default:
//         return <p>Transaction status is unknown. Please check back later.</p>;
//     }
//   };

//   return (
//     <div className="confirmation-page">
//       <h1>Transaction Confirmation</h1>
//       {renderMessage()}
//     </div>
//   );
// };

// export default ConfirmationPage;

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

  useEffect(() => {
    if (transactionStatus === 'success') {
      const timer = setTimeout(() => {
        // Navigate to the transaction details page with reference as query param
        navigate(`/transaction-details?reference=${transactionReference}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [transactionStatus, transactionReference, navigate]);

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

  const renderMessage = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    switch (transactionStatus) {
      case 'success':
        return (
          <div>
            <h2>Payment Successful!</h2>
            <p>Your transaction has been successfully completed.</p>
            <p>Amount: {transactionData.amount / 100} {transactionData.currency}</p>
            <p>Paid on: {new Date(transactionData.paidAt).toLocaleString()}</p>
            <p>Payment Method: {transactionData.paymentMethod}</p>
            <p>Booking Status:
              <span className={bookingStatus === "Failed to book shipment" ? 'text-danger' : 'text-success'} >
                {bookingStatus}
              </span>
            </p>

          </div>
        );
      case 'failed':
        return <p style={{ color: 'red' }}>Payment failed. Please try again.</p>;
      case 'pending':
        return <p>Your payment is still being processed. Please wait.</p>;
      case 'abandoned':
        return <p>Your payment was abandoned. Please try again.</p>;
      default:
        return <p>Transaction status is unknown. Please check back later.</p>;
    }
  };

  return (
    <div className="confirmation-page">
      <h1>Transaction Confirmation</h1>
      {renderMessage()}
    </div>
  );
};

export default ConfirmationPage;
