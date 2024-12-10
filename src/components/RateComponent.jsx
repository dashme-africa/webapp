import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const RateComponent = () => {
    const [carrierName, setCarrierName] = useState('');
    const [payload, setPayload] = useState({
        type: '',
        toAddress: {
            name: '',
            email: '',
            address: '',
            phone: '',
        },
        fromAddress: {
            name: '',
            email: '',
            address: '',
            phone: '',
        },
        parcels: {
            width: 0,
            length: 0,
            height: 0,
            weight: 0,
        },
        items: [],
    });
    const [loading, setLoading] = useState(false);
    const [rate, setRate] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRate(null);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/getRate', {
                carrierName,
                payload,
            });
            setRate(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Get Shipping Rate</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="carrierName">
                    <Form.Label>Carrier Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter carrier name"
                        value={carrierName}
                        onChange={(e) => setCarrierName(e.target.value)}
                    />
                </Form.Group>
                {/* Add form fields for payload (toAddress, fromAddress, parcels, items) */}
                <Form.Group controlId="toAddressName">
                    <Form.Label>To Address - Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter recipient's name"
                        value={payload.toAddress.name}
                        onChange={(e) =>
                            setPayload({
                                ...payload,
                                toAddress: { ...payload.toAddress, name: e.target.value },
                            })
                        }
                    />
                </Form.Group>
                {/* Repeat for other fields in payload */}

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Get Rate'}
                </Button>
            </Form>

            {rate && (
                <Alert variant="success" className="mt-3">
                    <pre>{JSON.stringify(rate, null, 2)}</pre>
                </Alert>
            )}
            {error && (
                <Alert variant="danger" className="mt-3">
                    {error}
                </Alert>
            )}
        </div>
    );
};

export default RateComponent;
