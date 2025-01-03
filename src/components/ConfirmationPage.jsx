// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const apiURL = import.meta.env.VITE_API_URL;

// const ConfirmationPage = () => {
//   const [transactionStatus, setTransactionStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [transactionData, setTransactionData] = useState(null);
//   const [bookingStatus, setbookingStatus] = useState(null);

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
//         // Navigate to the transaction details page with reference as query param
//         navigate(`/transaction-details?reference=${transactionReference}`);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [transactionStatus, transactionReference, navigate]);

//   const verifyTransaction = async (reference) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiURL}/verify-transaction/${reference}`);
//       setTransactionData(response.data.transactionDetails);
//       setTransactionStatus(response.data.transactionDetails.status);
//       setbookingStatus(response.data.bookingStatus);
//       console.log(response.data.bookingStatus)
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
//             <p>Paid on: {new Date(transactionData.paidAt).toLocaleString()}</p>
//             <p>Payment Method: {transactionData.paymentMethod}</p>
//             <p>Booking Status:
//               <span className={bookingStatus === "Failed to book shipment" ? 'text-danger' : 'text-success'} >
//                 {bookingStatus}
//               </span>
//             </p>

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


// PaymentVerificationPage.jsx
// import React, { useEffect, useState } from 'react';
// import { Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const PaymentVerificationPage = () => {
//   const [paymentVerified, setPaymentVerified] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate verifying payment with Paystack
//     setTimeout(() => {
//       // Assume payment was successful for demonstration
//       setPaymentVerified(true);
//     }, 3000);
//   }, []);

//   const handleRedirect = () => {
//     navigate('/transaction-details');
//   };

//   return (
//     <div className="container">
//       <h3>Payment Verification</h3>
//       {paymentVerified ? (
//         <Alert variant="success">
//           Payment successful! You will be redirected to your transaction details page.
//         </Alert>
//       ) : (
//         <Alert variant="warning">
//           Verifying payment, please wait...
//         </Alert>
//       )}

//       {paymentVerified && (
//         <Button variant="primary" onClick={handleRedirect}>
//           View Transaction Details
//         </Button>
//       )}
//     </div>
//   );
// };

// export default PaymentVerificationPage;


// TransactionDetailsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';

// const TransactionDetailsPage = () => {
//   const [transactionDetails, setTransactionDetails] = useState(null);
//   // const {  } = useLocation().state;

//   useEffect(() => {
//     // Simulate fetching transaction details (replace with actual API call)
//     setTimeout(() => {
//       setTransactionDetails({
//         // id: ,
//         status: 'Completed',
//         totalAmount: '$35',
//         items: ['Product 1', 'Shipping'],
//         shippingAddress: '123 Example St.',
//       });
//     }, 2000);
//   }, []);

//   return (
//     <div className="container">
//       <h3>Transaction Details</h3>
//       {transactionDetails ? (
//         <Card>
//           <Card.Body>
//             <h5>Transaction ID: {transactionDetails.id}</h5>
//             <p>Status: {transactionDetails.status}</p>
//             <p>Total Amount: {transactionDetails.totalAmount}</p>
//             <p>Shipping Address: {transactionDetails.shippingAddress}</p>
//             <h6>Items:</h6>
//             <ul>
//               {transactionDetails.items.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//             <Button variant="primary">Track Order</Button>
//           </Card.Body>
//         </Card>
//       ) : (
//         <p>Loading transaction details...</p>
//       )}
//     </div>
//   );
// };

// export default TransactionDetailsPage;


// OrderTrackingPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';

// const OrderTrackingPage = () => {
//   const [orderStatus, setOrderStatus] = useState(null);

//   useEffect(() => {
//     // Simulate fetching order tracking details (replace with actual API call)
//     setTimeout(() => {
//       setOrderStatus('Your order has been shipped and is in transit.');
//     }, 2000);
//   }, []);

//   return (
//     <div className="container">
//       <h3>Order Tracking</h3>
//       {orderStatus ? (
//         <Card>
//           <Card.Body>
//             <h5>Order Status: {orderStatus}</h5>
//             <Button variant="primary">View Shipping Details</Button>
//           </Card.Body>
//         </Card>
//       ) : (
//         <p>Loading order tracking information...</p>
//       )}
//     </div>
//   );
// };

// export default OrderTrackingPage;
// AccountSummaryPage.jsx
// import React from 'react';
// import { Card, Table, Button, ListGroup } from 'react-bootstrap';

// const AccountSummaryPage = () => {
//   return (
//     <div className="container my-5">
//       <h3 className="mb-4">Account Summary</h3>
//       <div className="row">
//         {/* Profile Information */}
//         <div className="col-md-4">
//           <Card className="mb-4">
//             <Card.Header>
//               <h5>Profile Information</h5>
//             </Card.Header>
//             <Card.Body>
//               <p><strong>Name:</strong> John Doe</p>
//               <p><strong>Email:</strong> john.doe@example.com</p>
//               <p><strong>Phone:</strong> +123 456 7890</p>
//               <p><strong>Address:</strong> 123 Main St, Springfield</p>
//               <Button variant="primary" size="sm">Edit Profile</Button>
//             </Card.Body>
//           </Card>
//         </div>

//         {/* Account Statistics */}
//         <div className="col-md-8">
//           <div className="row">
//             <div className="col-md-4 mb-4">
//               <Card>
//                 <Card.Body>
//                   <h6>Total Orders</h6>
//                   <h3>25</h3>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div className="col-md-4 mb-4">
//               <Card>
//                 <Card.Body>
//                   <h6>Total Spent</h6>
//                   <h3>$1,500</h3>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div className="col-md-4 mb-4">
//               <Card>
//                 <Card.Body>
//                   <h6>Loyalty Points</h6>
//                   <h3>120</h3>
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="row">
//         <div className="col-12">
//           <Card className="mb-4">
//             <Card.Header>
//               <h5>Recent Orders</h5>
//             </Card.Header>
//             <Card.Body>
//               <Table striped hover responsive>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Date</th>
//                     <th>Order ID</th>
//                     <th>Total</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>1</td>
//                     <td>2025-01-01</td>
//                     <td>#12345</td>
//                     <td>$50</td>
//                     <td>Delivered</td>
//                   </tr>
//                   <tr>
//                     <td>2</td>
//                     <td>2024-12-28</td>
//                     <td>#12344</td>
//                     <td>$150</td>
//                     <td>Shipped</td>
//                   </tr>
//                   <tr>
//                     <td>3</td>
//                     <td>2024-12-25</td>
//                     <td>#12343</td>
//                     <td>$100</td>
//                     <td>Processing</td>
//                   </tr>
//                 </tbody>
//               </Table>
//               <Button variant="link" size="sm">View All Orders</Button>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>

//       {/* Payment Methods */}
//       <div className="row">
//         <div className="col-12">
//           <Card className="mb-4">
//             <Card.Header>
//               <h5>Saved Payment Methods</h5>
//             </Card.Header>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <strong>Visa ****1234</strong> - Exp: 12/25
//                   <Button variant="link" size="sm" className="float-end">Remove</Button>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>Mastercard ****5678</strong> - Exp: 09/24
//                   <Button variant="link" size="sm" className="float-end">Remove</Button>
//                 </ListGroup.Item>
//               </ListGroup>
//               <Button variant="primary" size="sm" className="mt-3">Add Payment Method</Button>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>

//       {/* Account Settings */}
//       <div className="row">
//         <div className="col-12">
//           <Card>
//             <Card.Header>
//               <h5>Account Settings</h5>
//             </Card.Header>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Button variant="link" size="sm">Update Password</Button>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Button variant="link" size="sm">Manage Addresses</Button>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Button variant="link" size="sm">Privacy Settings</Button>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Button variant="link" size="sm" className="text-danger">Deactivate Account</Button>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSummaryPage;

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AccountSummary = () => {
  return (
    <Container className="my-5">

      
<div className="small-screen-layout">
  <header>
    {/* <!-- User profile picture and username --> */}
  </header>
  <nav>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">My Profile</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="false">My Orders</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="transaction-tab" data-bs-toggle="tab" data-bs-target="#transaction" type="button" role="tab" aria-controls="transaction" aria-selected="false">Transaction History</button>
      </li>
      {/* <!-- Add more tabs as needed --> */}
    </ul>
  </nav>
  <div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
      {/* <!-- My Profile content --> */}
    </div>
    <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
      {/* <!-- My Orders content --> */}
    </div>
    <div className="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
      {/* <!-- Transaction History content --> */}
    </div>
    {/* <!-- Add more tab panes as needed --> */}
  </div>
</div>
<div className="desktop-layout">
  <header>
    {/* <!-- User profile picture and username --> */}
  </header>
  <nav>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="dashboard-tab" data-bs-toggle="tab" data-bs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">Dashboard</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">My Profile</button>
      </li>
      {/* <!-- Add more tabs as needed --> */}
    </ul>
  </nav>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 left-sidebar">
        {/* <!-- Navigation menu or quick links --> */}
      </div>
      <div className="col-md-6 main-content">
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            {/* <!-- Dashboard content --> */}
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            {/* <!-- My Profile content --> */}
          </div>
          {/* <!-- Add more tab panes as needed --> */}
        </div>
      </div>
      <div className="col-md-3 right-sidebar">
        {/* <!-- Additional information or promotions --> */}
      </div>
    </div>
  </div>
  <footer>
    {/* <!-- Copyright information and links --> */}
  </footer>
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        My Profile
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        {/* <!-- My Profile content --> */}
        ncncncnn
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        My Orders
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        {/* <!-- My Orders content --> */}
        cnncncnncnnxxkx
      </div>
    </div>
  </div>
  {/* <!-- Add more accordion items as needed --> */}
</div>

</div>

          <h4 className="text-end mb-3">Welcome, <span className="text-success">Buzz brain</span></h4>
      <Row>
        <Col md={3} className="px-4 py-4">
          <div className="mb-4">
            <h5>Manage My Account</h5>
            <ul className="list-unstyled">
              <li><a href="#profile" className="text-decoration-none">My Profile</a></li>
              <li><a href="#address-book" className="text-decoration-none">Address Book</a></li>
              <li><a href="#payment-options" className="text-decoration-none">My Payment Options</a></li>
            </ul>
          </div>
          <div className="mb-4">
            <h5>My Orders</h5>
            <ul className="list-unstyled">
              <li><a href="#checkout" className="text-decoration-none">Checkout</a></li>
              <li><a href="#returns" className="text-decoration-none">My Returns</a></li>
              <li><a href="#cancellations" className="text-decoration-none">My Cancellations</a></li>
            </ul>
          </div>
          <div>
            <h5>My Wishlist</h5>
          </div>
        </Col>
        <Col md={9} className="bg-light p-5 rounded shadow-sm mb-4 border border-light border-2 position-relative"> 
          <h4 className="mb-4 text-success">Edit Your Profile</h4>
          <Row className="mb-3 gx-5">
            
            <Col md={3} style={{ height: '150px' }}>
              <div className="profile-image mb-3 mb-md-0 text-center text-md-start h-100" style={{ height: '100px', weight: '100px' }}>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="img-fluid rounded-circle shadow-sm border border-light border-2 p-1 bg-white rounded bg-light" 
                  style={{ background:"red" }}
                />
              </div>
              <Form.Group controlId="formFile" className="mt-2">
                <Form.Control type="file" />
              </Form.Group>
            </Col>

            <Col md={9}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="firstName" className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="First Name" defaultValue="Chinomso" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName" className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Last Name" defaultValue="Nduoma" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="username" className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="Username" defaultValue="Christian" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        defaultValue="chinomsochristian03@gmail.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Residential Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    defaultValue="15, Matamni Street Onipanu, Lagos"
                  />
                </Form.Group>
                {/* <h5 className="mt-4">Password Changes</h5>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="currentPassword" className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control type="password" placeholder="Current Password" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="newPassword" className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password" placeholder="New Password" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="confirmPassword" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                  </Col>
                </Row> */}
                <Button variant="success" className="w-100">
                  Save Changes
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSummary;


