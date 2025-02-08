import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Button,
	Card,
	Container,
	Row,
	Col,
	Modal,
	Form,
} from "react-bootstrap";
import useUserStore from "../store/user.store";
import { useFetch } from "../api.service";
import { toast } from "sonner";
const apiURL = import.meta.env.VITE_API_URL;

const MyProductsPage = () => {
	const [_, setProducts] = useState([]);
	const products = useUserStore((st) => st.user)?.products;
	const updateProduct = useUserStore((st) => st.updateProduct);
	const deleteproduct = useUserStore((st) => st.removeProduct);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [uploaderId, setUploaderId] = useState(null);

	const handleDelete = async (id) => {
		const res = await useFetch(`/myProducts/delete/${id}`, "DELETE");
		if (!res.ok) return toast.error(res.message);
		toast.success(res.message);
		deleteproduct(id);
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
		setShowModal(true);
	};

	const handleModalClose = () => {
		setEditingProduct(null);
		setShowModal(false);
	};

	const handleModalSave = async () => {
		const { id, ...updatedProduct } = editingProduct;
		const res = await useFetch(`/myProducts/${id}`, "PUT", {
			...updatedProduct,
			price: +updatedProduct.price,
		});

		if (!res.ok) return toast.error(res.message);

		toast.success(res.message);

		updateProduct(res.data);
		handleModalClose();
	};

	if (error) {
		return <div className="text-danger">{error}</div>;
	}

	return (
		<Container className="mt-4">
			<h4 className="text-success mb-3">My Products</h4>
			{products?.length === 0 ? (
				<div className="text-center text-muted">
					<h4>You have not uploaded any product</h4>
				</div>
			) : (
				<Row>
					{products?.map((product) => (
						<Col md={4} className="mb-4" key={product.id}>
							<Card>
								<Card.Img
									variant="top"
									src={product.primaryImage}
									alt={product.title}
								/>
								<Card.Body>
									<Card.Title>{product.title}</Card.Title>
									<Card.Text>{product.description}</Card.Text>
									<Card.Text>
										<strong>Price:</strong> N{product.price}
									</Card.Text>
									<Button
										variant="primary"
										className="me-2"
										onClick={() => handleEdit(product)}
									>
										Edit
									</Button>
									<Button
										variant="danger"
										onClick={() => handleDelete(product.id)}
									>
										Delete
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			)}

			{/* Modal for editing product */}
			<Modal show={showModal} onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{editingProduct && (
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									value={editingProduct.title}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											title: e.target.value,
										})
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									value={editingProduct.description}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											description: e.target.value,
										})
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="number"
									value={editingProduct.price}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											price: e.target.value,
										})
									}
								/>
							</Form.Group>
						</Form>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleModalSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default MyProductsPage;
