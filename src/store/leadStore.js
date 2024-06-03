import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLeadsStore = create(
  persist(
    (set, get) => ({
      leads: [],
      nextId: 1,
      addLead: (lead) => {
        set((state) => ({
          leads: [...state.leads, { id: state.nextId, ...lead }],
          nextId: state.nextId + 1,
        }));
      },
      updateLead: (id, updates) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, ...updates } : lead,
          ),
        })),
      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),
        resetLead: () =>
        set(() => ({
          leads: [],
          nextId: 1,
        })),
    }),
    {
      name: "leads-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
