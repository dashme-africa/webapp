import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    type: 'intrastate',
    toAddress: {
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    fromAddress: {
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    parcels: {
      width: '',
      length: '',
      height: '',
      weight: ''
    },
    items: [
      {
        name: '',
        description: '',
        weight: '',
        category: '',
        amount: '',
        quantity: ''
      }
    ]
  });

  const [shipmentRates, setShipmentRates] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/get-shipment-rates', formData);
      setShipmentRates(response.data);
    } catch (error) {
      setError('Failed to fetch shipment rates. Please try again.');
    }
  };

  return (
    <Container>
      <h1 className="my-4">Shipment Rates Calculator</h1>

      <Form onSubmit={handleSubmit}>
        {/* Shipment Type */}
        <Form.Group controlId="shipmentType">
          <Form.Label>Shipment Type</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="intrastate">Intrastate</option>
            <option value="interstate">Interstate</option>
            <option value="international_us">International (US)</option>
            <option value="international">International</option>
            <option value="frozen-international">Frozen International</option>
          </Form.Control>
        </Form.Group>

        {/* To Address */}
        <h5>To Address</h5>
        <Row>
          <Col>
            <Form.Group controlId="toName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="toAddress.name"
                value={formData.toAddress.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="toPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="toAddress.phone"
                value={formData.toAddress.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="toEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="toAddress.email"
            value={formData.toAddress.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="toAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="toAddress.address"
            value={formData.toAddress.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* From Address */}
        <h5>From Address</h5>
        <Row>
          <Col>
            <Form.Group controlId="fromName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fromAddress.name"
                value={formData.fromAddress.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fromPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="fromAddress.phone"
                value={formData.fromAddress.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="fromEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="fromAddress.email"
            value={formData.fromAddress.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="fromAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="fromAddress.address"
            value={formData.fromAddress.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Parcel Dimensions */}
        <h5>Parcel Details</h5>
        <Row>
          <Col>
            <Form.Group controlId="parcelWidth">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="number"
                name="parcels.width"
                value={formData.parcels.width}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="parcelLength">
              <Form.Label>Length</Form.Label>
              <Form.Control
                type="number"
                name="parcels.length"
                value={formData.parcels.length}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="parcelHeight">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                name="parcels.height"
                value={formData.parcels.height}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="parcelWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="parcels.weight"
                value={formData.parcels.weight}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-4">
          Get Shipment Rates
        </Button>
      </Form>

      {/* Error or Shipment Rates Display */}
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      {shipmentRates && (
        <div className="mt-4">
          <h3>Shipment Rates</h3>
          <pre>{JSON.stringify(shipmentRates, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default App;
