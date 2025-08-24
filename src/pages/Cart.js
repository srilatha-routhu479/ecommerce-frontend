import React, { useEffect, useState } from "react";
import { useCart } from "../components/contexts/CartContext";
import API from "../api";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Cart() {
  const { cart, fetchCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
      setLoading(false);
    };
    loadCart();
  }, [fetchCart]);

  if (loading) return <p className="pt-24 text-center">Loading cart...</p>;

  if (!cart.length) {
    return <div className="pt-24 text-center">🛒 Your cart is empty</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Cart</h1>
        {cart.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center gap-4"
          >
            <img
              src={
                item.product?.imageUrl?.startsWith("http")
                  ? item.product.imageUrl
                  : `${BASE_URL.replace("/api", "")}${item.product?.imageUrl}`
              }
              alt={item.product?.name}
              className="w-24 h-24 object-cover rounded-md"
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.product?.name}</h2>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => removeFromCart(item.product?._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
