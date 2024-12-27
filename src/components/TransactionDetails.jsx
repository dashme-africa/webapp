import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;

const TransactionDetailsPage = () => {
  const [transactionData, setTransactionData] = useState(null);
  // const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      // console.log(response.data.data)

      // Fetch shipment details (assuming the response contains a shipment reference or related data)
      // if (response.data.data.shipmentReference) {
      //   const shipmentResponse = await axios.get(`${apiURL}/shipment/${response.data.data.shipmentReference}`);
      //   setShipmentData(shipmentResponse.data);
      // }
    } catch (err) {
      setError('Error fetching transaction details');
    } finally {
      setLoading(false);
    }
  };

  const renderTransactionDetails = () => {
    if (loading) {
      return <p>Loading transaction details...</p>;
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (transactionData) {
      return (
        <div>
          <p><strong>Transaction ID:</strong> {transactionData.transactionId}</p>
          <p><strong>Reference:</strong> {transactionData.reference}</p>
          <p><strong>Amount:</strong> {transactionData.amount / 100} {transactionData.currency}</p>
          <p><strong>Status:</strong> {transactionData.status}</p>
          <p><strong>Paid At:</strong> {new Date(transactionData.paidAt).toLocaleString()}</p>
          <p><strong>Customer Email:</strong> {transactionData.customerEmail}</p>
          <p><strong>Payment Method:</strong> {transactionData.paymentMethod}</p>
          <a href="/payment-history">
            <button className="btn btn-success text-white">
              View transaction history
            </button>
          </a>

          {/* {shipmentData && (
            <div>
              <h3>Shipment Details</h3>
              <p><strong>Shipment ID:</strong> {shipmentData.shipmentId}</p>
              <p><strong>Status:</strong> {shipmentData.status}</p>
              <p><strong>Destination:</strong> {shipmentData.destination}</p>
              <p><strong>Estimated Arrival:</strong> {new Date(shipmentData.estimatedArrival).toLocaleString()}</p>
            </div>
          )} */}
        </div>
      );
    }

    return <p>No transaction data available.</p>;
  };

  return (
    <div className="transaction-details-page">
      <h1>Transaction Details</h1>
      {renderTransactionDetails()}
    </div>
  );
};

export default TransactionDetailsPage;
