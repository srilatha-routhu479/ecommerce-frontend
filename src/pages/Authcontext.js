import React, { createContext, useContext, useState } from "react";
import API from "../utils/api";
import { saveAuth, getUser, logout } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = async (email, password) => {
    try {
      const { data } = await API.post("/users/login", { email, password });
      saveAuth(data.user, data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/users/register", { name, email, password });
      saveAuth(data.user, data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("❌ Register failed:", err.response?.data || err.message);
      return false;
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
