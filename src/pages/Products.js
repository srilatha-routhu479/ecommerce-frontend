import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";

// ✅ Strip `/api` so we have clean base URL
const BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");

        const res = await API.get(
          category ? `/products?category=${category}` : "/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={
                  product.imageUrl?.startsWith("http")
                    ? product.imageUrl
                    : `${BASE_URL}${product.imageUrl.startsWith("/") ? product.imageUrl : "/" + product.imageUrl}`
                }
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
              />
              <h2 className="mt-2 font-semibold">{product.name}</h2>
              <p className="text-gray-600">₹{product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="mt-2 inline-block bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
