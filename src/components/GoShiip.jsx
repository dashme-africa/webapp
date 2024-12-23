import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const CourierForm = () => {
  const [type, setType] = useState("");
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(""); // Updated to track carrier name
  const [deliveryDetails, setDeliveryDetails] = useState({
    toAddress: { name: "", email: "", address: "", phone: "" },
    fromAddress: { name: "", email: "", address: "", phone: "" },
    parcels: { width: "", length: "", height: "", weight: "" },
    items: [{ name: "", description: "", weight: "", category: "", amount: "", quantity: "" }],
  });
  const [suggestions, setSuggestions] = useState({ toAddress: [], fromAddress: [] });
  const [rateDetails, setRateDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchCouriers = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:5000/api/couriers", { params: { type } });
      setCouriers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching couriers:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to fetch couriers.");
    }
  };

  const fetchAddressSuggestions = async (input, addressType) => {
    if (!input) {
      setSuggestions((prev) => ({ ...prev, [addressType]: [] }));
      return;
    }

    try {
      const response = await axios.get(
        "https://maps.gomaps.pro/maps/api/place/queryautocomplete/json",
        {
          params: {
            input: encodeURIComponent(input),
            key: "AlzaSy0XONEOOhGloShSf_9uN8Qhx8wWrVodlYb", // Replace with your actual key
          },
        }
      );

      const fetchedSuggestions = response.data.predictions.map((prediction) => ({
        displayName: prediction.description,
        placeId: prediction.place_id,
      }));

      setSuggestions((prev) => ({ ...prev, [addressType]: fetchedSuggestions }));
    } catch (error) {
      console.error("Error fetching address suggestions:", error.response?.data || error.message);
      setSuggestions((prev) => ({ ...prev, [addressType]: [] }));
    }
  };

  const handleAddressSelection = (addressType, suggestion) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      [addressType]: { ...prev[addressType], address: suggestion.displayName },
    }));
    setSuggestions((prev) => ({ ...prev, [addressType]: [] }));
  };

  const handleInputChange = (section, field, value, index = null) => {
    setDeliveryDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      if (index !== null) {
        updatedDetails[section][index][field] = value;
      } else {
        updatedDetails[section][field] = value;
      }
      return updatedDetails;
    });

    if (field === "address" && (section === "toAddress" || section === "fromAddress")) {
      fetchAddressSuggestions(value, section);
    }
  };

  const handleFetchRate = async () => {
    try {
      setError(null);

      if (!selectedCourier) {
        setError("Please select a courier.");
        return;
      }

      const payload = {
        type,
        carrierName: selectedCourier, // Include the selected courier name
        ...deliveryDetails,
      };

      const response = await axios.post(
        `http://localhost:5000/api/rates`,
        payload,
        {
          headers: { Authorization: "Bearer Secret Key", "Content-Type": "application/json" }
        }
      );
      setRateDetails(response.data.data.rates);
    } catch (error) {
      console.error("Error fetching rate:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to fetch rate.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Get Available Couriers</h3>
      <div className="d-flex justify-content-between gap-4 mb-5">
        <div className="form-group w-100">
          <label className="mb-3 cursor-pointer">Select Type:</label>
          <select
            className="form-control cursor-pointer"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" className="cursor-pointer">Select</option>
            <option value="interstate">Interstate</option>
            <option value="intrastate">Intrastate</option>
            <option value="international">International</option>
            <option value="frozen-international">Frozen International</option>
            <option value="all">All</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleFetchCouriers}>
          Fetch Couriers
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {couriers.length > 0 && (
        <div>
          <h4 className="mb-3">Available Couriers:</h4>
          <div className="form-group mb-4">
            <label className="mb-3">Select Courier:</label>
            <select
              className="form-control cursor-pointer"
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
            >
              <option className="cursor-pointer" value="">Select Courier</option>
              {couriers.map((courier, index) => (
                <option key={index} className="cursor-pointer" value={courier.name}>
                  {courier.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {couriers.length > 0 && (
        <div className="row">

          {/* To Address Section */}
          <h4 className="mt-5 mb-3">Enter Delivery Details:</h4>
          <h5 className="mb-2">To Address:</h5>
          {Object.keys(deliveryDetails.toAddress).map((key) => (
            <div key={key} className="form-group col-md-6 g-4">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                className="form-control"
                value={deliveryDetails.toAddress[key]}
                onChange={(e) => handleInputChange("toAddress", key, e.target.value)}
              />
              {key === "address" && suggestions.toAddress.length > 0 && (
                <ul className="list-group position-absolute w-50" style={{ zIndex: 1000 }}>
                  {suggestions.toAddress.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleAddressSelection("toAddress", suggestion)}
                    >
                      {suggestion.displayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* From Address Section */}
          <h5 className="mt-4 mb-3">From Address:</h5>
          {Object.keys(deliveryDetails.fromAddress).map((key) => (
            <div key={key} className="form-group col-md-6 g-4">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                className="form-control"
                value={deliveryDetails.fromAddress[key]}
                onChange={(e) => handleInputChange("fromAddress", key, e.target.value)}
              />
              {key === "address" && suggestions.fromAddress.length > 0 && (
                <ul className="list-group position-absolute w-50" style={{ zIndex: 1000 }}>
                  {suggestions.fromAddress.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleAddressSelection("fromAddress", suggestion)}
                    >
                      {suggestion.displayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <h5 className="mt-4">Parcel Details:</h5>
          {Object.keys(deliveryDetails.parcels).map((key) => (
            <div key={key} className="form-group col-md-6 g-4">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="number"
                className="form-control"
                value={deliveryDetails.parcels[key]}
                onChange={(e) => handleInputChange("parcels", key, e.target.value)}
              />
            </div>
          ))}
          <h5 className="mt-4 mb-3">Items:</h5>
          {deliveryDetails.items.map((item, index) => (
            <div key={index}>
              {Object.keys(item).map((key) => (
                <div key={key} className="form-group col-md-6 mt-3">
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input
                    type={key === "quantity" || key === "amount" ? "number" : "text"}
                    className="form-control"
                    value={item[key]}
                    onChange={(e) => handleInputChange("items", key, e.target.value, index)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button className="btn btn-success mt-4 w-50" onClick={handleFetchRate}>
            Get Rate
          </button>
        </div>
    )}

{rateDetails && (
            <div className="mt-4">
              <h4>Rate Details:</h4>
              <p>Courier: {rateDetails.courier.name}</p>
              <p>Amount: {rateDetails.amount} {rateDetails.currency}</p>
              <p>Estimated Delivery: {rateDetails.estimated_days}</p>
              <p>Pickup Info: {rateDetails.pickup}</p>
            </div>
          )}
        </div>
  );
};

      export default CourierForm;
