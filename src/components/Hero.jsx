import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const HeroPage = ({ setSelectedCategory }) => {
  const { t } = useTranslation();

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#333B4C" }}>
      <div
        style={{
          backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/v1734502295/hero-banner_tvastc.jpg')",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      ></div>

      <div
        className="d-flex justify-content-left align-items-center"
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          backgroundColor: "white",
          zIndex: 2,
          padding: "10px",
        }}
      >
        <nav className="d-flex justify-content-start justify-content-md-center flex-nowrap overflow-auto">
          <button
            onClick={() => setSelectedCategory("Clothes")}
            className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6"
          >
            {t("clothes")}
          </button>
          <button
            onClick={() => setSelectedCategory("Household-items")}
            className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6"
            style={{ whiteSpace: 'nowrap' }}
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
      <div className="position-absolute" style={{ zIndex: 3, width: "300px", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >

        <div className="text-center">
          <Link to="/upload">
            <Button
              style={{
                backgroundColor: "green",
                borderColor: "green",
                borderRadius: "15px",
                padding: "10px 20px",
                fontWeight: "bold",
                fontSize: "1.5rem",
                width: "80%",
                maxWidth: "80%",
              }}
            >
              {t('uploadText')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;



