import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useCartStore from "./stores/useCartStore.jsx";
import formatPrice from "./helpers/formatPrice.jsx";

export default function CartItem({ item }) {
  const navigate = useNavigate();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const seller = item.seller || {};
  const sellerName = seller.name || "Unknown";
  const sellerLocation = seller.location || "";

  const initials = sellerName
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  // Normalize color input
  let colorHex = "";
  let colorName = "";

  if (item.color && typeof item.color === "object") {
    colorHex = item.color.hex || "";
    colorName = item.color.name || "";
  }

  if (item.color && typeof item.color === "string") {
    colorHex = item.color;
    colorName = item.color.replace("#", "").toUpperCase();
  }

  function openProduct() {
    navigate(`/product/${item.productId}`);
  }

  return (
    <motion.div
      onClick={openProduct}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        relative flex gap-3 items-center cursor-pointer p-3 rounded-xl
        bg-white/70 dark:bg-slate-800/50 backdrop-blur-md
        shadow-md hover:shadow-xl hover:scale-[1.015] transition-all
      "
    >
      {/* GRADIENT GLOW BORDER */}
      <div
        className="
          absolute inset-0 rounded-xl pointer-events-none
          bg-gradient-to-br from-blue-300 via-pink-200 to-yellow-200
        "
      />

      {/* SELLER BADGE */}
      <div
        className="
          absolute -top-2 -left-2 w-8 h-8 rounded-full 
          bg-black text-white text-xs font-bold
          flex items-center justify-center shadow-md z-20 
          border border-white/40 
        "
      >
        {initials}
      </div>

      {/* IMAGE */}
      <img
        src={item.mediaPreview}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg shadow-sm relative z-10"
      />

      {/* DETAILS */}
      <div className="flex-1 relative z-10">
        <div className="font-bold text-slate-900 ">
          {item.name}
        </div>

        {item.size && (
          <div className="text-sm font-medium text-gray-700 ">
            Size: {item.size}
          </div>
        )}

        {colorHex && (
          <div className="flex items-center font-medium gap-1 text-sm text-gray-700 mt-1">
            <span>Color: {colorName}</span>
            <span
              className="w-4 h-4 rounded-full border shadow-sm"
              style={{ backgroundColor: colorHex }}
            />
          </div>
        )}

        <div className="text-xs font-medium text-gray-800 mt-1">
          Store: {sellerName} | {sellerLocation}
        </div>

        <div className="text-sm mt-1 text-green-600 font-semibold">
          {formatPrice(item.price)}
        </div>
      </div>

      {/* QTY + REMOVE */}
      <div className="flex flex-col items-end gap-2 relative z-10">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(
                item.productId,
                item.size,
                item.color,
                Math.max(1, item.qty - 1)
              );
            }}
            className="px-2 rounded bg-red-600 text-white text-sm"
          >
            -
          </button>

          <div className="px-2 text-black font-semibold">{item.qty}</div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(
                item.productId,
                item.size,
                item.color,
                item.qty + 1
              );
            }}
            className="px-2 text-white rounded bg-green-500 text-sm"
          >
            +
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItem(item.productId, item.size, item.color);
          }}
          className="text-xs text-red-600 font-medium hover:underline"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
}
