// import { Card, Button } from 'react-bootstrap';

// const Product = ({ product }) => {
//   const imageUrl = product.image;  // This should be the Cloudinary URL now

//   console.log(imageUrl)

//   return (
//     <Card className="my-4 border-0">
//       <a href={`/product/${product._id}`}>
//         {/* Enforce consistent image height */}
//         <Card.Img
//           src={imageUrl}
//           variant="top"
//           style={{ height: '200px', objectFit: 'cover' }}
//         />
//       </a>

//       <Card.Body>
//         <a href={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//           <Card.Title as="div" className="product-title">
//             <strong>{product.title}</strong>
//           </Card.Title>
//           {product.tag === 'sell' && (
//             <Card.Text as="div" className="product-price">
//               <p>{`N${product.price}`}</p>
//             </Card.Text>
//           )}
//           <Card.Text as="div" className="product-location">
//             <p>{`${product.location}`}</p>
//             <Button variant="success" className="text-white text-end">
//               {`${product.tag}`}
//             </Button>

//           </Card.Text>
//         </a>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Product;


import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link

const Product = ({ product }) => {
  const imageUrl = product.image; // This should be the Cloudinary URL now

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
              {`${product.tag}`}
            </Button>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
