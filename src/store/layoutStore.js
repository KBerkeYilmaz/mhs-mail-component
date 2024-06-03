import { create } from "zustand";

export const useLayoutStore = create((set) => ({
    activeSequenceId: null,
    setActiveSequenceId: (id) => set({ activeSequenceId: id }),
    isTemplateBlockVisible: false,
    setTemplateBlockVisibility: (isVisible) => set({ isTemplateBlockVisible: isVisible }),


    sequenceHasErrors: false,
    setSequenceHasErrors: (hasErrors) => set({ sequenceHasErrors: hasErrors }),
  
    hasLeads: false,
    setHasLeads: (hasLeads) => set({ hasLeads: hasLeads }),
  
  }));
  