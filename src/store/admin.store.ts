import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";
import { createJSONStorage, persist } from "zustand/middleware";
import { Admin, AdminNotification } from "../types";
import { useAdminFetch } from "../api.service";

interface AdminStore {
	authed: boolean;
	admin: Admin | null;
	token: string;
	notifications: AdminNotification[];
	updateNotification(notifications: AdminNotification[]): void;
	markNotificationAsRead(id: string): void;
	markAllNotificationsAsRead(): Promise<void>;
	updateAdmin(admin: Admin): void;
	authenticate(token: string): void;
	logout(): void;
}

const useAdminStore = create<AdminStore>()(
	persist(
		computed((set, get) =>
			compute<AdminStore>({
				token: "",
				admin: null,
				notifications: [],
				markNotificationAsRead(id) {
					const notifications = get().notifications?.map((notify) => {
						if (notify.id == id) notify.read = true;
						return notify;
					});
					set((st) => ({ ...st, notifications }));
				},
				updateNotification(notifications) {
					set((st) => ({ ...st, notifications }));
				},
				async markAllNotificationsAsRead() {
					const notifications = get().notifications?.map((not) => ({
						...not,
						read: true,
					}));
					await useAdminFetch(
						`/notifyAdmin/notifications/mark-all-read`,
						"PATCH",
						//@ts-ignore
						{}
					);
					set((st) => ({ ...st, notifications }));
				},
				authenticate(token) {
					set((st) => ({ ...st, token }));
				},
				logout() {
					set({ token: "" });
				},
				updateAdmin(admin) {
					set((st) => ({ ...st, admin }));
				},
				get authed() {
					return !!this.token;
				},
			})
		),
		{ name: "@4m|n", storage: createJSONStorage(() => sessionStorage) }
	)
);

export default useAdminStore;
