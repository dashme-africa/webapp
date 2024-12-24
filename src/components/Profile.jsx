import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [banks, setBanks] = useState([]); // State to hold the list of banks
  const [filteredBanks, setFilteredBanks] = useState([]); // Filtered banks for autocomplete
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
  const [isVerified, setIsVerified] = useState(false); // Flag to track if bank details are verified

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const { data } = await axios.get(
            "https://dashmeafrica-backend.vercel.app/api/userProfile/profile",
            // "http://localhost:5000/api/userProfile/profile",
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

    if (formData.accountNumber && !isVerified) {
      alert("Please verify your bank details before saving.");
      return;
    }

    const token = localStorage.getItem("token");

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // Add isVerified to formData
    formDataToSubmit.append("isVerified", isVerified);

    if (image) {
      formDataToSubmit.append("image", image);
    }

    try {
      const response = await axios.put(
        "https://dashmeafrica-backend.vercel.app/api/userProfile/profile",
        // "http://localhost:5000/api/userProfile/profile",
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setUser(response.data);
        alert("Profile updated successfully");
      } else {
        alert(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };


  const verifyBankDetails = async () => {
    try {
      const { accountNumber, bankName } = formData;
      if (!accountNumber || !bankName) {
        alert("Please fill in the account number and bank name to verify.");
        return;
      }

      const response = await axios.get("https://dashmeafrica-backend.vercel.app/api/userProfile/resolve-account", {
      // const response = await axios.get("http://localhost:5000/api/userProfile/resolve-account", {
        params: {
          account_number: accountNumber,
          bank_name: bankName, // Ensure bankName corresponds name in the backend
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
        setIsVerified(true); // Set bank details as verified
        alert("Bank details verified successfully.");
      } else {
        alert("Failed to verify bank details.");
      }
    } catch (error) {
      console.error("Bank verification error:", error);
      alert("Error verifying bank details. Try again later.");
    }
  };


  if (!user) {
    return <div className="text-center py-5">Loading...</div>;
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
              Upload Picture
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
            <h5 className="fw-bold mt-4 mb-4">Bank Details</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  id="accountName"
                  className="form-control"
                  value={formData.accountName}
                  onChange={handleChange}
                  disabled={isVerified} // Disable input after verification
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                  className="form-control"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  disabled={isVerified} // Disable input after verification
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bankName">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  id="bankName"
                  className="form-control"
                  value={formData.bankName}
                  onChange={handleChange}
                  disabled={isVerified} // Disable input after verification
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
                {isVerified ? 'Verified' : 'Verify'}
              </button>
            </form>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="col-md-8 p-4">
          <h4 className="fw-bold">Edit Your Profile</h4>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;




