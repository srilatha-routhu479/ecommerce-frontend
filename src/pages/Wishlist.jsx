import React from "react";
import { useWishlist } from "../components/contexts/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <h2 className="text-center mt-6">Your wishlist is empty ❤️</h2>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item._id} className="border rounded-xl shadow p-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">₹{item.price}</p>
          <button
            onClick={() => removeFromWishlist(item._id)}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded-lg"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
