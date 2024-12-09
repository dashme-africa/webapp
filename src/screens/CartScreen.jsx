// import React from "react";
// import { useCart } from "../context/CartContext";

// const CartScreen = () => {
//   const { cart } = useCart();

//   console.log("Cart contents:", cart);

//   return (
//     <div className="container my-5">
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <ul>
//           {cart.map((item, index) => (
//             <li key={index} >
//               <img src={item.image} width={"200px"} alt="" />
//               <p>{item.title}</p> 
//               <p>N{item.price}</p>
//             </li>
//           ))}   
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CartScreen;


import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

const CartScreen = () => {
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();
  const [totals, setTotals] = useState({
    subtotal: 0,
    discount: 0,
    deliveryFee: 15,
    total: 0,
  });

  // Calculate totals dynamically when the cart changes
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = (subtotal * 20) / 100; // 20% discount
    const total = subtotal - discount + totals.deliveryFee;
    setTotals({ subtotal, discount, deliveryFee: totals.deliveryFee, total });
  }, [cart, totals.deliveryFee]);

  const handleQuantityChange = (itemId, delta) => {
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateCartItemQuantity(itemId, newQuantity);
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          <h4>Cart</h4>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="list-group">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                  style={{ border: "none", padding: "20px 0" }}
                >
                  {/* Image and Product Info */}
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "80px", marginRight: "15px" }}
                    />
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="mb-0">Size: {item.size}</p>
                      <p className="mb-0">Color: {item.color}</p>
                    </div>
                  </div>

                  {/* Price and Quantity Controls */}
                  <div className="d-flex align-items-center">
                    <p className="mb-0 me-3">${item.price}</p>
                    <div className="input-group" style={{ width: "100px" }}>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    {/* Remove Item */}
                    <button
                      className="btn btn-link text-danger ms-3"
                      onClick={() => removeCartItem(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </li>
                <li className="d-flex justify-content-between text-danger">
                  <span>Discount (-20%)</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span>Delivery Fee</span>
                  <span>${totals.deliveryFee.toFixed(2)}</span>
                </li>
                <li className="d-flex justify-content-between fw-bold mt-3">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </li>
              </ul>
              <button className="btn btn-success w-100 mt-4">
                Go to Checkout <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

