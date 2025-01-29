import React, { useEffect, useState } from "react";
import { ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const NotificationPage = () => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const apiURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchNotifications = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {
				const { data } = await axios.get(`${apiURL}/notify/notifications`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				// Ensure the response contains notifications in the correct format
				setNotifications(data?.data || []); // Correct access to the notifications array
			} catch (error) {
				setError("Error fetching notifications");
				console.error(error.response?.data?.message || error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchNotifications();
	}, []);

	const markAsRead = async (id) => {
		try {
			const token = localStorage.getItem("token");
			await axios.patch(
				`${apiURL}/notify/notifications/${id}/mark-read`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setNotifications((prev) =>
				prev.map((notif) =>
					notif.id === id ? { ...notif, read: true } : notif
				)
			);
		} catch (error) {
			console.error(
				"Error marking notification as read:",
				error.response?.data?.message || error.message
			);
		}
	};

	const markAllAsRead = async () => {
		try {
			const token = localStorage.getItem("token");
			await axios.patch(
				`${apiURL}/notify/notifications/mark-read`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setNotifications((prev) =>
				prev.map((notif) => ({ ...notif, read: true }))
			);
		} catch (error) {
			console.error(
				"Error marking all notifications as read:",
				error.response?.data?.message || error.message
			);
		}
	};

	if (loading) return <Spinner animation="border" />;

	if (error) return <Alert variant="danger">{error}</Alert>;

	return (
		<div className="container mt-4">
			<h2>Notifications</h2>
			<Button onClick={markAllAsRead} className="mb-3" variant="success">
				Mark All as Read
			</Button>
			<ListGroup>
				{notifications.length > 0 ? (
					notifications.map((notif, key) => (
						<ListGroup.Item
							key={key} // Ensure the key is unique for each notification
							className={notif.read ? "" : "bg-light"}
						>
							<div className="d-flex justify-content-between align-items-center">
								<span>{notif.message}</span>
								<div>
									<small className="text-muted">
										{new Date(notif.createdAt).toLocaleString()}
									</small>
									{!notif.read && (
										<Button
											variant="outline-primary"
											size="sm"
											className="ms-3"
											onClick={() => markAsRead(notif.id)}
										>
											Mark as Read
										</Button>
									)}
								</div>
							</div>
						</ListGroup.Item>
					))
				) : (
					<ListGroup.Item>No notifications available.</ListGroup.Item>
				)}
			</ListGroup>
		</div>
	);
};

export default NotificationPage;
