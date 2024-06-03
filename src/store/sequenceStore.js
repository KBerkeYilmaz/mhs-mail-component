import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSequenceStore = create(
  persist(
    (set, get) => ({
      sequences: [
        {
          id: 1,
          senders: [],
          forcedSenders: false,
          emailSubject: "",
          emailContent: "",
          delay: 0,
        },
      ],
      nextId: 2,
      addSequence: () =>
        set((state) => ({
          sequences: [
            ...state.sequences,
            {
              id: state.nextId,
              senders: [],
              forcedSenders: false,
              emailSubject: "",
              emailContent: "",
              delay: 0,
            },
          ],
          nextId: state.nextId + 1,
        })),
      removeSequence: (id) =>
        set((state) => {
          const updatedSequences = state.sequences
            .filter((sequence) => sequence.id !== id)
            .map((sequence, index) => ({ ...sequence, id: index + 1 }));

          return {
            sequences: updatedSequences,
            nextId: updatedSequences.length + 1,
          };
        }),
      updateSequenceDelay: (id, newDelay) =>
        set((state) => ({
          sequences: state.sequences.map((sequence) =>
            sequence.id === id ? { ...sequence, delay: newDelay } : sequence,
          ),
        })),
      updateSequence: (id, updates) =>
        set((state) => ({
          sequences: state.sequences.map((sequence) =>
            sequence.id === id ? { ...sequence, ...updates } : sequence,
          ),
        })),
      duplicateSequence: (id) =>
        set((state) => {
          const sequenceToDuplicate = state.sequences.find(
            (sequence) => sequence.id === id,
          );
          if (sequenceToDuplicate) {
            const newSequence = {
              ...sequenceToDuplicate,
              id: state.nextId,
            };
            const index = state.sequences.findIndex(
              (sequence) => sequence.id === id,
            );
            const updatedSequences = [
              ...state.sequences.slice(0, index + 1),
              newSequence,
              ...state.sequences.slice(index + 1),
            ].map((sequence, idx) => ({ ...sequence, id: idx + 1 }));
            return { sequences: updatedSequences, nextId: state.nextId + 1 };
          }
          return state;
        }),
    }),
    {
      name: "sequence-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
