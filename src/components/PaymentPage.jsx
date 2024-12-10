import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed and imported
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
    const [status, setStatus] = useState('Processing...');
    const [isSuccess, setIsSuccess] = useState(null); // Tracks success or failure
    const [sellerAccount, setSellerAccount] = useState(null); // Stores seller account details

    // Fetch seller account details
    const fetchSellerAccount = async () => {
        const seller = localStorage.getItem('sellerId'); // Get sellerId from localStorage
        if (seller) {
            try {
                const { data } = await axios.get(
                    `https://dashmeafrica-backend.vercel.app/api/userProfile/seller/${seller}/account`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setSellerAccount({
                    accountNumber: data.sellerAcctNumber,
                    accountName: data.sellerAcctName,
                    accountCode: data.sellerAcctCode,
                });
                return data; // Return the seller's account details for further use
            } catch (error) {
                console.error(
                    'Error fetching seller account:',
                    error.response?.data.message || error.message
                );
            }
        }
        return null; // Return null if no seller data is fetched
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const paymentReference = queryParams.get('paymentReference');

        const verifyPayment = async () => {
            if (paymentReference) {
                const sellerData = await fetchSellerAccount(); 
        console.log(paymentReference, sellerData)

                if (sellerData) {
                    // Call backend to verify payment
                    // fetch('http://localhost:5000/api/payment/verify-payment', {
                    fetch('https://dashmeafrica-backend.vercel.app/api/payment/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            paymentReference,
                            sellerAccount: {
                                accountNumber: sellerData.sellerAcctNumber,
                                accountName: sellerData.sellerAcctName,
                                accountCode: sellerData.sellerAcctCode,
                            },
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.success) {
                                setStatus('Payment successful! Thank you for your purchase.');
                                setIsSuccess(true);
                            } else {
                                setStatus('Payment failed or incomplete. Please try again.');
                                setIsSuccess(false);
                            }
                        })
                        .catch((error) => {
                            console.error('Error verifying payment:', error);
                            setStatus('An error occurred while verifying the payment. Please try again.');
                            setIsSuccess(false);
                        });
                } else {
                    setStatus('Unable to fetch seller account details.');
                    setIsSuccess(false);
                }
            } else {
                setStatus('Invalid payment reference.');
                setIsSuccess(false);
            }
        };
        verifyPayment(); // Call the payment verification function
    }, []);

    return (
        <div className="container text-center mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="mb-4">Payment Status</h2>
                {isSuccess === null ? (
                    <div>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Processing...</span>
                        </div>
                        <p className="mt-3">{status}</p>
                    </div>
                ) : isSuccess ? (
                    <div className="alert alert-success">
                        <i className="bi bi-check-circle-fill"></i>
                        <h4 className="alert-heading">Success!</h4>
                        <p>{status}</p>
                        <a href="/" className="btn btn-success mt-3">
                            Go to Homepage
                        </a>
                    </div>
                ) : (
                    <div className="alert alert-danger">
                        <i className="bi bi-x-circle-fill"></i>
                        <h4 className="alert-heading">Failed!</h4>
                        <p>{status}</p>
                        <a href="/retry" className="btn btn-danger mt-3">
                            Retry Payment
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
