import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className="my-4 border-0">
      <a href={`/product/${product._id}`}>
        {/* Enforce consistent image height */}
        <Card.Img
          src={product.image}
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
            <p>{`N${product.location}`}</p>
          </Card.Text>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;
