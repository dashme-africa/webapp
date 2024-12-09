// // PaymentPage.js or equivalent file
// import { useEffect, useState } from 'react';

// const PaymentPage = () => {
//   const [status, setStatus] = useState('Processing...');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const transactionReference = queryParams.get("transactionReference");

//     console.log(transactionReference)

  
//     if (transactionReference) {
//       fetch("http://localhost:5000/api/payment/verify-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ transactionReference }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             setStatus("Payment successful! Thank you.");
//           } else {
//             setStatus("Payment failed or incomplete.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying payment:", error);
//           setStatus("An error occurred. Please try again.");
//         });
//     } else {
//       setStatus("Invalid payment reference.");
//     }
//   }, []);
  

//   return <div>{status}</div>;
// };

// export default PaymentPage;

import { useEffect, useState } from 'react';

const PaymentPage = () => {
    const [status, setStatus] = useState('Processing...');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const transactionReference = queryParams.get('transactionReference');

        console.log(transactionReference)
        if (transactionReference) {
            
            // fetch('http://localhost:5000/api/payment/verify-payment', {
            fetch('https://dashmeafrica-backend.vercel.app/api/payment/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionReference }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setStatus('Payment successful! Thank you.');
                    } else {
                        setStatus('Payment failed or incomplete.');
                    }
                })
                .catch((error) => {
                    console.error('Error verifying payment:', error);
                    setStatus('An error occurred. Please try again.');
                });
        } else {
            setStatus('Invalid payment reference.');
        }
    }, []);

    return <div>{status}</div>;
};

export default PaymentPage;
