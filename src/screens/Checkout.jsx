import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const Checkout = () => {
  const { state } = useLocation();
  const { product, seller } = state || {};
  // const product = state?.product; // Get product details from navigation state

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

  const [sellerAccountNumber, setSellerAccountNumber] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(
            "https://dashmeafrica-backend.vercel.app/api/userProfile/profile",
            // "http://localhost:5000/api/userProfile/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser({
            fullName: data.fullName, // Assumes "fullName" exists in the response
            username: data.username, // Assumes "username" exists in the response
            email: data.email, // Assumes "email" exists in the response
          });
        } catch (error) {
          console.error("Error fetching user data:", error.response?.data.message || error.message);
        }
      }
    };

    const fetchSellerAccount = async () => {
      if (seller) {
        try {
          const { data } = await axios.get(
            // `http://localhost:5000/api/userProfile/seller/${seller}/account`,
            `https://dashmeafrica-backend.vercel.app/api/userProfile/seller/${seller}/account`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(data)
          setSellerAccountNumber(data.sellerAcctNumber);
        } catch (error) {
          console.error("Error fetching seller account:", error.response?.data.message || error.message);
        }
      }
    };

    fetchUser();
    fetchSellerAccount();
  }, [seller]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const total = product?.price * quantity;

  const placeOrderHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to place an order!");
      return;
    }

    if (!sellerAccountNumber) {
      alert("Unable to retrieve seller's account details. Please try again.");
      return;
    }

    const paymentData = {
      amount: total,
      email: user.email,
      phoneNumber: billingDetails.phoneNumber,
      paymentReference: `${Date.now()}`,
      // paymentReference: `REF-${Date.now()}`, // Generate unique reference
      sellerAccountNumber,
    };

    try {
      const response = await axios.post(
        // "https://dashmeafrica-backend.vercel.app/api/payment/initiate-payment",
        "http://localhost:5000/api/payment/initiate-payment",
        paymentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Use both transactionReference and paymentReference
        const { checkoutUrl } = response.data.responseBody;

        // Redirect to monnify checkout
        window.location.href = checkoutUrl;
        console.log("weldone")
      } else {
        alert(response.data.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error during payment initiation:", error.response?.data || error.message);
      alert("An error occurred while initiating payment. Please try again.");
    }
  };



  return (
    <div className="container my-5 d-flex justify-content-between">
      {/* Billing Details */}
      <div className="w-50">
        <h3 className="mb-4 text-success">Billing Details</h3>
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
      <div className="w-40">
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
                  <p>Price: ${product.price}</p>
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
          <hr />
          <div className="d-flex justify-content-between">
            <p>Subtotal:</p>
            <p>${total}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>Total:</h6>
            <h6>${total}</h6>
          </div>
          <Button
            variant="success"
            className="w-100 mt-3"
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
