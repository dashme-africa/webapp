import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Product = ({ product }) => {
  const imageUrl = product.image;
  const { t } = useTranslation();

  return (
    <Card className="my-4 border-0">
      {/* Wrap image in Link for navigation */}
      <Link to={`/product/${product._id}`}>
        {/* Enforce consistent image height */}
        <Card.Img
          src={imageUrl}
          variant="top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>

      <Card.Body>
        {/* Wrap title in Link for navigation */}
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Title as="div" className="product-title">
            <strong>{product.title}</strong>
          </Card.Title>
          {product.tag === 'sell' && (
            <Card.Text as="div" className="product-price">
              <p>{`N${product.price}`}</p>
            </Card.Text>
          )}
          <Card.Text as="div" className="product-location">
            <p>{`${product.location}`}</p>
            <Button variant="success" className="text-white text-end">
              {product.tag === 'sell' ? t('product.tagSell') : t('product.donate')}
            </Button>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
