import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);

// ✅ Use env var (fallback to localhost in dev)
const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getToken = () => localStorage.getItem("token");

  const buildAuth = () => {
    const token = getToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  // 🔹 Fetch cart
  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }
    try {
      const res = await axios.get(`${API}/cart`, buildAuth());
      console.log("✅ Raw fetchCart response:", res.data);
      const items = res.data?.items || [];
      setCartItems(items);
      setCartCount(items.length);
    } catch (e) {
      console.error("❌ fetchCart failed:", e.response?.data || e.message);
    }
  };

  // 🔹 Add item to cart
  const addToCart = async ({
    productId,
    quantity = 1,
    size,
    color,
    customText = "",
  }) => {
    const token = getToken();
    if (!token) throw new Error("Please login first");

    try {
      await axios.post(
        `${API}/cart/add`,
        { productId, quantity, size, color, customText },
        buildAuth()
      );
      fetchCart();
    } catch (e) {
      console.error("❌ addToCart failed:", e.response?.data || e.message);
      throw e;
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (cartItemId, quantity) => {
    const token = getToken();
    if (!token) return;
    try {
      await axios.patch(`${API}/cart/${cartItemId}`, { quantity }, buildAuth());
      fetchCart();
    } catch (e) {
      console.error("❌ updateQuantity failed:", e.response?.data || e.message);
    }
  };

  // 🔹 Remove item
  const removeFromCart = async (cartItemId) => {
    const token = getToken();
    if (!token) return;
    try {
      await axios.delete(`${API}/cart/${cartItemId}`, buildAuth());
      fetchCart();
    } catch (e) {
      console.error("❌ removeFromCart failed:", e.response?.data || e.message);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    cartItems,
    cartCount,
    setCartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

