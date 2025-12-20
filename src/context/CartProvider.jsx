import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
    }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart () {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
