import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authProvider.jsx";
import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
