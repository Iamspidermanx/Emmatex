import React, { useState, useMemo, useEffect } from "react";
import ProductGrid from "./ProductGrid.jsx";
import useProducts from "./hooks/useProducts.jsx";
import Loader from "./Loader.jsx";
import { FiFilter } from "react-icons/fi";

export default function Shop() {
  const { products, loading, error } = useProducts();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [seller, setSeller] = useState("all");
  const [location, setLocation] = useState("all");

  /* Extract Lists */
  const categories = useMemo(() => {
    if (!products) return ["all"];
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const sellers = useMemo(() => {
    if (!products) return ["all"];
    const set = new Set(products.map((p) => p.seller?.name).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const locations = useMemo(() => {
    if (!products) return ["all"];
    const set = new Set(products.map((p) => p.seller?.location).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  useEffect(() => {
    setLocation("all");
  }, [seller]);

  /* Apply Filters */
  const filtered = useMemo(() => {
    if (!products) return [];

    return products.filter((p) => {
      const q = query.toLowerCase();

      if (category !== "all" && p.category !== category) return false;
      if (seller !== "all" && p.seller?.name !== seller) return false;
      if (location !== "all" && p.seller?.location !== location) return false;

      if (q) {
        const name = p.name?.toLowerCase() || "";
        const desc = p.description?.toLowerCase() || "";
        if (!name.includes(q) && !desc.includes(q)) return false;
      }

      return true;
    });
  }, [products, query, category, seller, location]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 transition-colors duration-300 text-slate-900 dark:text-gray-100">

      {/* Flashy Rainbow Moving Ad */}
      <div className="overflow-hidden relative w-full mb-6 h-14 rounded bg-black">
        <div className="absolute whitespace-nowrap animate-scroll-bounce px-2 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 via-green-500 via-blue-500 to-purple-600">
          🎉 FREE DELIVERY TO YOUR ADDRESS IF YOU'RE IN OSOGBO 🚚
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes scroll-bounce {
            0% { transform: translateX(100%) translateY(0); }
            25% { transform: translateX(50%) translateY(-5px); }
            50% { transform: translateX(0%) translateY(0); }
            75% { transform: translateX(-50%) translateY(5px); }
            100% { transform: translateX(-100%) translateY(0); }
          }
          .animate-scroll-bounce {
            display: inline-block;
            animation: scroll-bounce 12s linear infinite;
          }
        `}
      </style>

      {/* Filters/Search Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="
              border rounded-md px-3 py-2
              bg-white dark:bg-slate-800
              border-gray-300 dark:border-slate-700
              text-black dark:text-gray-200
              transition-colors
            "
            aria-label="Search products"
          />
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FiFilter />
            Filters
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-3 py-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-black dark:text-gray-200 transition-colors"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            className="border rounded-md px-3 py-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-black dark:text-gray-200 transition-colors"
          >
            {sellers.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "Store/Brands" : s}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md px-3 py-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-black dark:text-gray-200 transition-colors"
          >
            {locations.map((l) => (
              <option key={l} value={l}>
                {l === "all" ? "Locations" : l}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setQuery("");
            setCategory("all");
            setSeller("all");
            setLocation("all");
          }}
          className="px-3 py-2 rounded-md text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Product List */}
      {loading && <Loader />}
      {error && (
        <div className="text-red-500 dark:text-red-400">
          Failed to load products.
        </div>
      )}
      {!loading && !error && <ProductGrid products={filtered} />}
    </section>
  );
}
