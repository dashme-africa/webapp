import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
// import { FaHeart } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const Product = ({ product }) => {
	const imageUrl = product.primaryImage;
	const { t } = useTranslation();

	return (
		<Card className="my-4 border-0">
			{/* Wrap image in Link for navigation */}
			<div className="d-flex gap-2 align-items-baseline">
				{product.uploader.profilePicture ? (
					<img
						src={product.uploader.profilePicture}
						alt="sellerProfile"
						className="rounded-circle"
						style={{
							width: "40px",
							height: "40px",
							objectFit: "cover",
						}}
					/>
				) : (
					<div
						className="rounded-circle bg-light d-flex justify-content-center border align-items-center"
						style={{ width: "35px", height: "35px" }}
					>
						<FaUser size={20} />
					</div>
				)}
				<p className="text-center mt-2">
					{product.user.username || "Unknown Seller"}
				</p>
			</div>
			<Link to={`/product/${product.id}`}>
				{/* Enforce consistent image height */}
				<Card.Img
					src={imageUrl}
					variant="top"
					style={{ height: "200px", objectFit: "cover" }}
				/>
			</Link>
			<Card.Body className="p-0">
				<div className="d-flex justify-content-between align-items-center mb-1 mt-2">
					{/* Title Section */}
					<Link
						to={`/product/${product.id}`}
						style={{
							textDecoration: "none",
							color: "inherit",
							fontWeight: "400",
						}}
						className="product-title"
					>
						<Card.Title as="div">
							<strong>{product.title}</strong>
						</Card.Title>
					</Link>
					{/* Love Icon */}
					{/* <FaHeart size={25} style={{ color: "grey", cursor: "pointer" }} /> */}
				</div>
				{/* Price */}
				{product.tag === "For sale" && (
					<Card.Text
						as="div"
						className="product-price mb-1"
						style={{ color: "#71033F" }}
					>
						<p className="mb-0">{`N${product.price}`}</p>
					</Card.Text>
				)}
				{/* Location */}
				<Card.Text
					as="div"
					className="product-location d-flex justify-content-between align-items-center mb-1"
				>
					<p className="mb-0 me-auto fs-6">{`${product.location}`}</p>
				</Card.Text>
				{/* Button */}
				<Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
					<Button variant="success" className="text-white">
						{product.tag === "For sale"
							? t("product.tagSell")
							: t("product.donate")}
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Product;
