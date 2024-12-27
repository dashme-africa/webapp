// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, Alert } from "react-bootstrap";
// import { useLocation } from "react-router-dom";

// const TrackingPage = () => {
//   const { state } = useLocation();
//   const { transactionId } = state || {};
//   const [trackingInfo, setTrackingInfo] = useState(null);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertVariant, setAlertVariant] = useState('success');

//   const displayAlert = (message, variant = 'success', duration = 5000) => {
//     setAlertMessage(message);
//     setAlertVariant(variant);
//     setShowAlert(true);
//     setTimeout(() => {
//       setShowAlert(false);
//     }, duration);
//   };

//   useEffect(() => {
//     if (transactionId) {
//       fetchTrackingInfo(transactionId);
//     }
//   }, [transactionId]);

//   const fetchTrackingInfo = async (transactionId) => {
//     try {
//       const response = await axios.get(`${apiURL}/tracking/${transactionId}`);
//       setTrackingInfo(response.data);
//     } catch (error) {
//       console.error("Error fetching tracking info:", error);
//       displayAlert("Error fetching tracking information.", "danger");
//     }
//   };

//   if (!transactionId) {
//     return <div>No transaction found.</div>;
//   }

//   return (
//     <div className="container my-5">
//       <h3 className="mb-4 text-success">Tracking Information</h3>
//       <Alert variant={alertVariant} show={showAlert}>
//         {alertMessage}
//       </Alert>

//       {trackingInfo ? (
//         <Card className="p-4">
//           <div>
//             <h5>Transaction Status</h5>
//             <p><strong>Status:</strong> {trackingInfo.status}</p>
//             <p><strong>Tracking ID:</strong> {trackingInfo.transactionId}</p>
//             <p><strong>Estimated Delivery Date:</strong> {trackingInfo.estimatedDelivery}</p>
//           </div>

//           <div className="mt-3">
//             <h5>Shipment Details</h5>
//             <p><strong>Shipping Carrier:</strong> {trackingInfo.courier}</p>
//             <p><strong>Shipping Address:</strong> {trackingInfo.deliveryAddress}</p>
//             <p><strong>Tracking Number:</strong> {trackingInfo.trackingNumber}</p>
//           </div>

//           <Button className="mt-3" onClick={() => window.location.reload()}>Refresh Tracking</Button>
//         </Card>
//       ) : (
//         <p>Loading tracking information...</p>
//       )}
//     </div>
//   );
// };

// export default TrackingPage;
import { useState, useEffect } from 'react';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;

const TrackShipment = ({ reference }) => {
  const [shipmentStatus, setShipmentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/track-shipment/${reference}`);

        if (response.data.status) {
          setShipmentStatus(response.data.data);
        } else {
          setError('Could not fetch tracking information');
        }
      } catch (err) {
        setError('Failed to fetch tracking data');
        console.error(err);
      }
    };

    if (reference) {
      fetchTrackingInfo();
    }
  }, [reference]);

  return (
    <div>
      {shipmentStatus ? (
        <div>
          <h2>Shipment Status</h2>
          <p>Current Status: {shipmentStatus.current_status}</p>
          <ul>
            {shipmentStatus.status_history.map((status, index) => (
              <li key={index}>
                {status.status} - {status.timestamp}
              </li>
            ))}
          </ul>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TrackShipment;
