import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisbursementForm = () => {
  const [accountReference, setAccountReference] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('https://dashmeafrica-backend.vercel.app/api/disburse', {
        accountReference,
        amount,
      });

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Disbursement Form</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="accountReference">Account Reference</label>
          <input
            type="text"
            className="form-control"
            id="accountReference"
            value={accountReference}
            onChange={(e) => setAccountReference(e.target.value)}
            placeholder="Enter account reference"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="amount">Amount (NGN)</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to disburse"
            required
          />
        </div>

        {message && (
          <div className="alert alert-success mt-3">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Initiate Disbursement'}
        </button>
      </form>
    </div>
  );
};

export default DisbursementForm;
