import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/authProvider.jsx";
import Home from "./pages/Home.jsx";
import "./css/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Home />
    </AuthProvider>
  </StrictMode>
);
