import React, { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import TransactionTable from './TransactionTable';
const apiURL = import.meta.env.VITE_API_URL;

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${apiURL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response)

        const data = await response.json();

        if (response.ok) {
          setTransactions(data.data);
        } else {
          setError(data.message || 'Failed to fetch transactions.');
        }
      } catch (err) {
        setError('An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Payment History</h2>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default PaymentHistory;
