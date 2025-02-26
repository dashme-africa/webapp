import React from "react";
import { Link } from "react-router-dom";
import { useAdminFetch } from "../api.service";
import { toast } from "sonner";
import { Transaction } from "../types";
import { Button, Table } from "react-bootstrap";

export default function AdminTransactions() {
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const [currTrnx, setCurrTrnx] = React.useState<Transaction | null>(null);
	const modalRef = React.useRef<HTMLDialogElement>(null);

	React.useEffect(() => {
		fetchTransactions();
	}, []);

	async function fetchTransactions() {
		const res = await useAdminFetch<Transaction[]>("/admin/all-transactions");
		// console.log(res);

		if (!res.ok) return toast.error(res.message);
		// toast.success(res.message);
		setTransactions(res.data);
	}

	function openModal() {
		modalRef?.current?.showModal();
	}

	function viewTranx(id: string) {
		setCurrTrnx(transactions.find((trx) => trx.id == id) || null);
		openModal();
	}

	return (
		<>
			<dialog ref={modalRef} className="modal ">
				<div className="modal-box">
					<div className="space-y-4">
						<div className="bg-gray-100 p-4 rounded-lg">
							<h3 className="font-semibold mb-3 text-2xl">Transaction Info</h3>
							<p>
								Status:<strong> {currTrnx?.status}</strong>
							</p>
							<p>
								Amount:
								<strong>
									{" "}
									{currTrnx?.amount} {currTrnx?.currency}
								</strong>
							</p>
							<p>
								Reference:<strong> {currTrnx?.reference}</strong>
							</p>
							<p>
								Payment Method:<strong> {currTrnx?.paymentMethod}</strong>
							</p>
							<p>
								Paid At:{" "}
								<strong>{new Date(currTrnx?.paidAt!).toLocaleString()}</strong>
							</p>
						</div>

						{currTrnx?.order && (
							<div className="bg-gray-100 p-4 rounded-lg">
								<h3 className="font-semibold mb-3 text-2xl">Order Details</h3>
								<p>
									Order ID:<strong> {currTrnx?.order.id}</strong>
								</p>
								<p>
									Product Amount:
									<strong> {currTrnx?.order.productAmount}</strong>
								</p>
								<p>
									Quantity:<strong> {currTrnx?.order.quantity}</strong>
								</p>
								<p>
									Transaction Charge:
									<strong> {currTrnx?.order.transactionCharge}</strong>
								</p>
							</div>
						)}

						{currTrnx?.user && (
							<div className="bg-gray-100 p-4 rounded-lg">
								<h3 className="font-semibold mb-3 text-2xl">Buyer Details</h3>
								<p>
									Name:<strong> {currTrnx?.user.fullName}</strong>
								</p>
								<p>
									Email:<strong> {currTrnx?.user.email}</strong>
								</p>
								<p>
									Phone:<strong> {currTrnx?.user.phoneNumber || "N/A"}</strong>
								</p>
								<p>
									Address:
									<strong>
										{currTrnx?.user.city}, {currTrnx?.user.state},{" "}
										{currTrnx?.user.country}
										{currTrnx?.user.street},{" "}
									</strong>
								</p>
							</div>
						)}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop bg-neutral-700/50">
					<button>close</button>
				</form>
			</dialog>
			<div className="container my-5">
				<Link to="/adminDashboard">
					<Button className="btn-success">Back</Button>
				</Link>
				<div className="d-flex justify-content-between align-items-center mb-3">
					{/* <h1>Admin Transactions</h1> */}
				</div>
				{transactions.length === 0 ? (
					<p>No transactions available.</p>
				) : (
					<div className="p-3">
						<h4 className="text-success mb-3">View Transactions</h4>
						<Table striped hover responsive>
							<thead className="table-success text-center">
								<tr>
									<th>No.</th>
									<th>Date</th>
									<th>Done by</th>
									<th>Amount</th>
									<th>Method</th>
									<th>Status</th>
									<th>Reference</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{transactions.map((trnx, index) => (
									<tr
										key={trnx.id}
										className="cursor-pointer"
										onClick={() => viewTranx(trnx.id)}
									>
										<td>{index + 1}</td>
										<td>{new Date(trnx.paidAt).toLocaleString()}</td>
										<td>{trnx.user.username}</td>
										<td>₦{(trnx.amount / 100).toFixed(2)}</td>
										<td>{trnx.paymentMethod}</td>
										<td
											className={
												trnx.status === "success"
													? "text-success"
													: "text-danger"
											}
										>
											{trnx.status}
										</td>
										<td>{trnx.reference}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
			</div>
		</>
	);
}
