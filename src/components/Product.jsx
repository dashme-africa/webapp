import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  // Assuming your backend serves images from 'http://localhost:5000/uploads/'
  // const imageUrl = `https://dashmeafrica.onrender.com/uploads/${product.image}`;
  // const imageUrl = `http://localhost:5000/${product.image}`;
  // const imageUrl = product.image;

  return (
    <Card className="my-3 p-3 rounded">
      {/* <a href={`/product/${product._id}`}> */}
        <Card.Img src={product.image} variant="top" />
        <strong>{product.image}</strong>

      {/* </a> */}

      <Card.Body>
        <div href={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
            <strong>{product.image}</strong>
          </Card.Title>
          <Card.Text as="div" className="product-price">
          <strong>{"N"+product.price}</strong>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
