import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
	authed: boolean;
	token: string;
	autheenticate(token: string): void;
	logout(): void;
}

const useAuthStore = create<AuthStore>()(
	persist(
		computed((set, get) =>
			compute<AuthStore>({
				token: "",
				autheenticate(token) {
					set((st) => ({ ...st, token }));
				},
				logout() {
					set({ token: "" });
				},
				get authed() {
					return !!this.token;
				},
			})
		),
		{ name: "@uthentik", storage: createJSONStorage(() => sessionStorage) }
	)
);

export default useAuthStore;
