import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [status, setStatus] = useState('Processing...');
  const [isSuccess, setIsSuccess] = useState(null); // Tracks success or failure
  const [sellerAccount, setSellerAccount] = useState(null); // Stores seller account details
  const [otp, setOtp] = useState('');
  const [reference, setReference] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSellerAccount = async () => {
    const seller = localStorage.getItem('sellerId');
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
        return data;
      } catch (error) {
        console.error(
          'Error fetching seller account:',
          error.response?.data.message || error.message
        );
      }
    }
    return null;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentReference = queryParams.get('paymentReference');

    const verifyPayment = async () => {
      if (paymentReference) {
        const sellerData = await fetchSellerAccount();
        if (sellerData) {
          try {
            const { data } = await axios.post(
              'https://dashmeafrica-backend.vercel.app/api/payment/verify-payment',
              {
                paymentReference,
                sellerAccount: {
                  accountNumber: sellerData.sellerAcctNumber,
                  accountName: sellerData.sellerAcctName,
                  accountCode: sellerData.sellerAcctCode,
                },
              }
            );

            if (data.success) {
              setReference(paymentReference); // Set reference for OTP authorization
              setIsSuccess(true);
            } else {
              setStatus('Payment failed or incomplete. Please try again.');
              setIsSuccess(false);
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setStatus('An error occurred while verifying the payment. Please try again.');
            setIsSuccess(false);
          }
        } else {
          setStatus('Unable to fetch seller account details.');
          setIsSuccess(false);
        }
      } else {
        setStatus('Invalid payment reference.');
        setIsSuccess(false);
      }
    };

    verifyPayment();
  }, []);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://dashmeafrica-backend.vercel.app/api/payment/authorize-transfer', {
        reference,
        otp,
      });
      setMessage(`Success: ${response.data.responseMessage}`);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.responseMessage : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {isSuccess === null ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Processing...</span>
          </div>
          <p className="mt-3">{status}</p>
        </div>
      ) : isSuccess ? (
        <div>
          <h2>Authorize Transfer</h2>
          <form onSubmit={handleOtpSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">OTP</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Authorizing...' : 'Authorize Transfer'}
            </button>
          </form>
          {message && (
            <div className={`mt-3 alert ${message.startsWith('Success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="mb-4">Payment Status</h2>
          <div className="alert alert-danger">
            <i className="bi bi-x-circle-fill"></i>
            <h4 className="alert-heading">Failed!</h4>
            <p>{status}</p>
            <a href="/checkout" className="btn btn-danger mt-3">
              Retry Payment
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;


