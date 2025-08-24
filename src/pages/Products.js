// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            // ✅ Fix image path (same style as Checkout.jsx)
            const imageUrl = product.image?.startsWith("http")
              ? product.image
              : `${process.env.REACT_APP_API_URL.replace("/api", "")}${product.image}`;

            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <Link to={`/products/${product._id}`}>
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600 mt-1">₹{product.price}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


