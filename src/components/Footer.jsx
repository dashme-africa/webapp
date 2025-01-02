import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-5">
      <Container>
        {/* Top Section */}
        <Row className="text-center">
          <Col>
            <h5 className="fw-bold">{t('footer.smilePrompt')}</h5>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <a href="/upload"><Button variant="success" className="mx-2 px-4">{t('footer.sell')}</Button></a>
            <a href="/upload"><Button variant="outline-success" className="mx-2 px-4">{t('footer.donate')}</Button></a>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <a href="/register" className="text-success fw-bold">{t('footer.signupPrompt')}</a>
          </Col>
        </Row>

        <hr className="my-5" />

        {/* Bottom Section */}
        <Row className="text-center text-md-start">
          {/* Logo and Social Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733432001/Frame_5_2_1_iomywh.png" // Replace with your logo URL
              alt={t('footer.logoAlt')}
              className="mb-3"
            />
            <div>
              <a href="https://facebook.com" className="me-3 text-dark">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://tiktok.com" className="text-dark">
                <i className="bi bi-tiktok fs-4"></i>
              </a>
            </div>
          </Col>

          {/* Mission Statement */}
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="fw-bold">{t('footer.missionTitle')}</h6>
            <p className="text-muted">
              {t('footer.missionDescription')}
            </p>
          </Col>

          {/* Nigeria Address */}
          {/* <Col md={4} className="mb-4 mb-md-0">
            <h6 className="fw-bold">{t('footer.waphone')}</h6>
            
          </Col> */}

          {/* UK Address */}
          <Col md={4}>
            <h6 className="fw-bold">{t('footer.email')}</h6>
            <a href="mailto:talktous@dashmeafrica.com " className="text-dark">talktous@dashmeafrica.com </a><br /><br />
            <a href="https://wa.me/message/7J6DBJ5F6ESGB1" className="text-dark ">Having Issues, Need Help? <br />Chat On WhatsApp</a>
          </Col>
        </Row>

        <hr className="mt-5" />

        <Row>
          <Col className="text-center text-muted">
            <small>DashMeAfrica &copy; {currentYear}</small>
            <p>An Andrexa Global Product</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
