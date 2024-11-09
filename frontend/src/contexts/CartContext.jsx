
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
