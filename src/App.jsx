import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Welcome from "./components/Welcome.jsx";
import Shop from "./components/Shop.jsx";
import ProductPage from "./components/ProductPage.jsx";
import NotFound from "./components/NotFound.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import PageTransition from "./components/PageTransition.jsx";

export default function App() {
  const location = useLocation();

  // If user already visited, redirect '/' to /shop on load
  const visited = typeof window !== "undefined" && localStorage.getItem("visited");

  return (
    <Layout>
      {/* pass location.pathname as pageKey (not key) */}
      <PageTransition pageKey={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={visited ? <Navigate to="/shop" replace /> : <Welcome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CartDrawer />
      </PageTransition>
    </Layout>
  );
}
