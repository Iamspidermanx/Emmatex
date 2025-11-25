import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSun, FiMoon } from "react-icons/fi";
import useCartStore from "./stores/useCartStore.jsx";

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const uniqueCount = items.length; // total unique products in cart

  const [dark, setDark] = useState(false);

  /* ---------------------------
     INITIALIZE THEME CORRECTLY
     --------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  }

  return (
    <header
      className="
        sticky top-0 z-40 transition-colors duration-300
        bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300/90
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        shadow-md
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/shop" className="flex items-center gap-3">
          <span className="font-extrabold text-xl md:text-2xl text-white">
            EMMATEX
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* NAV LINK */}
          <Link
            to="/shop"
            className="text-sm text-white dark:text-gray-200 transition-colors"
          >
            Shop
          </Link>

          {/* CART BUTTON */}
          <button
            className="
              relative p-2 rounded-md 
              hover:bg-white/20 dark:hover:bg-slate-700/40 
              text-white dark:text-gray-200 transition-colors
            "
            aria-label={`Cart with ${uniqueCount} unique items`}
            onClick={() => window.dispatchEvent(new CustomEvent("open-cart"))}
          >
            <FiShoppingCart />
            {uniqueCount > 0 && (
              <span
                className="
                  absolute -top-1 -right-1 bg-red-500
                  text-white rounded-full text-xs w-5 h-5 
                  flex items-center justify-center
                "
              >
                {uniqueCount}
              </span>
            )}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-md hover:bg-white/20 dark:hover:bg-slate-700/40
              text-white dark:text-gray-200 transition-all
            "
            aria-label="Toggle theme"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}
