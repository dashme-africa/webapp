import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./features/items/itemsSlice";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

import Formhead from "./components/Formhead";
import Hero from "./components/Hero";
import UploadPage from "./components/UploadPage";
import HomeScreen from "./screens/HomeScreen";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
// import AdminRegister from './components/AdminRegister';
import ForgotPwd from "./components/ForgotPwd";
import AdminDashboard from "./components/AdminDashboard";
import EditProduct from "./components/EditProduct";
import ProductDetails from "./screens/ProductDetails";
import Checkout from "./screens/Checkout";
import GoShiip from "./components/GoShiip";
import MyProducts from "./components/MyProducts";
import TransactionDetails from "./components/TransactionDetails";
import TrackingPage from "./components/TrackingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import PaymentHistory from "./components/PaymentHistory";
import NotificationPage from "./components/NotificationPage";
import AdminNotification from "./components/AdminNotification";
import useNotifications from "./hooks/useNotifications";
import ResetPassword from "./components/ResetPassword";
import AccountSummary from "./components/AccountSummary";
import "./index.css";
import { toast, Toaster } from "sonner";
import useAuthStore from "./store/auth.store";

const App = () => {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState("");

	const {
		notifications,
		unreadCount,
		markNotificationAsRead,
		markAllNotificationsAsRead,
	} = useNotifications(true);

	useEffect(() => {
		const sampleItems = ["Item 1", "Item 2", "Item 3"];
		dispatch(setItems(sampleItems));
	}, [dispatch]);

	return (
		<main>
			<Toaster
				position="top-right"
				toastOptions={{
					classNames: {
						error: "bg-red-700 text-white",
						success: "bg-green-700 text-white",
						warning: "bg-yellow-700 text-white",
						info: "bg-blue-700 text-white",
					},
				}}
			/>
			<Router>
				{/* <ErrorBoundary> */}
				<Routes>
					<Route path="/adminLogin" element={<AdminLogin />} />
					{/* <Route path="/adminRegister" element={<AdminRegister />} /> */}
					<Route path="/admin/products/edit/:id" element={<EditProduct />} />

					<Route path="/adminDashboard" element={<AdminDashboard />} />

					<Route path="/admin/notifications" element={<AdminNotification />} />

					<Route
						path="/"
						element={
							<Layout>
								<Hero setSelectedCategory={setSelectedCategory} />
								<HomeScreen selectedCategory={selectedCategory} />
							</Layout>
						}
					/>

					<Route
						path="/upload"
						element={
							<Layout authenticate>
								<UploadPage />
							</Layout>
						}
					/>
					<Route
						path="/profile"
						element={
							<Layout authenticate>
								<Profile />
							</Layout>
						}
					/>
					<Route
						path="/register"
						element={
							<>
								<Formhead />
								<Register />
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<Formhead />
								<Login />
							</>
						}
					/>
					<Route
						path="/product/:id"
						element={
							<Layout>
								<ProductDetails />
							</Layout>
						}
					/>
					<Route
						path="/forgot-password"
						element={
							<>
								<Formhead />
								<ForgotPwd />
							</>
						}
					/>
					<Route
						path="/checkout"
						element={
							<Layout>
								<Checkout />
							</Layout>
						}
					/>
					<Route
						path="/goshiip"
						element={
							<Layout>
								<GoShiip />
							</Layout>
						}
					/>
					<Route
						path="/my-products"
						element={
							<Layout authenticate>
								<MyProducts />
							</Layout>
						}
					/>
					<Route
						path="/transaction-details"
						element={
							<Layout authenticate>
								<TransactionDetails />
							</Layout>
						}
					/>
					<Route
						path="/tracking"
						element={
							<Layout authenticate>
								<TrackingPage />
							</Layout>
						}
					/>
					<Route
						path="/confirmationPage"
						element={
							<Layout>
								<ConfirmationPage />
							</Layout>
						}
					/>
					<Route
						path="/payment-history"
						element={
							<Layout authenticate>
								<PaymentHistory />
							</Layout>
						}
					/>
					<Route
						path="/notifications"
						element={
							<Layout authenticate>
								<NotificationPage />
							</Layout>
						}
					/>
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route
						path="/account-summary"
						element={
							<Layout authenticate>
								<AccountSummary />
							</Layout>
						}
					/>
				</Routes>
				{/* </ErrorBoundary> */}
			</Router>
		</main>
	);
};

export default App;

function OnlyAuthenticated({ children }) {
	const isAuthenticated = useAuthStore((st) => st.authed);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) toast.warning("Please login first");
	}, []);

	if (!isAuthenticated) navigate("/login");

	return children;
}
