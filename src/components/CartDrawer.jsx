import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "./stores/useCartStore.jsx";
import CartItem from "./CartItem.jsx";
import useWhatsAppMultiSeller from "./hooks/useWhatsAppMultiSeller.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const buildMultiSellerLinks = useWhatsAppMultiSeller();

  const waLinks = useMemo(() => {
    if (!items || items.length === 0) return [];
    return buildMultiSellerLinks({ user: {}, items });
  }, [items, buildMultiSellerLinks]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-cart", onOpen);
    return () => window.removeEventListener("open-cart", onOpen);
  }, []);

  function handleClose() {
    setOpen(false);
    setCheckoutOpen(false);
  }

  function handleCheckoutClose() {
    setCheckoutOpen(false);
  }

  function handleDone() {
    clearCart();
    setOpen(false);
    setCheckoutOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/60"
            onClick={handleClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="absolute right-0 top-0 h-full w-full md:w-96 
                       bg-white/90 dark:bg-slate-900 
                       text-slate-900 dark:text-slate-100
                       p-4 overflow-auto shadow-xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-2xl text-slate-900 dark:text-white">
                Cart
              </h3>
              <button
                className="text-red-600 dark:text-red-400 font-medium hover:underline"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

            {/* CART ITEMS */}
            <div className="flex flex-col gap-3">
              {items.length === 0 && (
                <div className="text-gray-600 dark:text-gray-300">
                  Your cart is empty.
                </div>
              )}

              <AnimatePresence>
                {items.map((it) => (
                  <motion.div
                    key={`${it.productId}-${it.size}-${it.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <CartItem item={it} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Button */}
            {items.length > 0 && !checkoutOpen && (
              <button
                onClick={() => setCheckoutOpen(true)}
                className="mt-6 w-full bg-black dark:bg-slate-700 
                           hover:bg-gray-900 dark:hover:bg-slate-600
                           text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            )}

            {/* Inline Checkout Form */}
            {checkoutOpen && (
              <div className="mt-4 border-t border-slate-300 dark:border-slate-700 pt-4">
                <CheckoutForm items={items} onClose={handleCheckoutClose} />
              </div>
            )}

            {/* WhatsApp buttons (only if checkout not open) */}
            {!checkoutOpen && waLinks.length > 0 && (
              <div className="mt-6 border-t border-slate-300 dark:border-slate-700 pt-4">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-200">
                  Send to sellers:
                </h4>

                <div className="flex flex-col gap-2">
                  {waLinks.map((g, idx) => (
                    <button
                      key={idx}
                      onClick={() => window.open(g.waLink, "_blank")}
                      className="w-full bg-green-600 hover:bg-green-700 
                                 text-white font-medium px-4 py-2 rounded
                                 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                      {g.sellerName} ({g.sellerWhatsAppClean || "no number"}) — ₦
                      {new Intl.NumberFormat("en-NG").format(g.total || 0)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* DONE BUTTON */}
            {items.length > 0 && (
              <button
                onClick={handleDone}
                className="mt-4 w-full text-white font-semibold 
                           bg-blue-600 hover:bg-blue-700 
                           px-4 py-2 rounded
                           dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Done
              </button>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
