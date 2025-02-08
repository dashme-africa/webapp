import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import useAuthStore from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 *
 * @param {{children: React.ReactNode;authenticate: boolean;}} param0
 * @returns
 */
export default function Layout({ children, authenticate }) {
	const isAuthenticated = useAuthStore((st) => st.authed);

	const navigate = useNavigate();

	React.useEffect(() => {
		if (authenticate && !isAuthenticated) {
			toast.warning("Please login first");
			navigate(`/login?redirect=${location.pathname}`);
		}
	}, []);

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
