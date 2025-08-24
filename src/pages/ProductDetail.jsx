import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useCart } from "../components/contexts/CartContext";
import { useWishlist } from "../components/contexts/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggle, wishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10">Loading product...</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  const inWishlist = wishlist.some((item) => item._id === product._id);

  const src = product.imageUrl || product.image || "";
  const image = src.startsWith("http")
    ? src
    : `${process.env.REACT_APP_API_URL}${src}`;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-md"
            onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold mb-6">₹{product.price}</p>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product._id)}
                className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggle(product)}
                className={`flex-1 py-2 rounded-lg ${
                  inWishlist
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                }`}
              >
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
