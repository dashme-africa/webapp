import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner, Container, Row, Col, Table } from 'react-bootstrap';

const ReservedAccountForm = () => {
  const [formData, setFormData] = useState({
    accountReference: `ref_${Date.now()}`,
    accountName: '',
    customerEmail: '',
    customerName: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);
    setError(null);

    try {

      const response = await axios.post('https://dashmeafrica-backend.vercel.app/api/reserved-account', formData);
      setResponseMessage(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountDetails = async () => {
    if (!responseMessage) return;

    setFetchingDetails(true);
    try {
      const response = await axios.get(
        `https://dashmeafrica-backend.vercel.app/api/account/${responseMessage.accountReference}`
      );

      setAccountDetails(response.data.data);
    } catch (err) {
      console.error('Error fetching account details:', err.response?.data || err.message);
      setError('Error fetching account details.');
    } finally {
      setFetchingDetails(false);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const interval = setInterval(fetchAccountDetails, 5000); // Fetch every 5 seconds
      return () => clearInterval(interval);
    }
  }, [responseMessage]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="my-4 text-center">Create Reserved Account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                name="accountName"
                placeholder="Enter account name"
                value={formData.accountName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Customer Email</Form.Label>
              <Form.Control
                type="email"
                name="customerEmail"
                placeholder="Enter customer email"
                value={formData.customerEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
            </Button>
          </Form>

          {responseMessage && (
            <Alert variant="success" className="mt-4">
              <h5>Account Created Successfully!</h5>
              <p><strong>Account Name:</strong> {responseMessage.accountName}</p>
              <p><strong>Account Reference:</strong> {responseMessage.accountReference}</p>
              <Button
                variant="secondary"
                onClick={fetchAccountDetails}
                disabled={fetchingDetails}
                className="mt-2"
              >
                {fetchingDetails ? 'Fetching Details...' : 'View Transaction Details'}
              </Button>
            </Alert>
          )}

          {accountDetails && (
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Transaction Reference</th>
                  <th>Amount Paid</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{accountDetails.lastTransaction.transactionReference}</td>
                  <td>{accountDetails.lastTransaction.amountPaid}</td>
                  <td>{accountDetails.lastTransaction.paymentStatus}</td>
                  <td>{new Date(accountDetails.lastTransaction.updatedAt).toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>
          )}

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReservedAccountForm;
