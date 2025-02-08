import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // If using React Router
import { Alert } from "react-bootstrap";
import { toast } from "sonner";
import { useFetch } from "../api.service";

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	// Get token from the URL
	const token = searchParams.get("token");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		setIsSubmitting(true);

		const res = await useFetch("/users/reset-password", "POST", {
			token,
			password,
		});
		setIsSubmitting(false);

		if (!res.ok) return toast.error(res.message);

		toast.success(res.message, { style: { backgroundColor: "green" } });

		navigate("/login");
	};

	return (
		<div className="container my-5">
			<div className="row g-0 justify-content-center">
				<div className="col-md-6 p-5 bg-light">
					<h2 className="mb-4 text-center">Reset Password</h2>
					<p className="text-center mb-4">
						Enter a new password below to reset your account password.
					</p>

					<form onSubmit={handleSubmit}>
						{/* Password Input */}
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								New Password
							</label>
							<input
								type="password"
								id="password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						{/* Confirm Password Input */}
						<div className="mb-3">
							<label htmlFor="confirmPassword" className="form-label">
								Confirm New Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								className="form-control"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-success w-100"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Reset Password"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
