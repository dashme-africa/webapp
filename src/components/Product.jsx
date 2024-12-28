import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { FaHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Product = ({ product }) => {
  const imageUrl = product.primaryImage;
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

      <Card.Body className="p-0">
        <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
          {/* Title Section */}
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none', color: 'inherit', fontWeight: '400' }}
            className="product-title"
          >
            <Card.Title as="div">
              <strong>{product.title}</strong>
            </Card.Title>
          </Link>

          {/* Love Icon */}
          {/* <FaHeart size={25} style={{ color: "grey", cursor: "pointer" }} /> */}
        </div>

        {/* Price */}
        {product.tag === 'For sale' && (
          <Card.Text
            as="div"
            className="product-price mb-1"
            style={{ color: '#71033F' }}
          >
            <p className="mb-0">{`N${product.price}`}</p>
          </Card.Text>
        )}

        {/* Location */}
        <Card.Text
          as="div"
          className="product-location d-flex justify-content-between align-items-center mb-1"
        >
          <p className="mb-0 me-auto fs-6">{`${product.location}`}</p>
        </Card.Text>

        {/* Button */}
        <Button variant="success" className="text-white">
          {product.tag === 'For sale' ? t('product.tagSell') : t('product.donate')}
        </Button>
      </Card.Body>



    </Card>
  );
};

export default Product;
