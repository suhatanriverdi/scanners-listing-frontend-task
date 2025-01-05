import { create } from "zustand";
import { Scanner } from "@/app/lib/definitions";
import {
  setCurrentPageParam,
  setResultsPerPageParam,
  setScanCategoryIdParam,
  setSearchInputParam,
} from "@/app/store/localStorageService";

interface Store {
  scanners: Scanner[];
  searchInputParam: string;
  scanCategoryIdParam: string;
  totalCountParam: number; // Total rows
  currentPageParam: number; // Current page number
  resultsPerPageParam: number; // Number of results per page
  setScanners: (scanners: Scanner[]) => void;
  setSearchInputParam: (text?: string) => void;
  setScanCategoryIdParam: (id?: string) => void;
  setCurrentPage: (page: number) => void; // Function to set current page
  setTotalCountParam: (count?: number) => void; // Function to set total count
  setResultsPerPage: (count: number) => void; // Function to set results per page
}

export const useQueryStore = create<Store>((set) => ({
  scanners: [],
  totalCountParam: 0,
  searchInputParam: "",
  scanCategoryIdParam: "",
  currentPageParam: 1, // Default page number
  resultsPerPageParam: 10, // Default results per page
  setScanners: (scanners) => set({ scanners }),

  setSearchInputParam: (text) => {
    set({ searchInputParam: text });
    setSearchInputParam(text); // Save to local storage
  },

  setScanCategoryIdParam: (id) => {
    set({ scanCategoryIdParam: id });
    setScanCategoryIdParam(id); // Save to local storage
  },

  setTotalCountParam: (totalCount) => {
    set({ totalCountParam: totalCount });
  },

  setCurrentPage: (page) => {
    set({ currentPageParam: page });
    setCurrentPageParam(page); // Save to local storage
  },

  setResultsPerPage: (count) => {
    set({ resultsPerPageParam: count });
    setResultsPerPageParam(count); // Save to local storage
  },
}));
