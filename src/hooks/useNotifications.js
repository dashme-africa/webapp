import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const useNotifications = (isAdmin = false) => {
	const [notifications, setNotifications] = useState([]);
	const [unreadCount, setUnreadCount] = useState(0);

	const fetchNotifications = async () => {
		const token = localStorage.getItem(isAdmin ? "adminToken" : "userToken");
		if (!token) return;

		try {
			const config = { headers: { Authorization: `Bearer ${token}` } };
			const { data } = await axios.get(
				`${apiURL}/notifyAdmin/notifications`,
				config
			);
			setNotifications(data.data);
			setUnreadCount(
				data.data.filter((notification) => !notification.read).length
			);
		} catch (err) {
			console.error("Failed to fetch notifications:", err);
		}
	};

	const markNotificationAsRead = async (id) => {
		try {
			const token = localStorage.getItem("adminToken");
			const config = { headers: { Authorization: `Bearer ${token}` } };
			await axios.patch(
				`${apiURL}/notifyAdmin/notifications/${id}/mark-read`,
				{},
				config
			);

			setNotifications((prev) =>
				prev.map((notification) =>
					notification.id === id
						? { ...notification, read: true }
						: notification
				)
			);
			setUnreadCount((prev) => Math.max(prev - 1, 0));
		} catch (err) {
			console.error("Failed to mark notification as read:", err);
		}
	};

	const markAllNotificationsAsRead = async () => {
		try {
			const token = localStorage.getItem("adminToken");
			const config = { headers: { Authorization: `Bearer ${token}` } };
			await axios.patch(
				`${apiURL}/notifyAdmin/notifications/mark-all-read`,
				{},
				config
			);
			setNotifications((prev) =>
				prev.map((notification) => ({ ...notification, read: true }))
			);
			setUnreadCount(0);
		} catch (err) {
			console.error("Failed to mark all notifications as read:", err);
		}
	};

	useEffect(() => {
		fetchNotifications();
		const interval = setInterval(fetchNotifications, 5000);
		return () => clearInterval(interval);
	}, []);

	return {
		notifications,
		unreadCount,
		fetchNotifications,
		markNotificationAsRead,
		markAllNotificationsAsRead,
	};
};

export default useNotifications;
