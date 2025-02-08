import React, { useEffect, useState } from "react";
import { ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import useNotificationStore from "../store/notification.store";
import { useFetch } from "../api.service";
import { toast } from "sonner";
import useUserStore from "./../store/user.store";

const NotificationPage = () => {
	// const [notifications, setNotifications] = useState([]);
	const user = useUserStore((st) => st.user);
	const notifications = useNotificationStore((st) => st.notifications);

	const setNotifications = useNotificationStore((st) => st.update);
	const _markAsRead = useNotificationStore((st) => st.markAsRead);
	const markAllAsRead = useNotificationStore((st) => st.markAllRead);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchNotifications() {
			const res = await useFetch("/notify/notifications");
			setLoading(false);

			if (!res.ok) return toast.error(res.message);

			setNotifications(res.data);
			return;
		}

		fetchNotifications();
	}, []);

	const markAsRead = async (id) => {
		const res = await useFetch(
			`/notify/notifications/${id}/mark-read`,
			"PATCH",
			{}
		);
		if (!res.ok) return toast.error(res.message);
		_markAsRead(id);
	};

	// const markAllAsRead = async () => {
	// 	const res = await useFetch(`/notify/notifications/mark-read`, "PATCH", {});
	// 	if (!res.ok) return toast.error(res.message);
	// 	_markAllAsRead();
	// };

	if (loading) return <Spinner animation="border" />;

	if (error) return <Alert variant="danger">{error}</Alert>;

	return (
		<div className="container mt-4">
			<h2>Notifications</h2>
			<Button onClick={markAllAsRead} className="mb-3" variant="success">
				Mark All as Read
			</Button>
			<ListGroup>
				{notifications && notifications.length > 0 ? (
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
