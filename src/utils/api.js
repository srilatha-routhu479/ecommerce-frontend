import axios from "axios";
import { getToken } from "./auth";

// ✅ Base URL from env, fallback to localhost for dev
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Auto-attach JWT token for protected requests
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
