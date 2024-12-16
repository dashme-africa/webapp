import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';


const HeroPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#333B4C" }}>
      {/* Background Image */}
      <div
        style={{
          // backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/b_rgb:333B4C/c_pad,ar_16:9,e_improve,e_sharpen/v1733764826/lauretta_kgqyaq.png')",
          backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/v1734389465/Gulf_Blue_Simple_Professional_How_To_Improve_Your_SEO_Rankings_Blog_Banner_zqeyog.png')",
          // backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/v1734389465/DMA_HERO_BANNER_2_xmxmyj.png')",
          // backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/v1734389464/DMA_HERO_BANNER_c19vyt.png')",
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
      {/* <div
        className="position-absolute"
        style={{
          left: "4%",
          bottom: "20%",
          backgroundColor: "white",
          padding: "30px 10px",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 3,
          width: "350px",
        }}
      >
        <h2 className="mb-3 text-center " style={{ fontSize: "28px" }}>
          Sell It!
        </h2>
        <h2 className="mb-3 text-center " style={{ fontSize: "28px" }}>
          Donate It!
        </h2>
        <h2 className="mb-4 text-center " style={{ fontSize: "28px" }}>
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
      </div> */}
    </div>
  );
};

export default HeroPage;
