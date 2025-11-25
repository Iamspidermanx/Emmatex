import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
        <p className="mt-3 text-gray-600">The page you are looking for does not exist.</p>
        <Link to="/shop" className="mt-6 inline-block bg-black text-white px-4 py-2 rounded">
          Back to Shop
        </Link>
      </div>
    </div>
  );
}