// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Form, Button, Card } from "react-bootstrap";
// import axios from "axios";

// const Checkout = () => {
//   const { state } = useLocation();
//   const { product, sellerId } = state || {};

//   const [quantity, setQuantity] = useState(1);
//   const [billingDetails, setBillingDetails] = useState({
//     streetAddress: "",
//     apartment: "",
//     town: "",
//     phoneNumber: "",
//   });
//   const [user, setUser] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const { data } = await axios.get(
//             "https://dashmeafrica-backend.vercel.app/api/userProfile/profile",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setUser({
//             fullName: data.fullName,
//             username: data.username,
//             email: data.email,
//           });
//         } catch (error) {
//           console.error("Error fetching user data:", error.response?.data.message || error.message);
//         }
//       }
//     };

//     fetchUser();
//   }, [sellerId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBillingDetails({ ...billingDetails, [name]: value });
//   };

//   const handleQuantityChange = (change) => {
//     setQuantity((prev) => Math.max(1, prev + change));
//   };

//   const total = product?.price * quantity;

//   const placeOrderHandler = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You need to log in to place an order!");
//       return;
//     }

//     const requiredBillingFields = ["streetAddress", "apartment", "town", "phoneNumber"];
//     const missingBillingFields = requiredBillingFields.filter((field) => !billingDetails[field]);

//     if (missingBillingFields.length > 0) {
//       alert(`Please fill in all billing details: ${missingBillingFields.join(", ")}`);
//       return;
//     }

//     if (!user.fullName || !user.username || !user.email) {
//       alert("User data is incomplete. Please log in again.");
//       return;
//     }

//       // Store the seller ID in local storage
//   localStorage.setItem("sellerId", sellerId);

//     const paymentData = {
//       amount: total,
//       email: user.email,
//       phoneNumber: billingDetails.phoneNumber,
//       paymentReference: `${Date.now()}`,
//       customerAccountNumber: sellerAccount.accountNumber,
//       customerAccountName: sellerAccount.accountName,
//       customerAccountCode: sellerAccount.accountCode,
//     };

//     {console.log(paymentData)}

//     try {
//       const response = await axios.post(
//         "https://dashmeafrica-backend.vercel.app/api/payment/initiate-payment",
//         // "http://localhost:5000/api/payment/initiate-payment",
//         paymentData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.success) {
//         const { transactionReference, paymentLink } = response.data;
//         localStorage.setItem("transactionReference", transactionReference);
//         window.location.href = paymentLink;
//       } else {
//         alert(response.data.message || "Failed to initiate payment.");
//       }
//     } catch (error) {
//       console.error("Error during payment initiation:", error.response?.data || error.message);
//       alert("An error occurred while initiating payment. Please try again.");
//     }
//   };

//   return (
//     <div className="container my-5 d-flex justify-content-between">
//       {/* Billing Details */}
//       <div className="w-50">
//       <p className="bg-danger bg-opacity-50 p-3 rounded">Make sure you are logged in to fill billing details  &nbsp; &nbsp;<a href="/login"> Login now</a> </p> 
//         <h3 className="mb-4 text-success">Billing Details</h3>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control value={user.fullName} readOnly />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Username</Form.Label>
//             <Form.Control value={user.username} readOnly />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control value={user.email} readOnly />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Street Address</Form.Label>
//             <Form.Control
//               type="text"
//               name="streetAddress"
//               placeholder="Enter your street address"
//               value={billingDetails.streetAddress}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Apartment, Floor, etc. (Optional)</Form.Label>
//             <Form.Control
//               type="text"
//               name="apartment"
//               placeholder="Enter apartment details"
//               value={billingDetails.apartment}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Town/City</Form.Label>
//             <Form.Control
//               type="text"
//               name="town"
//               placeholder="Enter your town or city"
//               value={billingDetails.town}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="phoneNumber"
//               placeholder="Enter your phone number"
//               value={billingDetails.phoneNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>
//         </Form>
//       </div>

//       {/* Product Summary */}
//       <div className="w-40">
//         <Card className="p-4">
//           <h5>Order Summary</h5>
//           {product && (
//             <div className="mb-4">
//               <div className="d-flex align-items-center justify-content-between">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//                 <div className="ms-3">
//                   <h6>{product.title}</h6>
//                   <p>Price: N{product.price}</p>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <Button
//                     variant="outline-secondary"
//                     onClick={() => handleQuantityChange(-1)}
//                     className="px-2"
//                   >
//                     -
//                   </Button>
//                   <span className="px-3">{quantity}</span>
//                   <Button
//                     variant="outline-secondary"
//                     onClick={() => handleQuantityChange(1)}
//                     className="px-2"
//                   >
//                     +
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div className="d-flex justify-content-between">
//             <p>Total</p>
//             <p>N{total}</p>
//           </div>
//           <Button
//             variant="success"
//             className="w-100"
//             onClick={placeOrderHandler}
//           >
//             Proceed to Payment
//           </Button>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import axios from "axios";

// const Checkout = () => {
//   const { state } = useLocation();
//   const { product, sellerId } = state || {};

//   const [quantity, setQuantity] = useState(1);
//   const [billingDetails, setBillingDetails] = useState({
//     streetAddress: "",
//     apartment: "",
//     town: "",
//     phoneNumber: "",
//   });
//   const [user, setUser] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//   });
//   const [sellerBankDetails, setSellerBankDetails] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const { data } = await axios.get(
//             "http://localhost:5000/api/userProfile/profile",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setUser({
//             fullName: data.fullName,
//             username: data.username,
//             email: data.email,
//           });
//         } catch (error) {
//           console.error("Error fetching user data:", error.response?.data.message || error.message);
//         }
//       }
//     };


//     const fetchSellerBankDetails = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5000/api/payment/seller/${sellerId}/bank-details`
//         );
//         setSellerBankDetails(data);
// console.log(data)

//       } catch (error) {
//         setError("Failed to fetch seller's bank details. Please try again.");
//         console.error("Error fetching seller's bank details:", error);
//       }
//     };
//     fetchUser();
//     if (sellerId) fetchSellerBankDetails();
//   }, [sellerId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBillingDetails({ ...billingDetails, [name]: value });
//   };

//   const handleQuantityChange = (change) => {
//     setQuantity((prev) => Math.max(1, prev + change));
//   };

//   const total = product?.price * quantity;

//   const handlePayment = async () => {
//     if (!sellerBankDetails) {
//       setError('Seller bank details are required for payment.');
//       return;
//     }
  
//     try {
//       const subaccountResponse = await axios.post('http://localhost:5000/api/payment/subaccount', {
//         businessName: sellerBankDetails.accountName,
//         bankName: sellerBankDetails.bankName, // Ensure you have this mapped correctly
//         accountNumber: sellerBankDetails.accountNumber,
//         percentageCharge: 30, // Adjust percentage as needed
//       });
  
//       const subaccountCode = subaccountResponse.data.data.subaccount_code;
  
//       const transactionResponse = await axios.post('http://localhost:5000/api/payment/initialize-transaction', {
//         email: user.email,
//         amount: total * 100, // Paystack expects amount in kobo
//         subaccount: subaccountCode,
//         transactionCharge: 10000, // Optional: Flat fee for main account
//         bearer: 'subaccount', // Optional: Who bears the charge
//       });
  
//       // Redirect to Paystack payment page
//       window.location.href = transactionResponse.data.data.authorization_url;
//     } catch (error) {
//       console.error('Error during payment:', error.response?.data.message || error.message);
//       setError('Payment initialization failed. Please try again.');
//     }
//   };
  

//   return (
//     <div className="container my-5">
//       <div className="row">
//         {/* Billing Details */}
//         <div className="col-md-6">
//           <h3 className="mb-4 text-success">Billing Details</h3>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control value={user.fullName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <Form.Control value={user.username} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control value={user.email} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Street Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="streetAddress"
//                 placeholder="Enter your street address"
//                 value={billingDetails.streetAddress}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Apartment, Floor, etc. (Optional)</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="apartment"
//                 placeholder="Enter apartment details"
//                 value={billingDetails.apartment}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Town/City</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="town"
//                 placeholder="Enter your town or city"
//                 value={billingDetails.town}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Enter your phone number"
//                 value={billingDetails.phoneNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </Form>
//         </div>

//         {/* Product Summary */}
//         <div className="col-md-6">
//           <Card className="p-4">
//             <h5>Order Summary</h5>
//             {product && (
//               <div className="mb-4">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                   />
//                   <div className="ms-3">
//                     <h6>{product.title}</h6>
//                     <p>Price: N{product.price}</p>
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <Button
//                       variant="outline-secondary"
//                       onClick={() => handleQuantityChange(-1)}
//                       className="px-2"
//                     >
//                       -
//                     </Button>
//                     <span className="px-3">{quantity}</span>
//                     <Button
//                       variant="outline-secondary"
//                       onClick={() => handleQuantityChange(1)}
//                       className="px-2"
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="d-flex justify-content-between">
//               <p>Total</p>
//               <p>N{total}</p>
//             </div>
//             <Button
//           className="mt-4"
//           variant="success"
//           onClick={handlePayment}
//           // disabled={!sellerBankDetails || !user.email || !billingDetails.streetAddress}
//         >
//           Proceed to Payment
//         </Button>

//           </Card>

//           {/* Seller Bank Details */}
//           {sellerBankDetails ? (
//             <Card className="p-4 mt-4">
//               <h5>Seller's Bank Details</h5>
//               <p>Bank Name: {sellerBankDetails.bankName}</p>
//               <p>Account Name: {sellerBankDetails.accountName}</p>
//               <p>Account Number: {sellerBankDetails.accountNumber}</p>
//             </Card>
//           ) : error ? (
//             <Alert variant="danger" className="mt-4">{error}</Alert>
//           ) : (
//             <p className="text-muted mt-4">Fetching seller's bank details...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const Checkout = () => {
  const { state } = useLocation();
  const { product, sellerId } = state || {};

  const [quantity, setQuantity] = useState(1);
  const [billingDetails, setBillingDetails] = useState({
    streetAddress: "",
    apartment: "",
    town: "",
    phoneNumber: "",
  });
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [sellerBankDetails, setSellerBankDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(
            // "http://localhost:5000/api/userProfile/profile",
            "https://dashmeafrica-backend.vercel.app/api/userProfile/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser({
            fullName: data.fullName,
            username: data.username,
            email: data.email,
          });
        } catch (error) {
          console.error("Error fetching user data:", error.response?.data.message || error.message);
        }
      }
    };

    const fetchSellerBankDetails = async () => {
      try {
        const { data } = await axios.get(
          // `http://localhost:5000/api/payment/seller/${sellerId}/bank-details`
          `https://dashmeafrica-backend.vercel.app/api/payment/seller/${sellerId}/bank-details`
        );
        setSellerBankDetails(data);
      } catch (error) {
        setError("Failed to fetch seller's bank details. Please try again.");
        console.error("Error fetching seller's bank details:", error);
      }
    };

    fetchUser();
    if (sellerId) fetchSellerBankDetails();
  }, [sellerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const total = product?.price * quantity;

  const handlePayment = async () => {
    if (!sellerBankDetails) {
      setError('Seller bank details are required for payment.');
      return;
    }

    try {
      // Initiating subaccount creation for the seller
      // const subaccountResponse = await axios.post('http://localhost:5000/api/payment/subaccount', {
      const subaccountResponse = await axios.post('https://dashmeafrica-backend.vercel.app/api/payment/subaccount', {
        businessName: sellerBankDetails.accountName,
        bankName: sellerBankDetails.bankName, // Ensure you have this mapped correctly
        accountNumber: sellerBankDetails.accountNumber,
        percentageCharge: 30, // Adjust percentage as needed
      });

      const subaccountCode = subaccountResponse.data.data.subaccount_code;

      // Initializing the transaction
      // const transactionResponse = await axios.post('http://localhost:5000/api/payment/initialize-transaction', {
      const transactionResponse = await axios.post('https://dashmeafrica-backend.vercel.app/api/payment/initialize-transaction', {
        email: user.email,
        amount: total * 100, // Paystack expects amount in kobo
        subaccount: subaccountCode,
        transactionCharge: 10000, // Optional: Flat fee for main account
        bearer: 'subaccount', // Optional: Who bears the charge
      });

      // Redirect to Paystack payment page
      window.location.href = transactionResponse.data.data.authorization_url;
    } catch (error) {
      console.error('Error during payment:', error.response?.data.message || error.message);
      setError('Payment initialization failed. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Billing Details */}
        <div className="col-md-6">
          <h3 className="mb-4 text-success">Billing Details</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control value={user.fullName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control value={user.username} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control value={user.email} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="streetAddress"
                placeholder="Enter your street address"
                value={billingDetails.streetAddress}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apartment, Floor, etc. (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="apartment"
                placeholder="Enter apartment details"
                value={billingDetails.apartment}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Town/City</Form.Label>
              <Form.Control
                type="text"
                name="town"
                placeholder="Enter your town or city"
                value={billingDetails.town}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={billingDetails.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </div>

        {/* Product Summary */}
        <div className="col-md-6">
          <Card className="p-4">
            <h5>Order Summary</h5>
            {product && (
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
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
            <div className="d-flex justify-content-between">
              <p>Total</p>
              <p>N{total}</p>
            </div>
            <Button
              variant="success"
              className="w-100"
              onClick={handlePayment}
            >
              Proceed to Payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
