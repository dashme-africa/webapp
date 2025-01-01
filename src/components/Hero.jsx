import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const HeroPage = ({ setSelectedCategory }) => {
  const { t } = useTranslation();

  const screenSize = window.innerWidth; // Example logic
  const getBackgroundImage = () => {
    if (screenSize <= 600) {
      return 'https://res.cloudinary.com/dsa52qglg/image/upload/v1735752185/360px_X_640_20241231_191314_0000_y1twwu.png';
    } else if (screenSize <= 1024) {
      return 'https://res.cloudinary.com/dsa52qglg/image/upload/v1735752228/768_X_1024_ucl80s.png';
    } else if (screenSize <= 2000) {
      return 'https://res.cloudinary.com/dsa52qglg/image/upload/v1735752226/1440_X_900_20241231_200134_0000_oqhlq3.png';
    }
    // Add more conditions as needed
    return 'https://res.cloudinary.com/dsa52qglg/image/upload/v1735752228/768_X_1024_ucl80s.png';
  };

  return (
      <div
      className="hero-banner"
      style={{
        position: "relative",
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '750px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-content" style={{
        position: "absolute",
        top: "0",
        width: "100%",
        backgroundColor: "white",
        zIndex: 2,
        padding: "10px"
      }}>
        <nav className="d-flex justify-content-start justify-content-md-center flex-nowrap overflow-auto">
          <button onClick={() => setSelectedCategory("Clothes")} className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6">
            {t("clothes")}
          </button>
          <button onClick={() => setSelectedCategory("Household-items")} className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6" style={{ whiteSpace: 'nowrap' }}>
            {t("householdItems")}
          </button>
          <button onClick={() => setSelectedCategory("Accessories")} className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6">
            {t("accessories")}
          </button>
          <button onClick={() => setSelectedCategory("Electronics")} className="btn btn-link text-decoration-none mx-2 mb-3 text-dark fs-6">
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




// import React from "react";
// import { Button } from "react-bootstrap";
// import { Link } from 'react-router-dom';


// const HeroPage = () => {
//   return (
//     <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#333B4C" }}>
//       {/* Background Image */}
//       <div
//         style={{
//           backgroundImage: "url('https://res.cloudinary.com/df2q6gyuq/image/upload/b_rgb:333B4C/c_pad,ar_16:9,e_improve,e_sharpen/v1733764826/lauretta_kgqyaq.png')",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           // backgroundSize: "cover",
//           width: "100%",
//           height: "100%",
//         }}
//       ></div>

//       {/* Navigation Links */}
//       <div
//         className="d-flex justify-content-left align-items-center"
//         style={{
//           position: "absolute",
//           top: "0",
//           width: "100%",
//           backgroundColor: "white",
//           zIndex: 2,
//           padding: "10px",
//         }}
//       >
//         <nav className="d-flex justify-content-start justify-content-md-center">
//           <a
//             href="#clothes"
//             className="mx-2 mb-3 text-dark fs-6"
//             style={{ textDecoration: "none" }}
//           >
//             Clothes
//           </a>
//           <a
//             href="#household-items"
//             className="mx-2 mb-3 text-dark fs-6"
//             style={{ textDecoration: "none" }}
//           >
//             Household Items
//           </a>
//           <a
//             href="#accessories"
//             className="mx-2 mb-3 text-dark fs-6"
//             style={{ textDecoration: "none" }}
//           >
//             Accessories
//           </a>
//         </nav>
//       </div>

//       {/* Bottom Left Section */}
//       <div
//         className="position-absolute"
//         style={{
//           left: "4%",
//           bottom: "20%",
//           backgroundColor: "white",
//           padding: "30px 10px",
//           borderRadius: "15px",
//           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//           zIndex: 3,
//           width: "350px",
//         }}
//       >
//         <h2 className="mb-3 text-center " style={{ fontSize: "28px" }}>
//           Sell It!
//         </h2>
//         <h2 className="mb-3 text-center " style={{ fontSize: "28px" }}>
//           Donate It!
//         </h2>
//         <h2 className="mb-4 text-center " style={{ fontSize: "28px" }}>
//           Don't Trash It!
//         </h2>
//         <div className="text-center">
//           <Link to="/upload">
//             <Button
//               style={{
//                 backgroundColor: "green",
//                 borderColor: "green",
//                 borderRadius: "15px",
//                 padding: "7px 30px",
//                 fontWeight: "bold",
//                 fontSize: "18px",
//                 width: "80%",
//                 maxWidth: "80%",
//               }}
//             >
//               Upload
//             </Button>
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroPage;