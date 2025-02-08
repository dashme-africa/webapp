import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product, User } from "../types";

interface UserStore {
	user: User | null;
	update(user: User): void;
	updateProfile(
		profile: Omit<User, "notification" | "order" | "products">
	): void;
	removeProduct(id: string): void;
	addProduct(product: Product): void;
	updateProduct(product: Product): void;
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
			removeProduct(id) {
				const { products, ...user } = get().user!;

				set((st) => ({
					...st,
					user: {
						...user,
						products: products.filter((prod) => prod.id !== id),
					},
				}));
			},
			addProduct(product) {
				const { products, ...user } = get().user!;
				products.push(product);
				set((st) => ({
					...st,
					user: {
						...user,
						products,
					},
				}));
			},
			updateProduct(product) {
				const { products, ...user } = get().user!;

				set((st) => ({
					...st,
					user: {
						...user,
						products: products.map((prod) => {
							if (prod.id === product.id) {
								return product;
							}
							return prod;
						}),
					},
				}));
			},
		})
	)
);

export default useUserStore;
