import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [primaryImage, setPrimaryImage] = useState(null); // State for the primary image
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const buyNowHandler = () => {
    if (!product) return;
    navigate('/checkout', { state: { product, sellerId: product.uploader._id } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/products/${id}`);
        setProduct(data);
        setPrimaryImage(data.primaryImage); // Initialize the primary image
        console.log(data);

        const relatedProductsResponse = await axios.get(`${apiURL}/myProducts?uploader=${data.uploader._id}`);
        setRelatedProducts(relatedProductsResponse.data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (img) => {
    setPrimaryImage(img); // Update the primary image
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center my-5">{error}</Alert>;
  }

  return (
    product && (
      <div className="container my-5">
        <div className="row">
          {/* Left Column: Product Images */}
          <div className="col-md-6">
            <div className="d-flex">
              {/* Thumbnails on the left */}
              <div
                className="thumbnails d-flex flex-column me-3 overflow-auto border rounded"
                style={{
                  maxHeight: '400px', // Limit the height for scrolling
                  overflowY: 'auto',
                }}
              >
                {product.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`img-thumbnail mb-2 ${primaryImage === img ? 'border-primary shadow-sm' : ''}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      cursor: 'pointer',
                      objectFit: 'cover',
                    }}
                    onClick={() => handleThumbnailClick(img)} // Handle thumbnail click
                  />
                ))}
              </div>

              {/* Primary image */}
              <div className="primary-image">
                <img
                  src={primaryImage}
                  alt={product.title}
                  className="img-fluid border"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="col-md-6">
            <h2 className="mb-3">{product.title}</h2>
            <p>
              <strong>User Profile: </strong>
              <Badge bg="info">{product.uploader.username || 'Unknown'}</Badge>
            </p>
            <p>
              <strong>Availability: </strong>
              <Badge bg={product.availability ? 'success' : 'danger'}>
                {product.availability ? 'Available' : 'Out of Stock'}
              </Badge>
            </p>
            <p>
              <strong>Description: </strong>
              {product.description}
            </p>

            {product.tag === 'For sale' ? (
              <h4 className="text-success">N {product.price}</h4>
            ) : (
              <h4 className="text-primary">Donate</h4>
            )}

            <div className="d-flex mt-4">
              <Button variant="secondary" className="me-2">
                Message Profile
              </Button>
              {product.tag === 'For sale' ? (
                <Button variant="success" className="ms-2" onClick={buyNowHandler}>Buy Now</Button>
              ) : (
                <Button variant="success" className="ms-2" onClick={buyNowHandler}>Receive Now</Button>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products mt-5">
          <h4 className="mb-4">Other Items from {product.uploader.username || 'this user'}</h4>
          <div className="d-flex overflow-auto">
            {relatedProducts?.map((item, index) => (
              <div key={index} className="me-3" style={{ width: '150px' }}>
                <div className="d-flex gap-2 align-items-baseline">
                  {product.uploader.profilePicture ? (
                    <img
                      src={product.uploader.profilePicture}
                      alt="sellerProfile"
                      className="rounded-circle"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div className="rounded-circle bg-light d-flex justify-content-center border align-items-center" style={{ width: '35px', height: '35px' }}>
                      <FaUser size={20} />
                    </div>

                  )}
                  <p className="text-center mt-2">
                    {product.uploader.username || 'Unknown Seller'}
                  </p>
                </div>

                <Card>
                  <Card.Img
                    src={item.primaryImage}
                    alt={item.title}
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title as="div" className="fs-6">{item.title}</Card.Title>
                    <Card.Text className="text-success">N{item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
