// import React, { createContext, useContext, useState } from 'react';

// // Create a context for the cart
//  export const CartContext = createContext();

// // Custom hook to use the CartContext
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     const productKey = `${product.id}-${product.firmId}`; 
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.productKey === productKey);
//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.productKey === productKey ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1, productKey }];
//       }
//     });
//   };

//   const incrementQuantity = (productKey) => {
//     setCartItems((prevItems) => {
//       const updatedItems = prevItems.map((item) =>
//         item.productKey === productKey ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       return updatedItems;
//     });
//   };

//   const decrementQuantity = (productKey) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.productKey === productKey ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeFromCart = (productKey) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.productKey !== productKey));
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, incrementQuantity, decrementQuantity, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, firmName) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.product._id === product._id && item.firmName === firmName
      );
      if (existingProduct) {
        return prevItems.map((item) =>
          item.product._id === product._id && item.firmName === firmName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, firmName, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== productId)
    );
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.max(item.quantity + quantity, 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
