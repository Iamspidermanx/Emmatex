import React, { useState } from "react";
import formatPrice from "./helpers/formatPrice.jsx";
import CheckoutForm from "./CheckoutForm.jsx";
import useCartStore from "./stores/useCartStore.jsx";

export default function ProductSpecs({ product }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? null);
  const [color, setColor] = useState(product.colors?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  function quickAdd() {
    if (!size && product.sizes?.length)
      return alert("Please choose a size.");

    const cartKey = `${product.id}_${size ?? "nosize"}_${color?.hex ?? "nocolor"}`;

    addItem({
      cartKey,
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      size,
      color: {
        name: color?.name,
        hex: color?.hex
      },
      qty,
      mediaPreview: product.media?.[0]?.src,
      seller: {
        id: product.seller?.id,
        name: product.seller?.name,
        whatsapp: product.seller?.whatsapp,
        location: product.seller?.location,
      },
    });
  }

  function handleBuy() {
    if (!size && product.sizes?.length)
      return alert("Please choose a size.");

    setShowCheckout(true);
  }

  return (
    <div className="max-w-xl mx-auto mt-4 p-4 rounded-lg
                    bg-white dark:bg-slate-900 
                    shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.05)]
                    transition-colors">
      
      {/* Product Name */}
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
        {product.name}
      </h2>

      {/* Price */}
      <div className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
        {formatPrice(product.price)}
      </div>

      {/* Seller Info */}
      <div className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        <p><strong>Store/Brand:</strong> {product.seller?.name || "Unknown Seller"}</p>
        <p><strong>Store Location:</strong> {product.seller?.location || "Unavailable"}</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 font-medium mt-4 leading-relaxed">
        {product.description}
      </p>

      {/* Size Selector */}
      {product.sizes?.length > 0 && (
        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Size
          </label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`
                  px-3 py-1 text-xs font-semibold border rounded
                  transition-all
                  ${size === s
                    ? "bg-black text-white border-black"
                    : "bg-white dark:bg-slate-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"}
                `}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {product.colors?.length > 0 && (
        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Color
          </label>
          <div className="flex gap-3 mt-2 items-center flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c)}
                className={`
                  w-7 h-7 rounded-full border transition-all
                  ${color?.hex === c.hex ? "ring-2 ring-black dark:ring-white" : ""}
                `}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center overflow-hidden rounded-lg shadow-sm">
          <button
            className="px-3 py-2 text-xs bg-red-600 text-white font-semibold"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            -
          </button>

          <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
            {qty}
          </div>

          <button
            className="px-3 py-2 text-xs bg-green-600 text-white font-semibold"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* Add to cart & Buy Now */}
        <div className="flex-1 flex gap-2">
          <button
            onClick={quickAdd}
            className="flex-1 text-xs bg-black dark:bg-slate-700 text-white px-4 py-2 rounded shadow-sm hover:opacity-90"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuy}
            className="flex-1 text-xs bg-green-600 text-white px-4 py-2 rounded shadow-sm hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutForm
          items={[{
            id: product.id,
            product_id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            size,
            color: color?.hex,
            qty,
            seller: {
              id: product.seller?.id,
              name: product.seller?.name,
              whatsapp: product.seller?.whatsapp,
              location: product.seller?.location,
            },
          }]}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
