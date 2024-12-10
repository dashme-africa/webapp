import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Table } from "react-bootstrap";

const GoShiip = () => {
  const [formData, setFormData] = useState({
    type: "intrastate",
    toAddress: { name: "", email: "", address: "", phone: "" },
    fromAddress: { name: "", email: "", address: "", phone: "" },
    parcels: { width: "", length: "", height: "", weight: "" },
    items: [
      {
        name: "",
        description: "",
        weight: "",
        category: "",
        amount: "",
        quantity: "",
      },
    ],
  });

  const [carrierName, setCarrierName] = useState("fedex"); // Default carrier
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e, section, field, index = null) => {
    if (index !== null) {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = e.target.value;
      setFormData({ ...formData, items: updatedItems });
    } else if (section) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `https://delivery-staging.apiideraos.com/api/v2/token/tariffs/getpricesingle/${carrierName}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_SECRET_KEY",
          },
        }
      );
      setRates(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Get Shipping Rates</h2>
      <Form>
        {/* Carrier Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Select Carrier</Form.Label>
          <Form.Control
            as="select"
            value={carrierName}
            onChange={(e) => setCarrierName(e.target.value)}
          >
            <option value="fedex">FedEx</option>
            <option value="ups">UPS</option>
            <option value="dhl">DHL</option>
          </Form.Control>
        </Form.Group>

        {/* To Address */}
        <h4>To Address</h4>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Recipient Name"
            value={formData.toAddress.name}
            onChange={(e) => handleInputChange(e, "toAddress", "name")}
          />
        </Form.Group>
        {/* Repeat for email, address, and phone */}
        {/* Similar sections for From Address, Parcels, and Items */}

        {/* Submit Button */}
        <Button variant="primary" onClick={fetchRates} disabled={loading}>
          {loading ? "Fetching Rates..." : "Get Rates"}
        </Button>
      </Form>

      {/* Display Rates */}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {rates.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Price</th>
              <th>Estimated Delivery</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, index) => (
              <tr key={index}>
                <td>{rate.carrier}</td>
                <td>{rate.price}</td>
                <td>{rate.estimatedDelivery}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default GoShiip;
