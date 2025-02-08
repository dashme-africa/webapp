import React, { useEffect, useState } from "react";
import {
	Navbar,
	Nav,
	Container,
	Form,
	FormControl,
	Button,
	Dropdown,
	Alert,
} from "react-bootstrap";
import { FaUser, FaBell, FaSearch } from "react-icons/fa"; // FaHeart commented
import { useTranslation } from "react-i18next";
import axios from "axios";
import useAuthStore from "../store/auth.store";

const apiURL = import.meta.env.VITE_API_URL;
import useUserStore from "./../store/user.store";
import { useFetch } from "../api.service";
import { toast } from "sonner";
import useNotificationStore from "../store/notification.store";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const { t, i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState("EN");
	const [loading, setLoading] = useState(true);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const logout = useAuthStore((st) => st.logout);
	const markAllAsRead = useNotificationStore((st) => st.markAllRead);
	const setNotifications = useNotificationStore((st) => st.update);
	const unreadCount = useNotificationStore((st) => st.unreadCount);
	const markAllRead = useNotificationStore((st) => st.markAllRead);
	// const [unreadCount, setUnreadCount] = useState(0);
	const token = useAuthStore((st) => st.token);
	const setUserData = useUserStore((st) => st.update);
	const userData = useUserStore((st) => st.user);
	const navigate = useNavigate();

	const handleLanguageChange = (lang, label) => {
		i18n.changeLanguage(lang);
		setCurrentLanguage(label);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (!token) return setLoading(false);

			const res = await useFetch("/userProfile/profile");
			setLoading(false);

			if (!res.ok) return toast.error(res.message);
			// console.log(res);

			setUserData(res.data);
			setNotifications(res.data.notifications);
		};

		fetchUserData();
	}, [token]);

	const handleLogout = () => {
		logout();
		navigate("/login");

		return;
	};

	return (
		<header className="bg-white shadow-sm">
			<Navbar bg="white" expand="md" className="px-3">
				<Container
					fluid
					className="d-flex align-items-center justify-content-space-between"
				>
					<Navbar.Brand href="/" className="d-flex align-items-center me-5">
						<img
							src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png"
							alt="DashMe Logo"
						/>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Form
						className="d-flex mx-auto my-3 my-lg-0"
						style={{ maxWidth: "500px", width: "100%" }}
					>
						<div className="input-group">
							<FormControl
								type="search"
								placeholder={t("searchPlaceholder")}
								aria-label="Search"
								className="rounded-start"
								style={{
									border: "1px solid green",
									borderTopLeftRadius: "25px",
									borderBottomLeftRadius: "25px",
								}}
							/>
							<Button
								variant="outline-success"
								className="rounded-end"
								style={{
									backgroundColor: "green",
									color: "white",
									borderTopRightRadius: "25px",
									borderBottomRightRadius: "25px",
									border: "1px solid green",
								}}
							>
								<FaSearch />
							</Button>
						</div>
					</Form>

					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end flex-nowrap overflow-auto pb-2"
					>
						<Nav className="d-flex flex-row align-items-center justify-content-space-between">
							<Nav.Link
								href="/notifications"
								className="me-3"
								onClick={markAllAsRead}
							>
								<FaBell size={30} />
								{unreadCount > 0 && (
									<span className="badge bg-danger">{unreadCount}</span>
								)}
							</Nav.Link>

							{/* <Nav.Link href="/favorites" className="me-3">
                <FaHeart size={30} />
              </Nav.Link> */}

							<Nav.Link
								href="/profile"
								className="me-3 d-flex align-items-center"
							>
								{loading ? (
									<span>Loading...</span>
								) : userData && userData?.profilePicture ? (
									<img
										src={userData.profilePicture}
										alt="Profile"
										className="rounded-circle"
										style={{
											width: "50px",
											height: "50px",
											objectFit: "cover",
										}}
									/>
								) : (
									<FaUser size={30} />
								)}
								<span style={{ whiteSpace: "nowrap" }}>
									&nbsp;{userData?.username}
								</span>
							</Nav.Link>

							<Nav.Link href="/upload" className="me-4 fs-6 text-dark">
								{t("uploadText")}
							</Nav.Link>

							{userData ? (
								<Nav.Link
									onClick={handleLogout}
									className="me-3 fs-6 text-dark"
									style={{ whiteSpace: "nowrap" }}
								>
									{t("logout")}
								</Nav.Link>
							) : (
								<Nav.Link
									href="/register"
									className="me-3 fs-6 text-dark"
									style={{ whiteSpace: "nowrap" }}
								>
									{t("signUp")}
								</Nav.Link>
							)}

							<Dropdown>
								<Dropdown.Toggle variant="light" className="fs-6 text-dark">
									{currentLanguage}
								</Dropdown.Toggle>
								<Dropdown.Menu className="position-absolute">
									<Dropdown.Item
										onClick={() => handleLanguageChange("en", "EN")}
									>
										EN
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => handleLanguageChange("fr", "FR")}
									>
										FR
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => handleLanguageChange("es", "ES")}
									>
										ES
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Alert variant={alertVariant} show={showAlert}>
				{alertMessage}
			</Alert>
		</header>
	);
};

export default Header;
