import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ContactToggle from "./ContactToggle.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactToggle />
    </div>
  );
}
