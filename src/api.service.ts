import useAdminStore from "./store/admin.store";
import useAuthStore from "./store/auth.store";
import { APIResponse } from "./types";

const API_URL = (import.meta as any).env.VITE_API_URL;

export async function useFetch<T>(
	url: string,
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
	body: BodyInit | null = null
): Promise<APIResponse<T>> {
	const TOKEN = useAuthStore.getState().token;

	const isFormData = body && body instanceof FormData;

	body = isFormData ? body : body ? JSON.stringify(body) : body;

	isFormData ? body : { body: JSON.stringify(body) };

	try {
		return await (
			await fetch(`${API_URL}${url}`, {
				headers: {
					...(isFormData ? {} : { "Content-Type": "application/json" }),
					Authorization: `Bearer ${TOKEN}`,
				},
				method,
				body,
			})
		).json();
	} catch (error: any) {
		return { ok: false, message: error.message, error };
	}
}
export async function useAdminFetch<T>(
	url: string,
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
	body: BodyInit | null = null
): Promise<APIResponse<T>> {
	const TOKEN = useAdminStore.getState().token;

	const isFormData = body && body instanceof FormData;

	body = isFormData ? body : body ? JSON.stringify(body) : body;

	isFormData ? body : { body: JSON.stringify(body) };

	try {
		return await (
			await fetch(`${API_URL}${url}`, {
				headers: {
					...(isFormData ? {} : { "Content-Type": "application/json" }),
					Authorization: `Bearer ${TOKEN}`,
				},
				method,
				body,
			})
		).json();
	} catch (error: any) {
		return { ok: false, message: error.message, error };
	}
}
export async function useExternalFetch<T>(
	url: string,
	method: "GET" | "POST" | "PATCH" | "PUT" = "GET",
	body: BodyInit | null = null
): Promise<APIResponse<T>> {
	const TOKEN = useAuthStore.getState().token;

	const isFormData = body instanceof FormData;

	try {
		return await (
			await fetch(url, {
				headers: {
					...(isFormData ? {} : { "Content-Type": "application/json" }),
					authorization: `Bearer ${TOKEN}`,
				},
				method,
				body,
			})
		).json();
	} catch (error: any) {
		return { ok: false, message: error.message, error };
	}
}
