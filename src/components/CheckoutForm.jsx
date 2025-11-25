import React, { useState } from "react";
import useUserStore from "./stores/useUserStore.jsx";
import useCartStore from "./stores/useCartStore.jsx";
import sheets from "./helpers/sheets.jsx";
import useWhatsAppMultiSeller from "./hooks/useWhatsAppMultiSeller.jsx";

export default function CheckoutForm({ items = [], onClose = () => {} }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const user = useUserStore((s) => s);
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
    notes: user.notes || "",
  });

  const buildMultiSellerLinks = useWhatsAppMultiSeller();
  const [waLinks, setWaLinks] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      user: { ...form },
      items: items.map((it) => ({
        product_id: it.id,
        product_name: it.name,
        qty: it.qty,
        price: it.price,

        seller: {
          id: it.seller?.id || it.seller_id || "",
          name:
            it.seller?.name ||
            it.seller_name ||
            "Unknown Seller",
          whatsapp:
            it.seller?.whatsapp ||
            it.seller_whatsapp ||
            "",
          location:
            it.seller?.location ||
            it.seller_location ||
            "",
        },

        size: it.size,
        color: it.color,
      })),
    };

    try {
      await sheets.postOrder(payload);
    } catch (err) {
      console.warn("Failed saving order:", err);
    } finally {
      setLoading(false);
      const groups = buildMultiSellerLinks(payload);
      setWaLinks(groups);
      setUserInfo(form);
    }
  }

  function handleWaClick(link) {
    window.open(link, "_blank");
  }

  function handleClose() {
    clearCart();
    setOpen(false);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={handleClose}
      />

      {/* Form Container */}
      <div className="relative z-10 
                      bg-white dark:bg-slate-900 
                      text-slate-900 dark:text-slate-100
                      max-w-lg w-full p-6 rounded-md shadow-xl">

        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">
          Checkout
        </h3>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-700 dark:text-slate-200">Full name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2 mb-2 
                       bg-white dark:bg-slate-800 
                       text-slate-900 dark:text-slate-100 
                       border-slate-300 dark:border-slate-700"
          />

          <label className="block text-sm text-slate-700 dark:text-slate-200">Phone</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded px-3 py-2 mb-2 
                       bg-white dark:bg-slate-800 
                       text-slate-900 dark:text-slate-100 
                       border-slate-300 dark:border-slate-700"
          />

          <label className="block text-sm text-slate-700 dark:text-slate-200">Address</label>
          <input
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border rounded px-3 py-2 mb-2 
                       bg-white dark:bg-slate-800 
                       text-slate-900 dark:text-slate-100 
                       border-slate-300 dark:border-slate-700"
          />

          <label className="block text-sm text-slate-700 dark:text-slate-200">Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border rounded px-3 py-2 mb-4 
                       bg-white dark:bg-slate-800 
                       text-slate-900 dark:text-slate-100 
                       border-slate-300 dark:border-slate-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-slate-700 
                       hover:bg-gray-900 dark:hover:bg-slate-600
                       text-white px-4 py-2 rounded mb-3"
          >
            {loading ? "Processing..." : "Generate WhatsApp Link"}
          </button>
        </form>

        {waLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-200">
              Send order to store/brand:
            </h4>

            <div className="flex flex-col gap-2">
              {waLinks.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWaClick(g.waLink)}
                  className="w-full bg-green-600 dark:bg-green-700 
                             hover:bg-green-700 dark:hover:bg-green-600 
                             text-white px-4 py-2 rounded"
                >
                  {g.seller?.name || "Click to Order via WhatsApp"} — ₦
                  {new Intl.NumberFormat("en-NG").format(g.total || 0)}
                </button>
              ))}
            </div>

            <button
              onClick={handleClose}
              className="mt-4 w-full border 
                         border-slate-300 dark:border-slate-700
                         text-slate-900 dark:text-slate-100 
                         px-4 py-2 rounded
                         bg-white dark:bg-slate-800"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
