import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products = [] }) {
  return (
    <div
      className="
        grid grid-cols-2 md:grid-cols-4 gap-4 
        bg-white dark:bg-slate-900 
        transition-colors duration-300
        p-1 md:p-2 rounded-md
      "
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
