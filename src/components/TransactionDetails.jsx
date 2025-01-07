// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// const apiURL = import.meta.env.VITE_API_URL;

// const TransactionDetailsPage = () => {
//   const [transactionData, setTransactionData] = useState(null);
//   // const [shipmentData, setShipmentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();


//   const transactionReference = new URLSearchParams(window.location.search).get('reference');

//   useEffect(() => {
//     if (transactionReference) {
//       fetchTransactionDetails(transactionReference);
//     }
//   }, [transactionReference]);

//   const fetchTransactionDetails = async (reference) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiURL}/transaction/verify/${reference}`);
//       setTransactionData(response.data.data);
//       // console.log(response.data.data)

//       // Fetch shipment details (assuming the response contains a shipment reference or related data)
//       // if (response.data.data.shipmentReference) {
//       //   const shipmentResponse = await axios.get(`${apiURL}/shipment/${response.data.data.shipmentReference}`);
//       //   setShipmentData(shipmentResponse.data);
//       // }
//     } catch (err) {
//       setError('Error fetching transaction details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderTransactionDetails = () => {
//     if (loading) {
//       return <p>Loading transaction details...</p>;
//     }

//     if (error) {
//       return <p style={{ color: 'red' }}>{error}</p>;
//     }

//     if (transactionData) {
//       return (
//         <div>
//           <p><strong>Transaction ID:</strong> {transactionData.transactionId}</p>
//           <p><strong>Reference:</strong> {transactionData.reference}</p>
//           <p><strong>Amount:</strong> {transactionData.amount / 100} {transactionData.currency}</p>
//           <p><strong>Status:</strong> {transactionData.status}</p>
//           <p><strong>Paid At:</strong> {new Date(transactionData.paidAt).toLocaleString()}</p>
//           <p><strong>Customer Email:</strong> {transactionData.customerEmail}</p>
//           <p><strong>Payment Method:</strong> {transactionData.paymentMethod}</p>
//           <a onClick={() => navigate('/profile?tab=orders')}>
//             <button className="btn btn-success text-white">View Order</button>
//           </a>
//         </div>
//       );
//     }

//     return <p>No transaction data available.</p>;
//   };

//   return (
//     <div className="transaction-details-page p-5">
//       <h1>Transaction Details</h1>
//       {renderTransactionDetails()}
//     </div>
//   );
// };

// export default TransactionDetailsPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

const TransactionDetailsPage = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const transactionReference = new URLSearchParams(window.location.search).get('reference');

  useEffect(() => {
    if (transactionReference) {
      fetchTransactionDetails(transactionReference);
    }
  }, [transactionReference]);

  const fetchTransactionDetails = async (reference) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/transaction/verify/${reference}`);
      setTransactionData(response.data.data);
      console.log(response.data.data)
    } catch (err) {
      setError('Error fetching transaction details');
    } finally {
      setLoading(false);
    }
  };

  const renderTransactionDetails = () => {
    if (loading) {
      return <p className="text-center text-primary">Loading transaction details...</p>;
    }

    if (error) {
      return <p className="text-center text-danger">{error}</p>;
    }

    if (transactionData) {
      const statusColor = transactionData.status === "success" ? "text-success" : "text-danger";
      const statusIcon = transactionData.status === "success" ? <FaCheckCircle /> : <FaTimesCircle />;

      return (
        <div className="card shadow-sm p-4">
          <h2 className="mb-4">Transaction Summary</h2>
          <div className="mb-3">
            <span className={`h5 ${statusColor} me-2`}>{statusIcon}</span>
            <span className="h5">{transactionData.status.toUpperCase()}</span>
          </div>
          <div className="mb-3">
            <strong>Transaction ID:</strong> {transactionData.transactionId}
          </div>
          <div className="mb-3">
            <strong>Reference:</strong> {transactionData.reference}
          </div>
          <div className="mb-3">
            <strong>Amount:</strong> {transactionData.currency} {transactionData.amount / 100} 
          </div>
          <div className="mb-3">
            <strong>Paid At:</strong> {new Date(transactionData.paidAt).toLocaleString()}
          </div>
          <div className="mb-3">
            <strong>Customer Email:</strong> {transactionData.customerEmail}
          </div>
          <div className="mb-3">
            <strong>Payment Method:</strong> {transactionData.paymentMethod}
          </div>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => navigate('/profile?tab=orders')}
          >
            View Related Order
          </button>
        </div>
      );
    }

    return <p className="text-center">No transaction data available.</p>;
  };

  return (
    <div className="transaction-details-page container py-5">
      {/* <button 
        className="btn btn-light mb-4" 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button> */}
      <div className="text-center mb-5">
        <h1>Transaction Details</h1>
        <p className="text-muted">Review the details of your transaction below.</p>
      </div>
      {renderTransactionDetails()}
    </div>
  );
};

export default TransactionDetailsPage;
