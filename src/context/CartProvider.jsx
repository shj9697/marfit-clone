import { createContext, useContext, useEffect, useState } from "react";
import { addToCartAPI, getCartAPI, productDeleteFromCartAPI, updateCartItemAPI } from "../api/cartapi";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCartAPI();
        console.log(data)
        if (!cancelled) setCart(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const addToCart = async (productId) => {
    setLoading(true);
    const response = await addToCartAPI(productId);
    console.log(response)
    if (response.status) {
      setCart(response.data);
      setLoading(false);
      toast.success("Item added to Cart");
    } else {
      setLoading(false);
      setError(response.message);
      toast.error('There was an error');
    };
  };

  const removeFromCart = async (productId) => {
    const chechQuantity = cart.items.find((cartItems) => cartItems.productId === productId);
    setLoading(true);
    const response = await updateCartItemAPI(productId, chechQuantity.quantity - 1);
    if (response.status) {
      setCart(response.data);
      setLoading(false);
      toast.success('Item removed from cart');
    } else {
      setLoading(false);
      setError(response.message);
      toast.error('There was an error');
    };
  };

  const productDeleteFromCart = async (productId) => {
    setLoading(true);
    const response = await productDeleteFromCartAPI(productId);
    console.log(response)
    if (response.status) {
      setCart(response.data);
      setLoading(false);
      toast.success('Item removed from cart');
    } else {
      setLoading(false);
      setError(response.message);
      toast.error('There was an error');
    };
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
