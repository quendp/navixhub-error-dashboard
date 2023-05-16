import { create } from "zustand";

const store = (set) => ({
  reports: null,
  setReports: (action) => set((state) => ({ reports: action })),
});

export const useReportsStore = create(store);
