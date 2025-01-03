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




// CheckoutPage.jsx
// import React, { useState } from 'react';
// import { Button, Card, Form, Modal } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = () => {
//     // Display confirmation modal
//     setShowConfirmationModal(true);
//   };

//   const handleProceedToPayment = () => {
//     // Proceed to payment (simulate redirect to Paystack)
//     setShowConfirmationModal(false);
//     navigate('/payment-verification');
//   };

//   return (
//     <div className="container">
//       <h3>Checkout</h3>
//       <Card>
//         <Card.Body>
//           <h5>Order Summary</h5>
//           <p>Product 1: $30</p>
//           <p>Shipping: $5</p>
//           <h4>Total: $35</h4>

//           <Form>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" placeholder="Enter your email" />
//             </Form.Group>
//             <Form.Group controlId="formBasicAddress">
//               <Form.Label>Shipping Address</Form.Label>
//               <Form.Control type="text" placeholder="Enter your address" />
//             </Form.Group>
//           </Form>

//           <Button variant="primary" onClick={handlePayment}>
//             Proceed to Payment
//           </Button>
//         </Card.Body>
//       </Card>

//       {/* Confirmation Modal */}
//       <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Order</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Product 1: $30</p>
//           <p>Shipping: $5</p>
//           <h4>Total: $35</h4>
//           <p>Are you sure you want to proceed to payment?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleProceedToPayment}>
//             Confirm and Pay
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CheckoutPage;
