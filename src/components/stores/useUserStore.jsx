import { create } from "zustand";

/* Simple transient user store */
const useUserStore = create((set) => ({
  name: "",
  phone: "",
  address: "",
  notes: "",
  setUserInfo: (payload) => set((s) => ({ ...s, ...payload })),
}));

export default useUserStore;