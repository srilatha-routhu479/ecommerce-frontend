import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggle = (product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p._id === product._id)) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  // ✅ helper function to check if product is wished
  const isWished = (id) => {
    return wishlist.some((p) => p._id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
