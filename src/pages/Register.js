// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { saveAuth } from "../utils/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/users/register", form);
      // ✅ Save token + user
      saveAuth(res.data.token, res.data.user);

      navigate("/"); // redirect home after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-fuchsia-600 text-white py-2 rounded-md hover:bg-fuchsia-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-fuchsia-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

