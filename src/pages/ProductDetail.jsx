// src/pages/ProductDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../components/contexts/CartContext";
import API from "../utils/api";


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.info("Please login first");

    try {
      await addToCart({
        productId: product._id,
        quantity,
        customText,
      });
      toast.success("Added to cart!");
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      toast.error("Could not add to cart");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back to Products link */}
      <Link
        to="/products"
        className="text-blue-600 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-white p-6 rounded-xl shadow">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={
              product.imageUrl?.startsWith("http")
                ? product.imageUrl
                : `${process.env.REACT_APP_API_URL.replace("/api", "")}${product.imageUrl}`
            }
            alt={product.name}
            className="w-full max-w-md h-80 object-cover rounded-lg shadow-lg mx-auto"
          />

        </div>

        {/* Product Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4">₹{product.price}</p>

          {/* Quantity & Custom Text */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-2 w-24 text-center"
            />
            <input
              type="text"
              placeholder="Custom Text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
