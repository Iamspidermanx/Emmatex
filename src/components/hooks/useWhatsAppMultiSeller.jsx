export default function useWhatsAppMultiSeller() {
  return function buildLinks(payload) {
    const { user = {}, items = [] } = payload;

    const sellerMap = {};

    items.forEach((it) => {
      const seller = {
        whatsapp:
          it.seller?.whatsapp ||
          it.seller_whatsapp ||
          "",
        name:
          it.seller?.name ||
          it.seller_name ||
          "Unknown Seller",
        location:
          it.seller?.location ||
          it.seller_location ||
          "",
      };

      const wa = seller.whatsapp || "unknown";

      if (!sellerMap[wa]) {
        sellerMap[wa] = {
          seller,
          items: [],
          total: 0,
        };
      }

      sellerMap[wa].items.push(it);
      sellerMap[wa].total += (it.price || 0) * (it.qty || 1);
    });

    return Object.values(sellerMap).map((group) => {
      const parts = [];

      parts.push(`Customer: ${user.name || ""}`);
      if (user.phone) parts.push(`Phone: ${user.phone}`);
      if (user.address) parts.push(`Address: ${user.address}`);
      if (user.notes) parts.push(`Notes: ${user.notes}`);

      parts.push("");
      parts.push("Order items:");

      /***************************************
       * UPDATED: Include color + size
       ***************************************/
group.items.forEach((it, idx) => {
  const name = it.product_name || it.name;
  const qty  = it.qty || 1;
  const price = new Intl.NumberFormat("en-NG").format(it.price);

  const size = it.size ? ` | Size: ${it.size}` : "";
// Convert color format safely
let colorLabel = "";

if (it.color) {
  if (typeof it.color === "object") {
    colorLabel = it.color.name || it.color.hex;
  } else {
    colorLabel = it.color; // fallback if user has old cart data
  }
}

const color = colorLabel ? ` | Color: ${colorLabel}` : "";

  // SKU (optional)
  const sku = it.sku ? ` | SKU: ${it.sku}` : "";

  // Image preview (optional)
  const img = it.mediaPreview
    ? `\n📷 Image: ${it.mediaPreview}`
    : "";

  // Auto product link (optional)
  const link = it.productId
    ? `\n🔗 Link: ${window.location.origin}/product/${it.productId}`
    : "";

  parts.push(
    `${idx + 1}. ${name}${size}${color}${sku} x${qty} — ₦${price}${img}${link}`
  );
});


      parts.push("");
      parts.push(
        `Total: ₦${new Intl.NumberFormat("en-NG").format(group.total)}`
      );

      const text = encodeURIComponent(parts.join("\n"));

      let phone =
        group.seller.whatsapp ||
        import.meta.env.VITE_WHATSAPP_NUMBER ||
        "";

      phone = String(phone).replace(/[^\d]/g, "");

      const waLink = phone
        ? `https://wa.me/${phone}?text=${text}`
        : `https://wa.me/?text=${text}`;

      return {
        sellerName: group.seller.name,
        sellerLocation: group.seller.location,
        sellerWhatsAppClean: phone,
        items: group.items,
        total: group.total,
        waLink,
      };
    });
  };
}
