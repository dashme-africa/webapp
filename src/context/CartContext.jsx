// import React, { createContext, useReducer, useContext } from "react";

// const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//      case "ADD_TO_CART":
//         console.log("State before:", state);
//         console.log("Adding:", action.payload);
//         return [...state, action.payload]; // Ensure this is the expected structure
//      default:
//         return state;
//   }
// };


// export const CartProvider = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, []);
//   console.log("Cart state in provider:", cart); // Log to check updates

//   const addToCart = (product) => {
//     dispatch({ type: "ADD_TO_CART", payload: product });
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("State before:", state);
      console.log("Adding:", action.payload);
      return [...state, action.payload];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
    // Try to load the cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initial; // Return parsed cart or initial empty state
  });

  // Persist cart state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // console.log("Cart state in provider:", cart);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
