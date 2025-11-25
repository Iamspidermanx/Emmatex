import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import formatPrice from "./helpers/formatPrice.jsx";
import cloudinary from "./helpers/cloudinary.jsx";
import useCartStore from "./stores/useCartStore.jsx";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const preview = product.media?.[0];
  const hoverMedia = product.media?.[1];

  const defaultSize = product.sizes?.[0] ?? null;
  const defaultColor = product.colors?.[0] ?? null;

  function quickAdd(e) {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      cartKey: `${product.id}_${defaultSize ?? "nosize"}_${defaultColor?.hex ?? "nocolor"}`,
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      size: defaultSize,
      color: {
        name: defaultColor?.name,
        hex: defaultColor?.hex
      },
      qty: 1,
      mediaPreview: preview?.src,
      seller: {
        id: product.seller?.id,
        name: product.seller?.name,
        whatsapp: product.seller?.whatsapp,
        location: product.seller?.location,
      },
    });
  }

  function goToDetails(e) {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  }

  return (
    <motion.div
      layout
      className="
        relative pb-5 cursor-pointer overflow-hidden rounded-md shadow-md
        bg-gradient-to-br from-blue-300 via-pink-200 to-yellow-300
        hover:scale-[1.02] transition-all duration-300
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="w-full h-48 bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
        {preview?.type === "video" ? (
          <video
            src={cloudinary(preview.src, { w: 800 })}
            className="object-cover w-full h-full"
            muted
            playsInline
            autoPlay={hovered}
            loop
          />
        ) : (
          <img
            src={cloudinary((hovered && hoverMedia?.src) || preview?.src, { w: 800 })}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* PRICE BADGE */}
        <div className="
          absolute top-2 right-2 px-2 py-1 rounded-md shadow font-bold text-xs
          bg-white dark:bg-slate-800
          text-green-600
        ">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="p-3">
        <div className="font-bold text-sm text-slate-900 ">
          {product.name}
        </div>

        <div className="text-xs text-green-600 font-bold mt-1">
          {formatPrice(product.price)}
        </div>

        <div className="text-[9px] font-semibold text-gray-700 mt-1">
          Store: {product.seller?.name || "Unknown"}
        </div>

        <div className="text-[9px] font-semibold text-gray-700">
          Location: {product.seller?.location || "Unavailable"}
        </div>
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="absolute inset-0 flex items-end justify-center p-2 pointer-events-none">
        <div className="w-full flex justify-between gap-2 pointer-events-auto">

          <button
            onClick={goToDetails}
            className="
              bg-white/90
              text-[8px] font-semibold px-2 py-1 rounded-md shadow
              text-black
              transition-colors
            "
          >
            View Details
          </button>

          <button
            onClick={quickAdd}
            className="
              bg-black text-white
              px-2 py-1 rounded-md shadow text-[8px] font-semibold
              hover:bg-gray-800
              transition-colors
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
