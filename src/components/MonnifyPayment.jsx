import React, { useState } from 'react';

const MonnifyPayment = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentReference = `ref_${Date.now()}`; // Generate unique payment reference

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    phoneNumber,
                    amount,
                    paymentReference,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success) {
                // Redirect the user to the payment page
                window.location.href = data.paymentUrl;
            } else {
                alert('Payment initiation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during payment initiation:', error);
            alert('An error occurred. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Proceed to Payment</h2>
            <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="form-control"
                        placeholder="Enter your phone number"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        placeholder="Enter the amount"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </form>
        </div>
    );
};

export default MonnifyPayment;
