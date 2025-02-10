import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";
import { createJSONStorage, persist } from "zustand/middleware";
import { Admin, Product } from "../types";

interface ProductStore {
	products: Product[];
	updateStatus(id: string, status: string): void;
	update(product: Product): void;
	remove(id: string): void;
	updateAll(products: Product[]): void;
}

const useProductStore = create<ProductStore>()(
	computed((set, get) =>
		compute<ProductStore>({
			products: [],
			updateStatus(id, status) {
				const products = get().products!;
				set((st) => ({
					...st,
					products: products.map((prod) => {
						if (prod.id === id) {
							prod.status = status;
						}
						return prod;
					}),
				}));
			},
			update(product) {
				const products = get().products!;
				set((st) => ({
					...st,
					products: products.map((prod) => {
						if (prod.id === product.id) {
							return product;
						}
						return prod;
					}),
				}));
			},
			remove(id) {
				const products = get().products!;
				set((st) => ({
					...st,
					products: products.filter((prod) => prod.id !== id),
				}));
			},
			updateAll(products) {
				set((st) => ({ ...st, products }));
			},
		})
	)
);

export default useProductStore;
