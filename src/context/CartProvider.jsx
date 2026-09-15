import { createContext, useContext, useEffect, useState } from "react";
import { addToCartAPI, getCartAPI, productDeleteFromCartAPI, updateCartItemAPI } from "../api/cartapi";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const cartData = await getCartAPI();
        if (!cancelled) setCart(cartData.data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user]);

  const addToCart = async (productId) => {
    setLoading(true);
    try {
      const response = await addToCartAPI(productId, 1);
      if (response.status) {
        setCart(response.data);
        toast.success("Item added to Cart");
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
      toast.error('There was an error');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    const checkQuantity = cart.items.find((cartItems) => cartItems.productId === productId);
    setLoading(true);
    try {
      const response = await updateCartItemAPI(productId, checkQuantity?.quantity - 1);
      if (response.status) {
        setCart(response.data);
        toast.success('Item removed from cart');
      }
    } catch (err) {
      setError(err.message);
      toast.error('There was an error');
    } finally {
      setLoading(false);
    }
  };

  const productDeleteFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await productDeleteFromCartAPI(productId);
      if (response.status) {
        setCart(response.data);
        toast.success('Item removed from cart');
      }
    } catch (err) {
      setError(err.message);
      toast.error('There was an error');
    } finally {
      setLoading(false);
    }
  };

  const value = { cart, addToCart, removeFromCart, productDeleteFromCart, cartLoading: loading, cartError: error };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
