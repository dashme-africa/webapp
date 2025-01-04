import React from 'react';
import { Table } from 'react-bootstrap';

const TransactionTable = ({ transactions }) => {
    return (
        <Table striped bordered hover responsive>
            <thead className="table-primary">
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Reference</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={transaction.reference}>
                        <td>{index + 1}</td>
                        <td>{new Date(transaction.paidAt).toLocaleString()}</td>
                        <td>₦{(transaction.amount / 100).toFixed(2)}</td>
                        <td>{transaction.paymentMethod}</td>
                        <td className={transaction.status === 'success' ? 'text-success' : 'text-danger'}>
                            {transaction.status}
                        </td>
                        <td>{transaction.reference}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TransactionTable;


// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import axios from "axios";
// const apiURL = import.meta.env.VITE_API_URL;
// import { useTranslation } from 'react-i18next';
// import { Alert } from "react-bootstrap";
// import '../custom.css';

// const AccountSummary = () => {
//     const { t } = useTranslation();
//     const [user, setUser] = useState(null);
//     const [image, setImage] = useState(null);
//     const [banks, setBanks] = useState([]);
//     const [filteredBanks, setFilteredBanks] = useState([]);
//     const [formData, setFormData] = useState({
//         fullName: "",
//         username: "",
//         email: "",
//         address: "",
//         bio: "",
//         accountName: "",
//         accountNumber: "",
//         bankName: "",
//         phoneNumber: "",
//     });
//     const [isVerified, setIsVerified] = useState(false);
//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');
//     const [alertVariant, setAlertVariant] = useState('success');
//     const [suggestions, setSuggestions] = useState({ toAddress: [], fromAddress: [] });
//     const displayAlert = (message, variant = 'success', duration = 5000) => {
//         setAlertMessage(message);
//         setAlertVariant(variant);
//         setShowAlert(true);
//         setTimeout(() => {
//             setShowAlert(false);
//         }, duration);
//     };

//     useEffect(() => {
//         // Fetch user profile
//         const fetchProfile = async () => {
//             const token = localStorage.getItem("token");

//             if (token) {
//                 try {
//                     const { data } = await axios.get(
//                         `${apiURL}/userProfile/profile`,
//                         {
//                             headers: { Authorization: `Bearer ${token}` },
//                         }
//                     );
//                     setUser(data);
//                     setFormData((prevData) => ({
//                         ...prevData,
//                         fullName: data.fullName || "",
//                         username: data.username || "",
//                         email: data.email || "",
//                         address: data.address || "",
//                         bio: data.bio || "",
//                         accountName: data.accountName || "",
//                         accountNumber: data.accountNumber || "",
//                         bankName: data.bankName || "",
//                         phoneNumber: data.phoneNumber || "",
//                     }));

//                     setIsVerified(data.isVerified || false);
//                 } catch (error) {
//                     console.error("Failed to fetch user profile", error);
//                 }
//             }
//         };

//         fetchProfile();

//         // Fetch list of banks
//         const fetchBanks = async () => {
//             try {
//                 const { data } = await axios.get("https://api.paystack.co/bank", {
//                     headers: { Authorization: `Bearer YOUR_SECRET_KEY` },
//                 });
//                 setBanks(data.data || []);
//             } catch (error) {
//                 console.error("Failed to fetch bank list", error);
//             }
//         };

//         fetchBanks();
//     }, []);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);

//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 document.getElementById("profile-img").src = reader.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));

//         if (name === "bankName") {
//             const filtered = banks.filter((bank) =>
//                 bank.name.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredBanks(filtered);
//         }
//     };

//     const handleSelectBank = (bankName) => {
//         setFormData((prevData) => ({ ...prevData, bankName }));
//         setFilteredBanks([]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate account details before proceeding
//         if (formData.accountNumber && !isVerified) {
//             displayAlert(`${t("profile.verifyBankDetails")}`, "danger");
//             return;
//         }

//         const token = localStorage.getItem("token");

//         // Initialize formDataToSubmit first
//         const formDataToSubmit = new FormData();

//         // Append all form data to formDataToSubmit
//         Object.keys(formData).forEach((key) => {
//             formDataToSubmit.append(key, formData[key]);
//         });

//         // Conditionally append isVerified if necessary
//         if (formData.accountNumber && formData.bankName) {
//             formDataToSubmit.append("isVerified", isVerified);
//         }

//         // Append image if it exists
//         if (image) {
//             formDataToSubmit.append("image", image);
//         }

//         try {
//             const response = await axios.put(
//                 `${apiURL}/userProfile/profile`,
//                 formDataToSubmit,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (response.data) {
//                 setUser(response.data);
//                 displayAlert(t("profile.profileUpdated"));
//             } else {
//                 displayAlert(response.data.message || t("profile.failedToUpdate"), "danger");
//             }
//         } catch (error) {
//             displayAlert("Failed to update profile.", "danger");
//             console.error("Failed to update profile:", error);
//         }
//     };

//     const verifyBankDetails = async () => {
//         try {
//             const { accountNumber, bankName } = formData;
//             if (!accountNumber || !bankName) {
//                 displayAlert('Please fill in the account number and bank name to verify.', 'danger');
//                 return;
//             }

//             const response = await axios.get(`${apiURL}/userProfile/resolve-account`, {
//                 params: {
//                     account_number: accountNumber,
//                     bank_name: bankName,
//                 },
//             },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );

//             if (response.data.data?.account_name) {
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     accountName: response.data.data.account_name,
//                 }));
//                 setIsVerified(true);
//                 displayAlert(t("profile.bankVerified"));
//             } else {
//                 displayAlert(t("profile.bankVerificationFailed"), 'danger');
//             }
//         } catch (error) {
//             // console.error("Bank verification error:", error);
//             displayAlert('Error verifying bank details. Try again later.', 'danger');
//         }
//     };

//     const fetchAddressSuggestions = async (input, addressType) => {
//         if (!input) {
//             setSuggestions((prev) => ({ ...prev, [addressType]: [] }));
//             return;
//         }

//         try {
//             const response = await axios.get(
//                 "https://maps.gomaps.pro/maps/api/place/queryautocomplete/json",
//                 {
//                     params: {
//                         input: encodeURIComponent(input),
//                         key: "AlzaSy0XONEOOhGloShSf_9uN8Qhx8wWrVodlYb",
//                     },
//                 }
//             );

//             const fetchedSuggestions = response.data.predictions.map((prediction) => ({
//                 displayName: prediction.description,
//                 placeId: prediction.place_id,
//             }));

//             setSuggestions((prev) => ({ ...prev, [addressType]: fetchedSuggestions }));
//         } catch (error) {
//             console.error("Error fetching address suggestions:", error.response?.data || error.message);
//             setSuggestions((prev) => ({ ...prev, [addressType]: [] }));
//         }
//     };

//     if (!user) {
//         return <div className="text-center py-5">{t("profile.loading")}</div>;
//     }

//     return (
//         <Container className="my-5">
//             <h5 className="text-end mb-3">Welcome, <span className="text-success">{user.username}</span></h5>
//             <Col md={3} className="px-4 py-4 d-md-none">
//                 <div className="mb-4">
//                     <h5 className="mb-4">Account Summary</h5>
//                     <ul className="nav nav-tabs" id="myTab" role="tablist">
//                         <li className="nav-item" role="presentation">
//                             <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">My Profile</button>
//                         </li>
//                         <li className="nav-item" role="presentation">
//                             <button className="nav-link" id="address-book-tab" data-bs-toggle="tab" data-bs-target="#address-book" type="button" role="tab" aria-controls="address-book" aria-selected="false">My Orders</button>
//                         </li>
//                         <li className="nav-item" role="presentation">
//                             <button className="nav-link" id="payment-options-tab" data-bs-toggle="tab" data-bs-target="#payment-options" type="button" role="tab" aria-controls="payment-options" aria-selected="false">My Transactions</button>
//                         </li>
//                         <li className="nav-item" role="presentation">
//                             <button className="nav-link" id="my-wishlist-tab" data-bs-toggle="tab" data-bs-target="#my-wishlist" type="button" role="tab" aria-controls="my-wishlist" aria-selected="false">My Shipments</button>
//                         </li>
//                     </ul>
//                 </div>
//                 {/* <div className="tab-content" id="myTabContent">
//                     <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
//                         <h5>My Profile</h5>
//                     </div>
//                     <div className="tab-pane fade" id="address-book" role="tabpanel" aria-labelledby="address-book-tab">
//                         <h5>My Orders</h5>
//                     </div>
//                     <div className="tab-pane fade" id="payment-options" role="tabpanel" aria-labelledby="payment-options-tab">
//                         <h5>My Transactions</h5>
//                     </div>
//                     <div className="tab-pane fade" id="my-orders" role="tabpanel" aria-labelledby="my-orders-tab">
//                         <h5>My Shipment</h5>
//                     </div>
//                 </div> */}
//             </Col>

//             <Row>
//                 <Col md={3} className="px-4 py-4 d-none d-md-block">
//                     <div className="mb-4">
//                         <h5 className="mb-4">Account Summary</h5>
//                         <ul className="list-unstyled">
//                             <li className="px-3 py-3 rounded bg-success bg-opacity-50 hover-bg-success" style={{ cursor: "pointer" }}>
//                                 <a href="#profile" className="text-decoration-none text-dark">My Profile</a>
//                             </li>
//                             <li className="px-3 py-3 rounded hover-bg-success" style={{ cursor: "pointer" }}>
//                                 <a href="#address-book" className="text-decoration-none text-dark">My Orders</a>
//                             </li>
//                             <li className="px-3 py-3 rounded hover-bg-success" style={{ cursor: "pointer" }}>
//                                 <a href="#payment-options" className="text-decoration-none text-dark">My Transactions</a>
//                             </li>
//                             <li className="px-3 py-3 rounded hover-bg-success" style={{ cursor: "pointer" }}>
//                                 <a href="#payment-options" className="text-decoration-none text-dark">My Shipments</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </Col>


//                 <Col md={9} className="bg-light p-5 rounded shadow-sm mb-4 border border-light border-2 position-relative">
//                     <h4 className="mb-4 text-success">Edit Your Profile</h4>
//                     <Alert
//                         variant={alertVariant}
//                         show={showAlert}
//                         style={{
//                             position: 'fixed',
//                             top: '10%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             zIndex: 1000
//                         }}
//                     >
//                         {alertMessage}
//                     </Alert>
//                     <Row className="mb-3 gx-5">
//                         <Col md={3}>
//                             <div className="mb-4 bg-light text-center">
//                                 <img
//                                     id="profile-img"
//                                     src={user.profilePicture || "https://via.placeholder.com/150"}
//                                     alt="Profile"
//                                     className="rounded-circle border py-3 px-3 img-fluid"
//                                     style={{ width: "150px", height: "150px", objectFit: "cover" }}
//                                 /> <br />
//                                 <label className="btn btn-outline-success btn-sm mt-3">
//                                     {t("profile.uploadPicture")}
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                         className="d-none"
//                                     />
//                                 </label>
//                             </div>
//                         </Col>

//                         <Col md={9}>
//                             <Form onSubmit={handleSubmit}>
//                                 <Row>
//                                     <Col md={12}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>{t("profile.fullName")}</Form.Label>
//                                             <Form.Control type="text"
//                                                 name="fullName"
//                                                 className="form-control"
//                                                 value={formData.fullName}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Phone Number</Form.Label>
//                                             <Form.Control type="text"
//                                                 name="phoneNumber"
//                                                 className="form-control"
//                                                 value={formData.phoneNumber}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>{t("profile.email")}</Form.Label>
//                                             <Form.Control
//                                                 type="email"
//                                                 name="email"
//                                                 className="form-control"
//                                                 value={formData.email}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Form.Group className="mb-3 position-relative">
//                                     <Form.Label>{t("profile.address")}</Form.Label>
//                                     <Form.Control
//                                         name="address"
//                                         className="form-control"
//                                         rows="3"
//                                         value={formData.address}
//                                         onChange={(e) => {
//                                             handleChange(e);
//                                             fetchAddressSuggestions(e.target.value, "address");
//                                         }}
//                                     />
//                                     {suggestions.address && suggestions.address.length > 0 && (
//                                         <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1050 }}>
//                                             {suggestions.address.map((suggestion, index) => (
//                                                 <li
//                                                     key={index}
//                                                     className="list-group-item list-group-item-action"
//                                                     onClick={() => {
//                                                         setFormData((prevData) => ({
//                                                             ...prevData,
//                                                             address: suggestion.displayName,
//                                                         }));
//                                                         setSuggestions((prev) => ({ ...prev, address: [] }));
//                                                     }}
//                                                 >
//                                                     {suggestion.displayName}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     )}
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>{t("profile.bio")}</Form.Label>
//                                     <Form.Control name="bio"
//                                         className="form-control"
//                                         rows="3"
//                                         value={formData.bio}
//                                         onChange={handleChange} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3 d-flex justify-content-end">
//                                     <Button type="submit" variant="success" className="w-50 ">
//                                         {t("profile.saveChanges")}
//                                     </Button>
//                                 </Form.Group>

//                             </Form>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <h4 className="mb-3 text-success">{t("profile.bankDetails")}</h4>
//                         <a href="https://docs.google.com/document/d/1AViIna3B8tHU7kk_sEHDod9LanB9MerP/edit#heading=h.gjdgxs"><p className="mb-3">I agree to DashMe Africa T&Cs</p></a>
//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>{t("profile.accountName")}</Form.Label>
//                                 <Form.Control type="text"
//                                     name="accountName"
//                                     id="accountName"
//                                     className="form-control"
//                                     placeholder="Will display after acc. no is verified"
//                                     value={formData.accountName}
//                                     onChange={handleChange}
//                                     disabled={isVerified}
//                                     readOnly />
//                             </Form.Group>
//                         </Col>
//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label htmlFor="accountNumber">{t("profile.accountNumber")}</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="accountNumber"
//                                     id="accountNumber"
//                                     className="form-control"
//                                     value={formData.accountNumber}
//                                     onChange={handleChange}
//                                     disabled={isVerified} />
//                             </Form.Group>
//                         </Col>
//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label htmlFor="bankName">{t("profile.bankName")}</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="bankName"
//                                     id="bankName"
//                                     className="form-control"
//                                     value={formData.bankName}
//                                     onChange={handleChange}
//                                     disabled={isVerified} />
//                                 {filteredBanks.length > 0 && (
//                                     <ul className="list-group mt-1">
//                                         {filteredBanks.map((bank) => (
//                                             <li
//                                                 key={bank.code}
//                                                 className="list-group-item"
//                                                 onClick={() => handleSelectBank(bank.name)}
//                                                 style={{ cursor: "pointer" }}
//                                             >
//                                                 {bank.name}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </Form.Group>
//                             <button type="button" onClick={verifyBankDetails} className="btn btn-success" disabled={isVerified}>
//                                 {isVerified ? `${t("profile.verified")}` : `${t("profile.verify")}`}
//                             </button>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default AccountSummary;