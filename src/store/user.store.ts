import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types";

interface UserStore {
	user: User | null;
	update(user: User): void;
	updateProfile(
		profile: Omit<User, "notification" | "order" | "products">
	): void;
}

const useUserStore = create<UserStore>()(
	// persist(
	computed((set, get) =>
		compute<UserStore>({
			user: null,
			update(user) {
				set((st) => ({ ...st, user }));
			},
			updateProfile(profile) {
				const { products, order, notification, ...user } = get().user!;
				set((st) => ({
					...st,
					user: { products, notification, order, ...profile },
				}));
			},
		})
	)
);

export default useUserStore;
