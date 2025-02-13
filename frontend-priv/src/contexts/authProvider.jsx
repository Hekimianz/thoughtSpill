import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/verify-token", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.isAdmin) {
          setUser(data);
        }
      } else if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404 ||
        !data.isAdmin
      ) {
        setUser(null);
      } else {
        console.error(
          "Token verification failed with status:",
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
      const response = await fetch("http://localhost:3000/auth/login-admin", {
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

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
