import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Product from "../components/Product";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useFetch } from "../api.service";

const apiURL = import.meta.env.VITE_API_URL;

const HomeScreen = ({ selectedCategory }) => {
	const [products, setProducts] = useState([]);
	const { t } = useTranslation();
	const productsSectionRef = useRef(null);

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			const endpoint = selectedCategory
				? `/products/?category=${selectedCategory}`
				: `/products`;

			const res = await useFetch(endpoint);
			if (!res.ok) return toast.error(res.message);
			// console.log(res);
			setProducts(res.data);

			// Scroll to the product section
			if (productsSectionRef.current) {
				productsSectionRef.current.scrollIntoView({ behavior: "smooth" });
			}
		};

		fetchCategoryProducts();
	}, [selectedCategory]);

	return (
		<>
			<Row
				className="align-items-center mb-1 mt-5 px-5"
				ref={productsSectionRef}
			>
				<Col>
					<h4 className="mb-0">
						{selectedCategory ? t(selectedCategory) : t("home.recommended")}
					</h4>
				</Col>
			</Row>

			<Row className="px-5">
				{products.length > 0 ? (
					products.map((product) => (
						<Col key={product.id} sm={12} md={6} lg={4} xl={2}>
							<Product product={product} />
						</Col>
					))
				) : (
					<Col>
						<h3 className="text-center mt-5 mb-5">{t("noProduct")}</h3>
					</Col>
				)}
			</Row>
		</>
	);
};

export default HomeScreen;
