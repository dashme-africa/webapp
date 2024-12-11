import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthorizeTransfer = () => {
  const [otp, setOtp] = useState('');
  const [reference, setReference] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/payment/authorize-transfer', {
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
      <h2>Authorize Transfer</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="reference" className="form-label">Transaction Reference</label>
          <input
            type="text"
            id="reference"
            className="form-control"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
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
      {message && <div className={`mt-3 alert ${message.startsWith('Success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
    </div>
  );
};

export default AuthorizeTransfer;
