// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-16">
     <div className="flex gap-4 mt-4">
  <a href="https://facebook.com" target="_blank" rel="noreferrer">
    <i className="fab fa-facebook text-xl hover:text-gray-400"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer">
    <i className="fab fa-instagram text-xl hover:text-gray-400"></i>
  </a>
  <a href="https://twitter.com" target="_blank" rel="noreferrer">
    <i className="fab fa-twitter text-xl hover:text-gray-400"></i>
  </a>
</div>


    </footer>
  );
};

export default Footer;
