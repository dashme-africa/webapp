import React from 'react';

const Hero = () => {
  return (
    <section className="bg-light py-5">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Text Content */}
        <div className="col-md-6 text-left">
          <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>Sell It! Donate It! Don’t Trash It!</h1>
          <p className="text-secondary mb-4" style={{ fontSize: '1.2rem' }}>
            Join a community of sustainable living. List items you don’t need and let others benefit.
          </p>
          <button className="btn btn-success" style={{ fontSize: '1.2rem', padding: '12px 24px', borderRadius: '25px' }}>
            Upload
          </button>
        </div>

        {/* Hero Image */}
        <div className="col-md-6">
          <img
            src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733150204/hero_z088oi.png"  // Change to the actual image path you uploaded
            alt="Hero"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

// import React from 'react';
// import '../Hero.css';



// const Hero = () => {
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="hero-text">
//             <h1>Sell It!</h1>
//             <h1>Donate It!</h1>
//             <h1>Don't Trash It!</h1>
//             <button className="btn btn-primary">Upload</button>
//           </div>
//         </div>
//         <div className="col-md-6">
//           {/* <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Hero Image" className="hero-image" /> */}
//           <img src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733150204/hero_z088oi.png" alt="Hero Image" className="hero-image"/> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;