import axios from "axios";

const SHEETS_ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT || "";

export default {
  postOrder: async (order) => {
    if (!SHEETS_ENDPOINT) {
      console.warn("VITE_SHEETS_ENDPOINT not set. Order not saved to sheets.");
      return { data: { success: false, message: "no_endpoint" } };
    }

    try {
      const params = new URLSearchParams();

      // CUSTOMER INFO
      params.append("customer_name", order.user?.name ?? "");
      params.append("customer_phone", order.user?.phone ?? "");
      params.append("customer_address", order.user?.address ?? "");
      params.append("customer_notes", order.user?.notes ?? "");

      // ITEMS — lightweight version
      const itemsMinimal = (order.items || []).map((it) => ({
        product_id: it.id,
        product_name: it.name,
        qty: it.qty ?? 1,
        price: it.price ?? 0,
        seller_id: it.seller?.id ?? "",
      }));
      params.append("items", JSON.stringify(itemsMinimal));

      params.append("total", order.total ?? 0);

      // SELLER INFO — SINGLE SELLER (marketplace uses one seller per product)
      const seller = order.seller ?? {};
      params.append("seller_id", seller.id ?? "");
      params.append("seller_name", seller.name ?? "");
      params.append("seller_whatsapp", seller.whatsapp ?? "");

      // NEW → SELLER LOCATION
      params.append("seller_location", seller.location ?? "");

      // SEND
      const url = `${SHEETS_ENDPOINT}?${params.toString()}`;
      const res = await axios.get(url, { timeout: 10000 });

      return res.data ? res.data : res;

    } catch (err) {
      console.error("sheets.postOrder error:", err?.message ?? err);
      throw err;
    }
  },
};
