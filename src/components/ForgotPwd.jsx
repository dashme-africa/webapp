import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useFetch } from "../api.service";
import { toast } from "sonner";

const apiURL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [emailHasSent, setEmailHasSent] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const res = await useFetch("/users/forgot-password", "POST", { email });
		setIsSubmitting(false);

		if (!res.ok) return toast.error(res.message);

		setEmailHasSent(true);
		toast.success(res.message);
	};

	return (
		<div className="container my-5">
			<div className="row g-0">
				{/* Left Column: Form */}
				{emailHasSent ? (
					<div className="col-md-6 p-5 bg-light flex justify-center items-center">
						<p className="text-xl"> Check your email for reset link</p>{" "}
					</div>
				) : (
					<div className="col-md-6 p-5 bg-light">
						<h2 className="mb-4 text-center">Forgotten your password?</h2>
						<p className="text-center mb-4">
							Enter your email address and we’ll send you instructions to reset
							your password.
						</p>

						<form onSubmit={handleSubmit}>
							{/* Email Input */}
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Enter your email address
								</label>
								<input
									type="email"
									id="email"
									className="form-control"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="example@email.com"
									required
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="btn btn-success w-100"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Sending..." : "Continue"}
							</button>
						</form>

						{/* Help Text */}
						<p className="text-center mt-3">
							<p>
								Having Issues, Need Help?{" "}
								<a
									href="https://wa.me/message/7J6DBJ5F6ESGB1"
									className="text-success"
								>
									Chat On WhatsApp
								</a>
							</p>
						</p>
					</div>
				)}

				{/* Right Column: Image/Logo */}
				<div
					className="col-md-6 text-center d-flex justify-content-center align-items-center rounded-lg"
					style={{
						backgroundColor: "#000000",
						borderRadius: "20px",
					}}
				>
					<img
						src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733432339/Frame_4_1_2_ooduat.png" // Replace with your logo/image URL
						alt="DashMe Africa Logo"
						className="img-fluid"
						style={{ maxWidth: "70%" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
