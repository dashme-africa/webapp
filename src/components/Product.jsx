import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  // Base URL for image (adjust based on your server's actual URL)
  // const imageUrl = `http://localhost:5000/${product.image}`;
  // Directly use the Cloudinary URL stored in the product object
  const imageUrl = product.image;  // This should be the Cloudinary URL now

  console.log(imageUrl)

  return (
    <Card className="my-4 border-0">
      <a href={`/product/${product._id}`}>
        {/* Enforce consistent image height */}
        <Card.Img
          src={imageUrl}
          variant="top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div" className="product-price">
            <p>{`N${product.price}`}</p>
          </Card.Text>
          <Card.Text as="div" className="product-location">
            <p>{`${product.location}`}</p>
          </Card.Text>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;
