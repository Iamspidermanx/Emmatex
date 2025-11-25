import { useEffect, useState } from "react";
import axios from "axios";
import formatPrice from "../helpers/formatPrice.jsx"; // <-- added

/* Fetch product list from Google Sheets API endpoint.
   This version requires VITE_PRODUCTS_ENDPOINT to be set; no local fallback. */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const SHEETS_API = import.meta.env.VITE_PRODUCTS_ENDPOINT || "";
        if (!SHEETS_API) {
          throw new Error("VITE_PRODUCTS_ENDPOINT not configured");
        }
        const res = await axios.get(SHEETS_API);
        const rows = res.data.data || res.data;

        const colorNameMap = {
          black: "#000000",
          white: "#ffffff",
          red: "#ff0000",
          blue: "#0000ff",
          green: "#008000",
          brown: "#8b4513",
          pink: "#ff69b4",
          gray: "#6b7280",
          grey: "#6b7280",
          olive: "#808000",
          yellow: "#ffff00",
          orange: "#ffa500",
          purple: "#800080",
        };

        const products = (rows || []).map((row, idx) => {
          const price = Number(row.product_price) || 0;

          // parse colors into { name, hex } entries
          const rawColors = (row.colors || row.color || "").toString();
          const colors = rawColors
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
            .map((token) => {
              // support "Name:#hex", "#hex", or "Name"
              if (token.includes(":")) {
                const [namePart, hexPart] = token.split(":").map((s) => s.trim());
                return { name: namePart || hexPart, hex: hexPart || null };
              }
              if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(token)) {
                return { name: token, hex: token };
              }
              const lower = token.toLowerCase();
              const mapped = colorNameMap[lower];
              return { name: token, hex: mapped || null };
            });

          return {
            id: row.product_id || String(idx),
            name: row.product_name || "",
            sku: row.product_id || "",
            price,
            formattedPrice: formatPrice(price), // added formatted price
            description: row.product_description || "",
            category: row.product_category || "Uncategorized",
            sizes: row.specs ? String(row.specs).split(",").map((s) => s.trim()) : [],
            colors, // now array of { name, hex }
            media: [
              row.image_1 ? { type: "image", src: row.image_1 } : null,
              row.image_2 ? { type: "image", src: row.image_2 } : null,
              row.image_3 ? { type: "image", src: row.image_3 } : null,
            ].filter(Boolean),
            seller: {
              id: row.seller.id || "",
              name: row.seller.name || "",
              whatsapp: row.seller.whatsapp || "",
              location: row.seller.location || "",
            },
            created_at: row.created_at || "",
            raw: row,
          };
        });

        if (!cancelled) setProducts(products);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => (cancelled = true);
  }, []);

  return { products, loading, error };
}