import React from "react";
import { useCart } from "../context/CartContext";

const CartScreen = () => {
  const { cart } = useCart();

  console.log("Cart contents:", cart);

  return (
    <div className="container my-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} >
              <img src={item.image} width={"200px"} alt="" />
              <p>{item.title}</p> 
              <p>N{item.price}</p>
            </li>
          ))}   
        </ul>
      )}
    </div>
  );
};

export default CartScreen;
