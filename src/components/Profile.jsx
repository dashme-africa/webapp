import React, { useEffect, useState } from "react";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;
import { useTranslation } from 'react-i18next';
import { Alert } from "react-bootstrap";

const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    address: "",
    bio: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [suggestions, setSuggestions] = useState({ toAddress: [], fromAddress: [] });
  const displayAlert = (message, variant = 'success', duration = 5000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const { data } = await axios.get(
            `${apiURL}/userProfile/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(data);
          setFormData((prevData) => ({
            ...prevData,
            fullName: data.fullName || "",
            username: data.username || "",
            email: data.email || "",
            address: data.address || "",
            bio: data.bio || "",
            accountName: data.accountName || "",
            accountNumber: data.accountNumber || "",
            bankName: data.bankName || "",
          }));

          setIsVerified(data.isVerified || false);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      }
    };

    fetchProfile();

    // Fetch list of banks
    const fetchBanks = async () => {
      try {
        const { data } = await axios.get("https://api.paystack.co/bank", {
          headers: { Authorization: `Bearer YOUR_SECRET_KEY` },
        });
        setBanks(data.data || []);
      } catch (error) {
        console.error("Failed to fetch bank list", error);
      }
    };

    fetchBanks();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        document.getElementById("profile-img").src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "bankName") {
      const filtered = banks.filter((bank) =>
        bank.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  };

  const handleSelectBank = (bankName) => {
    setFormData((prevData) => ({ ...prevData, bankName }));
    setFilteredBanks([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate account details before proceeding
    if (formData.accountNumber && !isVerified) {
      displayAlert(`${t("profile.verifyBankDetails")}`, "danger");
      return;
    }

    const token = localStorage.getItem("token");

    // Initialize formDataToSubmit first
    const formDataToSubmit = new FormData();

    // Append all form data to formDataToSubmit
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // Conditionally append isVerified if necessary
    if (formData.accountNumber && formData.bankName) {
      formDataToSubmit.append("isVerified", isVerified);
    }

    // Append image if it exists
    if (image) {
      formDataToSubmit.append("image", image);
    }

    try {
      const response = await axios.put(
        `${apiURL}/userProfile/profile`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setUser(response.data);
        displayAlert(t("profile.profileUpdated"));
      } else {
        displayAlert(response.data.message || t("profile.failedToUpdate"), "danger");
      }
    } catch (error) {
      displayAlert("Failed to update profile.", "danger");
      console.error("Failed to update profile:", error);
    }
  };

  const verifyBankDetails = async () => {
    try {
      const { accountNumber, bankName } = formData;
      if (!accountNumber || !bankName) {
        displayAlert('Please fill in the account number and bank name to verify.', 'danger');
        return;
      }

      const response = await axios.get(`${apiURL}/userProfile/resolve-account`, {
        params: {
          account_number: accountNumber,
          bank_name: bankName,
        },
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.data?.account_name) {
        setFormData((prevData) => ({
          ...prevData,
          accountName: response.data.data.account_name,
        }));
        setIsVerified(true);
        displayAlert(t("profile.bankVerified"));
      } else {
        displayAlert(t("profile.bankVerificationFailed"), 'danger');
      }
    } catch (error) {
      // console.error("Bank verification error:", error);
      displayAlert('Error verifying bank details. Try again later.', 'danger');
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
            key: "AlzaSy0XONEOOhGloShSf_9uN8Qhx8wWrVodlYb",
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


  if (!user) {
    return <div className="text-center py-5">{t("profile.loading")}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row g-0">
        <div className="col-md-4 bg-light text-center p-4">
          <img
            id="profile-img"
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-circle img-fluid"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <div>

            <label className="btn btn-outline-success btn-sm mt-3">
              {t("profile.uploadPicture")}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
              />
            </label>
            <h3 className="fw-bold mt-3">{user.username || "Buzz Brain"}</h3>
          </div>

          {/* Bank Details Section */}
          <div className="mt-5 text-start">
            <h5 className="fw-bold mt-4 mb-4">{t("profile.bankDetails")}</h5>
            <i>DashMe Africa retains 5% commission on your sales price
            </i>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">{t("profile.accountName")}</label>
                <input
                  type="text"
                  name="accountName"
                  id="accountName"
                  className="form-control"
                  placeholder="Will display after acc. no is verified"
                  value={formData.accountName}
                  onChange={handleChange}
                  disabled={isVerified}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="accountNumber">{t("profile.accountNumber")}</label>
                <input
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                  className="form-control"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  disabled={isVerified}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bankName">{t("profile.bankName")}</label>
                <input
                  type="text"
                  name="bankName"
                  id="bankName"
                  className="form-control"
                  value={formData.bankName}
                  onChange={handleChange}
                  disabled={isVerified}
                />
                {filteredBanks.length > 0 && (
                  <ul className="list-group mt-1">
                    {filteredBanks.map((bank) => (
                      <li
                        key={bank.code}
                        className="list-group-item"
                        onClick={() => handleSelectBank(bank.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {bank.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button type="button" onClick={verifyBankDetails} className="btn btn-success" disabled={isVerified}>
                {isVerified ? `${t("profile.verified")}` : `${t("profile.verify")}`}
              </button>
            </form>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="col-md-8 p-4">
          <h4 className="fw-bold">{t("profile.editProfile")}</h4>
          <Alert
            variant={alertVariant}
            show={showAlert}
            style={{
              position: 'fixed',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000
            }}
          >
            {alertMessage}
          </Alert>


          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">{t("profile.fullName")}</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("profile.email")}</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 position-relative">
              <label className="form-label">{t("profile.address")}</label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                value={formData.address}
                onChange={(e) => {
                  handleChange(e);
                  fetchAddressSuggestions(e.target.value, "address");
                }}
              ></textarea>
              {suggestions.address && suggestions.address.length > 0 && (
                <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1050 }}>
                  {suggestions.address.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          address: suggestion.displayName,
                        }));
                        setSuggestions((prev) => ({ ...prev, address: [] }));
                      }}
                    >
                      {suggestion.displayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">{t("profile.bio")}</label>
              <textarea
                name="bio"
                className="form-control"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              {t("profile.saveChanges")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;




