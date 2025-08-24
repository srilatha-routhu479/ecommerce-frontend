import axios from "axios";
import { getToken } from "./auth";

// ✅ Use env var if available, otherwise fallback to localhost
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Attach token automatically for protected routes
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
