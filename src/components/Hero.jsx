import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroPage = ({ setSelectedCategory }) => {
	const { t } = useTranslation();

	const screenSize = window.innerWidth; // Example logic
	const getBackgroundImage = () => {
		if (screenSize <= 640) {
			return "https://res.cloudinary.com/dsa52qglg/image/upload/v1735752185/360px_X_640_20241231_191314_0000_y1twwu.png";
		} else if (screenSize <= 1024) {
			return "https://res.cloudinary.com/dsa52qglg/image/upload/v1735752228/768_X_1024_ucl80s.png";
		} else if (screenSize <= 2560) {
			return "https://res.cloudinary.com/dsa52qglg/image/upload/v1735752226/1440_X_900_20241231_200134_0000_oqhlq3.png";
		}
		// Add more conditions as needed
		return "https://res.cloudinary.com/dsa52qglg/image/upload/v1735752228/768_X_1024_ucl80s.png";
	};

	return (
		<div
			className="hero-banner"
			style={{
				position: "relative",
				backgroundImage: `url(${getBackgroundImage()})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "750px",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div
				className="hero-content"
				style={{
					position: "absolute",
					top: "0",
					width: "100%",
					backgroundColor: "white",
					zIndex: 2,
					padding: "10px",
				}}
			>
				<nav className="d-flex justify-content-start flex-nowrap overflow-auto">
					<button
						onClick={() => setSelectedCategory("Clothes")}
						className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6"
					>
						{t("clothes")}
					</button>
					<button
						onClick={() => setSelectedCategory("Household-Items")}
						className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6"
						style={{ whiteSpace: "nowrap" }}
					>
						{t("householdItems")}
					</button>
					<button
						onClick={() => setSelectedCategory("Accessories")}
						className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6"
					>
						{t("accessories")}
					</button>
					<button
						onClick={() => setSelectedCategory("Electronics")}
						className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6"
					>
						{t("electronics")}
					</button>
				</nav>
			</div>
			{/* Bottom Left Section */}
			{/* <div className="position-absolute" style={{
        zIndex: 3,
        width: "300px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div className="text-center">
          <Link to="/upload">
            <Button className="hero-button" style={{
              backgroundColor: "green",
              borderColor: "green",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "1.5rem",
              width: "80%",
              maxWidth: "80%",
            }}>
              {t('uploadText')}
            </Button>
          </Link>
        </div>
      </div> */}

			<div
				className="position-absolute"
				style={{
					right: "4%",
					bottom: "2%",
					backgroundColor: "white",
					padding: "20px 0",
					borderRadius: "15px",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					zIndex: 3,
					width: "220px",
				}}
			>
				<h2 className="mb-3 text-center " style={{ fontSize: "20px" }}>
					Sell It!
				</h2>
				<h2 className="mb-3 text-center " style={{ fontSize: "20px" }}>
					Donate It!
				</h2>
				<h2 className="mb-4 text-center " style={{ fontSize: "20px" }}>
					Don't Trash It!
				</h2>
				<div className="text-center">
					<Link to="/upload">
						<Button
							style={{
								backgroundColor: "green",
								borderColor: "green",
								borderRadius: "15px",
								padding: "7px 30px",
								fontWeight: "bold",
								fontSize: "18px",
								width: "80%",
								maxWidth: "80%",
							}}
						>
							Upload
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeroPage;
