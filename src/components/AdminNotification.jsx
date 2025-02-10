import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAdminStore from "../store/admin.store";
import { useAdminFetch } from "../api.service";
import { toast } from "sonner";

const AdminNotification = () => {
	const notifications = useAdminStore((st) => st.notifications);
	const markAsRead = useAdminStore((st) => st.markNotificationAsRead);
	const markAllNotificationsAsRead = useAdminStore(
		(st) => st.markAllNotificationsAsRead
	);
	// console.log(notifications);

	async function markNotificationAsRead(id) {
		const res = await useAdminFetch(
			`/notifyAdmin/notifications/${id}/mark-read`,
			"PATCH",
			{}
		);
		// console.log(res);

		if (!res.ok) return toast.error(res.message);
		toast.success(res.message);
		markAsRead(id);
	}
	return (
		<div className="container my-5">
			<Link to="/adminDashboard">
				<Button className="btn-success">Back</Button>
			</Link>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Admin Notifications</h1>

				<Button onClick={markAllNotificationsAsRead}>Mark all as read</Button>
			</div>
			{notifications.length === 0 ? (
				<p>No notifications available.</p>
			) : (
				<ul className="list-group">
					{notifications.map((notification) => (
						<li
							key={notification.id}
							className={`list-group-item ${
								notification.read ? "" : "list-group-item-warning"
							}`}
							onClick={() => markNotificationAsRead(notification.id)}
						>
							{notification.message}
							{!notification.read && (
								<span className="badge bg-secondary ms-2">Unread</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AdminNotification;
