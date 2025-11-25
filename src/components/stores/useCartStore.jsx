import { create } from "zustand";

const STORAGE_KEY = "emmatex_cart_v1";


const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),

  addItem: (item, opts = { openCart: false }) =>
    set((s) => {
      const items = [...s.items];

      // Use productId + size + color as unique key
      const foundIndex = items.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.size === item.size &&
          JSON.stringify(i.color) === JSON.stringify(item.color)

      );

      if (foundIndex >= 0) {
        items[foundIndex] = {
          ...items[foundIndex],
          qty: (items[foundIndex].qty || 0) + (item.qty || 1),
        };
      } else {
        items.push({ ...item, qty: item.qty || 1 });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return { items };
    }),

  updateQuantity: (productId, size, color, qty) =>
    set((s) => {
      const items = s.items.map((it) =>
        it.productId === productId && it.size === size && it.color === color
          ? { ...it, qty }
          : it
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return { items };
    }),

  removeItem: (productId, size, color) =>
    set((s) => {
      const items = s.items.filter(
        (it) =>
          !(
            it.productId === productId &&
            it.size === size &&
            it.color === color
          )
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return { items };
    }),

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },

  getCartTotal: () =>
    get().items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0),

  getItemCount: () => get().items.reduce((sum, it) => sum + (it.qty || 0), 0),
}));

export default useCartStore;
