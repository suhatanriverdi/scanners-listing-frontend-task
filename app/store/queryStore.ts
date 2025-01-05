import { create } from "zustand";
import { Scanner } from "@/app/lib/definitions";

interface Store {
  scanners: Scanner[];
  searchInputParam: string | undefined;
  scanCategoryIdParam: string | undefined;
  currentPage: number; // Current page number
  resultsPerPage: number; // Number of results per page
  setScanners: (scanners: Scanner[]) => void;
  setSearchInputParam: (text?: string) => void;
  setScanCategoryIdParam: (id?: string) => void;
  setCurrentPage: (page: number) => void; // Function to set current page
  setResultsPerPage: (count: number) => void; // Function to set results per page
}

export const useQueryStore = create<Store>((set) => ({
  scanners: [],
  searchInputParam: undefined,
  scanCategoryIdParam: undefined,
  currentPage: 1, // Default page number
  resultsPerPage: 10, // Default results per page
  setScanners: (scanners) => set({ scanners }),
  setSearchInputParam: (text) => set({ searchInputParam: text }),
  setScanCategoryIdParam: (id) => set({ scanCategoryIdParam: id }),
  setCurrentPage: (page) => set({ currentPage: page }), // Update current page
  setResultsPerPage: (count) => set({ resultsPerPage: count }), // Update results per page
}));
