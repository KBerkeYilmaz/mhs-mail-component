// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMailStore = create(
  persist(
    (set) => ({
      selectedMailId: null,
      isMailDisplayOpen: false,
      setSelectedMailId: (id) =>
        set({ selectedMailId: id, isMailDisplayOpen: true }),
      closeMailDisplay: () => set({ isMailDisplayOpen: false }),
    }),
    {
      name: "mail-storage", 
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
