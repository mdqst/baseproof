import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { createThirdwebClient, defineChain } from "thirdweb";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const client = createThirdwebClient({ clientId: clientId || "NO_CLIENT_ID" });
const baseSepolia = defineChain(84532);

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <Link
            to="/"
            style={{ fontWeight: 600, fontSize: 18, color: "#111" }}
          >
            BaseProof
          </Link>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Link to="/profile" style={{ color: "#2563eb" }}>
              Profile
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
