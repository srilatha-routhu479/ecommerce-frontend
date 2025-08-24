// src/components/Navbar.jsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUserCircle, FaHeart } from "react-icons/fa";
import { useCart } from "../components/contexts/CartContext";
import { useWishlist } from "../components/contexts/WishlistContext";

// ✅ Safe helper for parsing localStorage user
const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored || stored === "undefined" || stored === "null") return null;
    return JSON.parse(stored);
  } catch (err) {
    console.error("Invalid user JSON in localStorage:", err);
    localStorage.removeItem("user"); // clear bad value
    return null;
  }
};

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  // ✅ keep user in sync with localStorage
  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const userName = user?.name;
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-rose-500 tracking-wide">
          Stylenest
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-semibold"
                : "text-gray-700 hover:text-rose-400 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-rose-500 font-semibold"
                : "text-gray-700 hover:text-rose-400 transition"
            }
          >
            Shop
          </NavLink>

          {/* Show My Orders only when logged in */}
          {isLoggedIn && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-rose-500 font-semibold"
                  : "text-gray-700 hover:text-rose-400 transition"
              }
            >
              My Orders
            </NavLink>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-rose-400 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-xs text-white rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-xl text-gray-700 hover:text-rose-400 transition" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-xs text-white rounded-full px-2">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center text-gray-700 hover:text-rose-400 transition"
              >
                <FaUserCircle className="text-2xl" />
                {userName && <span className="ml-2 font-medium">{userName}</span>}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-md w-44 z-10">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Orders
                  </Link>

                  {isAdmin && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/admin/create-product"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        Create Product
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 bg-rose-500 text-white hover:bg-rose-600 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-rose-500 px-4 py-1.5 rounded-lg text-white font-medium hover:bg-rose-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
