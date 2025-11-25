import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-700 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
        
        {/* Brand */}
        <div>
          <h3 className="text-white dark:text-slate-100 font-bold text-lg">EMMATEX</h3>
          <p className="text-sm text-gray-300 dark:text-slate-400">
            Where Physical Stores Meet Unlimited Online Customers
          </p>
        </div>

        {/* Contact */}
        <div className="text-sm text-gray-300 dark:text-slate-400">
          <a
            href="mailto:Lexinjones47@gmail.com"
            className="hover:text-white dark:hover:text-slate-200 transition"
          >
            Contact: Lexinjones47@gmail.com
          </a>
          <p className="mt-1">Follow us on social media</p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 dark:text-slate-500 py-3">
        © {new Date().getFullYear()} EMMATEX
      </div>
    </footer>
  );
}
