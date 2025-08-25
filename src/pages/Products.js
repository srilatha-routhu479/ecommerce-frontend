// src/pages/Products.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Load images from frontend/public/images
  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png"; // fallback if no image
    return image.startsWith("http")
      ? image
      : `/images/${image.replace("/images/", "")}`;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500 mb-2">
                  {product.description || "No description"}
                </p>
                <p className="text-xl font-bold text-blue-600">
                  ₹{product.price}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
