// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { FaShippingFast, FaHeadset, FaUndo, FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative mt-6 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left side text */}
        <div className="text-left flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Welcome to <span className="text-teal-500">Stylenest</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-md">
            Discover trendy outfits, chic handbags & stylish footwear all in one place. 
            Elevate your fashion game with hand-picked collections designed for comfort, 
            elegance, and everyday style.
          </p>
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md">
            From casual wear to statement pieces, we bring you fashion that fits your lifestyle.
          </p>
          <Link
  to="/products"
  className="inline-flex items-center justify-center mt-8 px-4 py-2 bg-teal-500 text-white text-lg font-semibold rounded-full shadow hover:bg-teal-600 transition"
>
  Shop Now
</Link>
        </div>

        {/* Right side image */}
        <div className="flex justify-center">
          <img
            src="/images/hero.jpg"
            alt="Hero fashion"
            className="rounded-2xl shadow-xl w-full max-w-lg h-[460px] object-cover object-center"
          />
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Shop by Collection</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Handbags */}
            <Link
              to="/products?category=handbags"
              className="group block bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src="/images/handbag1.jpg"
                alt="Handbags"
                className="rounded-lg mb-4 w-full h-56 object-cover group-hover:scale-105 transition"
              />
              <h3 className="text-lg font-semibold text-gray-700">Handbags</h3>
            </Link>

            {/* Footwear */}
            <Link
              to="/products?category=footwear"
              className="group block bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src="/images/shoes.jpg"
                alt="Footwear"
                className="rounded-lg mb-4 w-full h-56 object-cover group-hover:scale-105 transition"
              />
              <h3 className="text-lg font-semibold text-gray-700">Footwear</h3>
            </Link>

            {/* Outfits */}
            <Link
              to="/products?category=outfits"
              className="group block bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src="/images/outfit1.jpg"
                alt="Outfits"
                className="rounded-lg mb-4 w-full h-56 object-cover group-hover:scale-105 transition"
              />
              <h3 className="text-lg font-semibold text-gray-700">Outfits</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-14 bg-gradient-to-r from-indigo-50 via-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {/* Card style badges */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <FaShippingFast className="text-3xl text-indigo-600 mb-3" />
            <p className="font-semibold text-gray-800">Fast Delivery</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <FaHeadset className="text-3xl text-pink-600 mb-3" />
            <p className="font-semibold text-gray-800">24/7 Support</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <FaUndo className="text-3xl text-green-600 mb-3" />
            <p className="font-semibold text-gray-800">Easy Returns</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <FaStar className="text-3xl text-yellow-500 mb-3" />
            <p className="font-semibold text-gray-800">Top Quality</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-10 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">About Us</h4>
            <p className="text-sm text-gray-400">
              Stylenest brings you the latest trends in fashion with a focus on quality and style.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Contact</h4>
            <p className="text-sm text-gray-400">Email: support@stylenest.com</p>
            <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Stylenest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
