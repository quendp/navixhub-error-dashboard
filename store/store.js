import { create } from "zustand";

// Reports data with 25 or more items for ErrorList.js
const reportsTableStore = (set) => ({
  reports: null,
  setReports: (action) => set((state) => ({ reports: action })),
});

export const useReportsTableStore = create(reportsTableStore);
