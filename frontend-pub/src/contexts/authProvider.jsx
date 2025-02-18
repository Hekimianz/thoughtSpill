import React, { createContext, useState, useEffect, useContext } from "react";
const base_url = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await fetch(`${base_url}/auth/verify-token`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if ([401, 403, 404].includes(response.status)) {
        setUser(null);
      } else {
        console.error(
          "Unexpected token verification failure:",
          response.status
        );
        setUser(null);
      }
    } catch (error) {
      console.error("Token verification network error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${base_url}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        await verifyToken();
      } else if (response.status === 401) {
        throw new Error("Invalid username or password");
      } else {
        throw new Error("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${base_url}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${base_url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await fetch(`${base_url}/auth/account`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete account");
      }

      return await response.json();
    } catch (err) {
      console.error("Error deleting account:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, register, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
