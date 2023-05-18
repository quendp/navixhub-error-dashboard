import { create } from "zustand";

// Reports data with 25 items for ErrorList.js
const reportsTableStore = (set) => ({
  reports: null,
  setReports: (action) => set((state) => ({ reports: action })),
});

const sortListMethod = (set) => ({
  sortMethod: "id:desc",
  setSortMethod: (action) => set((state) => ({ sortMethod: action })),
});

export const useReportsTableStore = create(reportsTableStore);
export const useSortListMethod = create(sortListMethod);
