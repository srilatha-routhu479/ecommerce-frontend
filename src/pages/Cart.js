import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../components/contexts/CartContext";

const getImageUrl = (url) => {
  if (!url) return "/placeholder.svg";
  return url.startsWith("http") ? url : "/placeholder.svg";
};

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, fetchCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Safely compute totals
  const subtotal = useMemo(() => {
    return (cartItems || []).reduce((acc, item) => {
      const price = item?.product?.price ?? item?.price ?? 0;
      const qty = item?.quantity ?? 1;
      return acc + price * qty;
    }, 0);
  }, [cartItems]);

  const shipping = cartItems?.length ? 50 : 0;
  const total = subtotal + shipping;

  const handleMinus = async (item) => {
    const id = item?._id || item?.id;
    const qty = Math.max(1, (item?.quantity ?? 1) - 1);
    try {
      await updateQuantity(id, qty);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handlePlus = async (item) => {
    const id = item?._id || item?.id;
    const qty = (item?.quantity ?? 1) + 1;
    try {
      await updateQuantity(id, qty);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (item) => {
    const id = item?._id || item?.id;
    try {
      await removeFromCart(id);
      toast.success("Removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600"
          >
            ← Back
          </button>

          <div className="text-center py-12 bg-amber-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">Your cart is empty 🛒</h1>
            <p className="text-gray-600">Let’s find something you’ll love.</p>
            <Link
              to="/products"
              className="mt-4 inline-block px-6 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const key = item?._id || item?.id;
              const product = item?.product || item;
              const name = product?.name || "Product";
              const image = getImageUrl(product?.imageUrl || product?.image);
              const price = product?.price ?? item?.price ?? 0;
              const size = item?.size;
              const color = item?.color;
              const qty = item?.quantity ?? 1;

              return (
                <div
                  key={key}
                  className="flex items-center bg-amber-50 p-4 rounded-lg shadow-md"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      if (e.currentTarget.src.endsWith("/placeholder.svg")) return;
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />

                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-gray-600">₹{price}</p>
                    <div className="text-sm text-gray-500">
                      {size && <span>Size: {size}</span>}
                      {size && color && <span> • </span>}
                      {color && <span>Color: {color}</span>}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => handleMinus(item)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{qty}</span>
                      <button
                        onClick={() => handlePlus(item)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-amber-50 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="mt-6 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

