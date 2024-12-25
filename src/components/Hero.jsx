import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';


const HeroPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#333B4C" }}>
      {/* Background Image */}
      <div
        style={{
          backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/v1734502295/hero-banner_tvastc.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      ></div>

      {/* Navigation Links */}
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
        <nav className="d-flex justify-content-start justify-content-md-center">
          <a
            href="#clothes"
            className="mx-2 mb-3 text-dark fs-6"
            style={{ textDecoration: "none" }}
          >
            Clothes
          </a>
          <a
            href="#household-items"
            className="mx-2 mb-3 text-dark fs-6"
            style={{ textDecoration: "none" }}
          >
            Household Items
          </a>
          <a
            href="#accessories"
            className="mx-2 mb-3 text-dark fs-6"
            style={{ textDecoration: "none" }}
          >
            Accessories
          </a>
        </nav>
      </div>

      {/* Bottom Left Section */}
      <div
        className="position-absolute"
        style={{
          left: "7%",
          bottom: "30%",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 3,
          width: "300px",
        }}
      >
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
              Upload
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
