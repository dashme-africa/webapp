import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Transaction, User } from "../types";
import { useAdminFetch } from "../api.service";
import { toast } from "sonner";
import {
	Card,
	ListGroup,
	ListGroupItem,
	Badge,
	Row,
	Col,
	Image,
} from "react-bootstrap";

export default function AdminUserPage() {
	const [users, setUsers] = React.useState<User[]>([]);
	const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
	const modalRef = React.useRef<HTMLDialogElement>(null);

	React.useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		const res = await useAdminFetch<User[]>("/admin/users");

		if (!res.ok) return toast.error(res.message);
		// toast.success(res.message);
		// console.log(res.data);
		setUsers(res.data);
	}

	function openModal() {
		modalRef?.current?.showModal();
	}

	function viewUser(id: string) {
		setSelectedUser(users.find((usr) => usr.id == id) || null);
		openModal();
	}

	return (
		<>
			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					{!!selectedUser && <UserCard user={selectedUser} />}
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
				{users?.length === 0 ? (
					<p>No Users available.</p>
				) : (
					<div className="p-3">
						<h4 className="text-success mb-3">View Users</h4>
						<Table striped hover responsive>
							<thead className="table-success text-center">
								<tr>
									<th>No.</th>
									<th>Profile Picture</th>
									<th>Email</th>
									<th>Full Name</th>
									<th>Phone No.</th>
									<th>address</th>
									<th>Upline</th>
									<th>No. of referrals</th>
								</tr>
							</thead>
							<tbody className="">
								{users?.map((user, index) => (
									<tr
										key={user.id}
										className="cursor-pointer"
										onClick={() => viewUser(user.id)}
									>
										<td>{index}</td>
										<td>
											<span>
												<img
													src={user.profilePicture || "/placeholder.jpg"}
													alt={user.email}
													style={{
														width: "80px",
														height: "80px",
														objectFit: "cover",
													}}
												/>
											</span>
										</td>
										<td>{user.email}</td>
										<td>{user.fullName}</td>
										<td>{user.phoneNumber}</td>
										<td>{`${user.street}, ${user.city}, ${user.state}, ${user.country}`}</td>
										<td>{user.referredBy}</td>
										<td>{user.referrals?.length}</td>
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

const UserCard = ({ user }: { user: User }) => {
	return (
		<Card className="mb-4 shadow-sm">
			<Card.Header>
				<Row className="align-items-center">
					<Col xs="auto">
						<Image
							src={user.profilePicture || "/placeholder.jpg"}
							// roundedCircle
							width={80}
							height={80}
							alt={user.fullName}
						/>
					</Col>
					<Col>
						<h4 className="mb-0">
							{user.fullName}{" "}
							{user.isVerified && <Badge bg="success">Verified</Badge>}
						</h4>
						<small className="text-muted">@{user.username}</small>
					</Col>
				</Row>
			</Card.Header>
			<Card.Body>
				<ListGroup variant="flush">
					<ListGroupItem>
						<strong>Email:</strong> {user.email}
					</ListGroupItem>
					{user.phoneNumber && (
						<ListGroupItem>
							<strong>Phone:</strong> {user.phoneNumber}
						</ListGroupItem>
					)}
					{user.bio && (
						<ListGroupItem>
							<strong>Bio:</strong> {user.bio}
						</ListGroupItem>
					)}
					{(user.street || user.city || user.state || user.country) && (
						<ListGroupItem>
							<strong>Address:</strong>{" "}
							{[user.street, user.city, user.state, user.country]
								.filter(Boolean)
								.join(", ")}
						</ListGroupItem>
					)}
					{(user.accountName || user.accountNumber || user.bankName) && (
						<ListGroupItem>
							<strong>Bank Details:</strong> {user.accountName || "-"}{" "}
							{user.accountNumber && `- ${user.accountNumber}`}
							{user.bankName && ` (${user.bankName})`}
						</ListGroupItem>
					)}
					<ListGroupItem>
						<strong>Member Since:</strong>{" "}
						{new Date(user.createdAt).toLocaleDateString()}
					</ListGroupItem>
					<ListGroupItem>
						<h4 className="mb-2">Referrals:</h4>
						{!!user?.referrals.length ? (
							<ListGroup>
								{user.referrals.map((usr) => (
									<ListGroup.Item>{usr.username}</ListGroup.Item>
								))}
							</ListGroup>
						) : (
							<div>No Referrals</div>
						)}
					</ListGroupItem>
				</ListGroup>
			</Card.Body>
			<Card.Footer>
				<small className="text-muted">
					Last updated: {new Date(user.updatedAt).toLocaleDateString()}
				</small>
			</Card.Footer>
		</Card>
	);
};
