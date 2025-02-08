import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";
import { createJSONStorage, persist } from "zustand/middleware";
import { Notification } from "../types";
import { useFetch } from "../api.service";

interface NotificationStore {
	notifications: Notification[];
	unreadCount: number;
	markAllRead(): Promise<void>;
	markAsRead(id: string): void;
	update(notifications: Notification[]): void;
}

const useNotificationStore = create<NotificationStore>()(
	computed((set, get) =>
		compute<NotificationStore>({
			notifications: [],
			update(notifications) {
				set((st) => ({ ...st, notifications }));
			},
			async markAllRead() {
				const notifications = get().notifications?.map((not) => ({
					...not,
					read: true,
				}));
				//@ts-ignore
				await useFetch(`/notify/notifications/mark-read`, "PATCH", {});
				set((st) => ({ ...st, notifications }));
			},
			markAsRead(id) {
				const notifications = get().notifications?.map((notify) => {
					if (notify.id == id) notify.read = true;
					return notify;
				});
				set((st) => ({ ...st, notifications }));
			},

			get unreadCount() {
				const notifications = <Notification[]>this.notifications;

				return notifications?.filter((not) => !not.read).length || 0;
			},
		})
	)
);

export default useNotificationStore;
