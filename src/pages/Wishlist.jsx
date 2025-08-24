import React from "react";
import { useWishlist } from "../components/contexts/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";  


export default function Wishlist() {
  const { wishlist, toggle } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
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
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty 💔</h1>
            <p className="text-gray-600">Save items you love to view them later.</p>
            <Link
              to="/products"
              className="mt-4 inline-block px-6 py-2 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => {
            // ✅ FIX IMAGE PATH
            const src = product.imageUrl || product.image;
            const image = src?.startsWith("http")
              ? src
              : `${API.defaults.baseURL.replace("/api", "")}${src}`;

            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                />
                <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>

                <div className="mt-3 flex gap-2">
                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => toggle(product)}
                  >
                    Remove
                  </button>
                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 text-center bg-fuchsia-600 text-white py-2 rounded-lg hover:bg-fuchsia-700"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
