// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useDelayStore = create(
  persist(
    (set) => ({
      delay: 0,
      setDelay: (newDelay) => set({ delay: newDelay }),
      resetDelay: () => set({ delay: 0 }),
      setDelayTo: (value) => set({ delay: value }),
    }),
    {
      name: "form-storage", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

