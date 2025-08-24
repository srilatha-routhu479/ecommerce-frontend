import React, { useEffect, useState } from "react";
import { useCart } from "../components/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, fetchCart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (err) {
        console.error("❌ Error loading cart:", err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [fetchCart]);

  if (loading) return <div className="p-10">Loading your cart...</div>;

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600"
          >
            ← Back
          </button>

          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">Your cart is empty 🛒</h1>
            <p className="text-gray-600">Add some products to continue shopping.</p>
            <Link
              to="/products"
              className="mt-4 inline-block px-6 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6">My Cart 🛒</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {cart.items.map((item) => {
              const src = item.product?.imageUrl || item.product?.image || "";
              const image = src.startsWith("http")
                ? src
                : `${process.env.REACT_APP_API_URL}${src}`;

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b py-4"
                >
                  <img
                    src={image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-600">₹{item.product.price}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-gray-300 rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <p className="text-lg">
              Total: <span className="font-semibold">₹{total}</span>
            </p>
            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

