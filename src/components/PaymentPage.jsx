// import { useEffect, useState } from 'react';

// const PaymentPage = () => {
//     const [status, setStatus] = useState('Processing...');

//     useEffect(() => {
//         const queryParams = new URLSearchParams(window.location.search);
//         const transactionReference = queryParams.get('transactionReference');

//         console.log(transactionReference)
//         if (transactionReference) {
            
//             // fetch('http://localhost:5000/api/payment/verify-payment', {
//             fetch('https://dashmeafrica-backend.vercel.app/api/payment/verify-payment', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ transactionReference }),
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     if (data.success) {
//                         setStatus('Payment successful! Thank you.');
//                     } else {
//                         setStatus('Payment failed or incomplete.');
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error verifying payment:', error);
//                     setStatus('An error occurred. Please try again.');
//                 });
//         } else {
//             setStatus('Invalid payment reference.');
//         }
//     }, []);

//     return <div>{status}</div>;
// };

// export default PaymentPage;



import React, { useState } from "react";
import axios from "axios";

const PaymentStatus = () => {
  const [transactionReference, setTransactionReference] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheckStatus = async () => {
    try {
      const response = await axios.post("/api/payment/verify-payment", {
        transactionReference,
      });
      setStatus(response.data.status);
    } catch (error) {
      setStatus("Error retrieving payment status.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Check Payment Status</h2>
      <div className="mb-3">
        <label htmlFor="transactionReference" className="form-label">Transaction Reference</label>
        <input
          type="text"
          className="form-control"
          id="transactionReference"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
        />
      </div>
      <button onClick={handleCheckStatus} className="btn btn-info">Check Status</button>
      {status && <p className="mt-3">Payment Status: {status}</p>}
    </div>
  );
};

export default PaymentStatus;
