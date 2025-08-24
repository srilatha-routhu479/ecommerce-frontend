// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../components/contexts/WishlistContext";
import { useCart } from "../components/contexts/CartContext";
import API from "../utils/api"; // ✅ central axios instance

// ✅ Env vars
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const { toggle, isWished } = useWishlist();
  const { addToCart } = useCart();

  // ✅ get category from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products"); // ✅ no hardcoded localhost
        let data = res.data || [];

        // if category present, filter it
        if (category) {
          data = data.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
          );
        }

        setProducts(res.data || []);
        setFiltered(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [category]);

  // search (only if no category filter)
  useEffect(() => {
    if (!category) {
      let result = products;
      if (search) {
        result = result.filter((p) =>
          (p.name || "").toLowerCase().includes(search.toLowerCase())
        );
      }
      setFiltered(result);
    }
  }, [search, products, category]);

  return (
    <div className="w-full h-full mx-auto px-4 py-16 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200">
      {/* ✅ Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {category ? `${category} Collection` : "Products"}
      </h1>

      {/* ✅ show search box only if no category */}
      {!category && (
        <div className="mb-6 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {/* PRODUCT GRID */}
      <div
        className={`grid gap-6 ${
          category
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {filtered.map((p) => {
          // ✅ build correct image path
          const imageUrl = p.image ? `${API_URL}${p.image}` : "/placeholder.png";

          return (
            <div
              key={p._id}
              className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 rounded-xl p-1 shadow-md transform transition duration-200 hover:scale-[1.04] hover:shadow-xl"
            >
              <div className="bg-white rounded-lg p-3 h-full flex flex-col">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={p.name || "Product"}
                    className="w-full h-40 object-cover rounded-md"
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className={`absolute top-2 right-2 p-2 rounded-full shadow ${
                      isWished(p._id)
                        ? "bg-red-500 text-white"
                        : "bg-white text-red-500"
                    }`}
                    onClick={() => toggle(p)}
                    aria-label="Toggle wishlist"
                  >
                    <FaHeart />
                  </button>
                </div>

                {/* ✅ Always show info (category or not) */}
                <h3 className="mt-2 font-semibold text-gray-800">
                  {p.name || "Unnamed"}
                </h3>
                <p className="text-sm text-gray-500">
                  {p.description?.slice(0, 40) || "No description"}...
                </p>
                <p className="mt-1 font-bold text-gray-700">
                  ₹{p.price ?? "N/A"}
                </p>

                <div className="mt-auto flex gap-2">
                  <Link
                    to={`/products/${p._id}`}
                    className="flex-1 text-center px-3 py-2 rounded-md text-white bg-amber-600 hover:bg-orange-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
