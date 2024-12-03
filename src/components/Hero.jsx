import React from "react";
import { Button } from "react-bootstrap";

const HeroPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background Image */}
      <div
        style={{
          backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/v1733150204/hero_z088oi.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
        }}
      >
        <nav className="d-flex justify-content-center">
          <a
            href="#clothes"
            className="mx-4 text-dark fw-bold"
            style={{ textDecoration: "none" }}
          >
            Clothes
          </a>
          <a
            href="#household-items"
            className="mx-4 text-dark fw-bold"
            style={{ textDecoration: "none" }}
          >
            Household Items
          </a>
          <a
            href="#accessories"
            className="mx-4 text-dark fw-bold"
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
          left: "10%",
          bottom: "10%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 3,
        }}
      >
        <h2 className="mb-3 text-center fw-bold">Sell It!</h2>
        <h2 className="mb-3 text-center fw-bold">Donate It!</h2>
        <h2 className="mb-4 text-center fw-bold">Don't Trash It!</h2>
        <div className="text-center">
          <Button
            style={{
              backgroundColor: "green",
              borderColor: "green",
              borderRadius: "25px",
              padding: "10px 30px",
              fontWeight: "bold",
            }}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
