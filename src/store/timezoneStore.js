import {create} from "zustand";

export const useTimezoneStore = create((set) => ({
  schedules: [],
  addSchedule: (schedule) => set((state) => ({
    schedules: [...state.schedules, schedule]
  })),
  removeSchedule: (id) => set((state) => ({
    schedules: state.schedules.filter((schedule) => schedule.id !== id)
  })),
  updateSchedule: (id, updatedSchedule) => set((state) => ({
    schedules: state.schedules.map((schedule) =>
      schedule.id === id ? updatedSchedule : schedule
    )
  })),
}));
