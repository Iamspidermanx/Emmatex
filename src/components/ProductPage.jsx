import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProducts from "./hooks/useProducts.jsx";
import ProductMediaViewer from "./ProductMediaViewer.jsx";
import ProductSpecs from "./ProductSpecs.jsx";
import useCartStore from "./stores/useCartStore.jsx";
import PageTransition from "./PageTransition.jsx";

export default function ProductPage() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

  /* ============================
       FETCH PRODUCT BY ID
     ============================ */
  useEffect(() => {
    if (products) {
      setProduct(products.find((p) => String(p.id) === String(id)) || null);
    }
  }, [products, id]);

  /* ============================
       LOADING STATE
     ============================ */
  if (loading || !product) {
    return (
      <div className="py-20 text-center text-slate-700 dark:text-gray-300 font-medium">
        Loading product…
      </div>
    );
  }

  /* ============================
       ADD TO CART (from Specs)
     ============================ */
  function handleAdd(selected) {
    addItem({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      size: selected.size,
      color: selected.color,
      qty: selected.qty || 1,
      mediaPreview: product.media?.[0]?.src,

      // Make sure seller info stays intact
      seller: {
        id: product.seller?.id,
        name: product.seller?.name,
        whatsapp: product.seller?.whatsapp,
        location: product.seller?.location,
      },
    });

    // Open cart drawer
    window.dispatchEvent(new CustomEvent("open-cart"));
  }

  return (
    <PageTransition>
      <div
        className="
        max-w-6xl mx-auto px-4 py-8 
        grid grid-cols-1 md:grid-cols-2 gap-8 
        bg-white dark:bg-slate-900
        rounded-lg md:shadow dark:shadow-[0_0_10px_rgba(255,255,255,0.05)]
        transition-colors
      "
      >
        {/* PRODUCT MEDIA VIEWER */}
        <ProductMediaViewer media={product.media} />

        {/* PRODUCT DETAILS */}
        <div className="mt-4 md:mt-0">
          <ProductSpecs product={product} onAdd={handleAdd} />
        </div>
      </div>
    </PageTransition>
  );
}
