import React from 'react';
import { Table } from 'react-bootstrap';

const TransactionTable = ({ transactions }) => {
    return (
        <Table striped bordered hover responsive>
            <thead className="table-primary">
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Reference</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={transaction.reference}>
                        <td>{index + 1}</td>
                        <td>{new Date(transaction.paidAt).toLocaleString()}</td>
                        <td>₦{(transaction.amount / 100).toFixed(2)}</td>
                        <td>{transaction.paymentMethod}</td>
                        <td className={transaction.status === 'success' ? 'text-success' : 'text-danger'}>
                            {transaction.status}
                        </td>
                        <td>{transaction.reference}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TransactionTable;
