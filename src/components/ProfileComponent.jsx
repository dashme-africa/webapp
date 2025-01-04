// ProfileComponent.jsx
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../custom.css';


const ProfileComponent = ({ user, formData, setFormData, isVerified, setIsVerified, displayAlert, handleSubmit, handleImageChange, suggestions, fetchAddressSuggestions }) => {
  const { t } = useTranslation();

  return (
    <Col md={12} className="bg-light rounded mb-4 border border-light border-2 position-relative">
      <h4 className="mb-4 text-success">{t("profile.editProfile")}</h4>
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
      <Row className="mb-3 gx-5">
        <Col md={3}>
          <div className="mb-4 bg-light text-center">
            <img
              id="profile-img"
              src={user.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle border py-3 px-3 img-fluid"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            /> <br />
            <label className="btn btn-outline-success btn-sm mt-3">
              {t("profile.uploadPicture")}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
              />
            </label>
          </div>
        </Col>

        <Col md={9}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.fullName")}</Form.Label>
                  <Form.Control type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.phoneNumber")}</Form.Label>
                  <Form.Control type="text"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.email")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>{t("profile.address")}</Form.Label>
              <Form.Control
                name="address"
                className="form-control"
                rows="3"
                value={formData.address}
                onChange={(e) => {
                  handleChange(e);
                  fetchAddressSuggestions(e.target.value, "address");
                }}
              />
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("profile.bio")}</Form.Label>
              <Form.Control name="bio"
                className="form-control"
                rows="3"
                value={formData.bio}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 d-flex justify-content-end">
              <Button type="submit" variant="success" className="w-50 ">
                {t("profile.saveChanges")}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Col>
  );
};

export default ProfileComponent;
