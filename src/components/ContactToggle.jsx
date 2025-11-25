import React from "react";
import { FiMessageCircle, FiX, FiPhone } from "react-icons/fi";

/* Floating contact widget (toggle) */
export default function ContactToggle() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div className={`flex flex-col items-end gap-2 ${open ? "" : ""}`}>

        {open && (
          <div className="
            w-72 p-3 
            bg-white dark:bg-slate-800 
            text-slate-900 dark:text-slate-100
            rounded-lg shadow-lg border border-gray-200 dark:border-slate-700
          ">
            <div className="flex items-start justify-between">
              
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  Contact Us
                </div>

                <div className="text-sm text-gray-600 dark:text-slate-300">
                  We're here to help — message us on WhatsApp or call.
                </div>
              </div>

              <button
                className="ml-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <a
                className="inline-flex items-center gap-2 px-3 py-2 
                           bg-gradient-to-r from-green-400 to-emerald-500 
                           text-white rounded shadow-md"
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
                  "Hello, I need help with a product."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FiMessageCircle /> Message on WhatsApp
              </a>

              <a
                className="
                  inline-flex items-center gap-2 px-3 py-2 
                  text-white rounded shadow-md 
                  bg-blue-700 hover:bg-blue-800
                  dark:bg-blue-600 dark:hover:bg-blue-500
                "
                href="tel:09036833768"
              >
                <FiPhone /> Call Us
              </a>
            </div>
          </div>
        )}

        {/* Floating trigger button */}
        <button
          className="
            p-3 rounded-full shadow-lg 
            bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300
            text-white flex items-center justify-center
          "
          onClick={() => setOpen((s) => !s)}
          aria-label="Contact toggle"
        >
          <FiMessageCircle />
        </button>
      </div>
    </div>
  );
}
