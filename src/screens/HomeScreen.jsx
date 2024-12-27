import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Product from '../components/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';
const apiURL = import.meta.env.VITE_API_URL;

const HomeScreen = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const endpoint = selectedCategory
          ? `${apiURL}/products/?category=${selectedCategory}`
          : `${apiURL}/products`;

        const { data } = await axios.get(endpoint);
        const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory]);

  return (
    <>
      <Row className="align-items-center mb-1 mt-5 px-5">
        <Col>
          <h4 className="mb-0">{selectedCategory ? t(selectedCategory) : t("home.recommended")}</h4>
        </Col>
        <Col className="text-end">
          <Link to="/products" className="text-success fs-5 text-decoration-none">
            {t("home.seeAll")}
          </Link>
        </Col>
      </Row>

      <Row className="px-5">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;


