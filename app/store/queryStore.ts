import { create } from "zustand";

interface Store {
  searchInputParam: string | undefined;
  scanCategoryIdParam: string | undefined;
  setSearchInputParam: (text?: string) => void;
  setScanCategoryIdParam: (id?: string) => void;
}

export const useQueryStore = create<Store>((set) => ({
  searchInputParam: undefined,
  scanCategoryIdParam: undefined,
  setSearchInputParam: (text) => set({ searchInputParam: text }),
  setScanCategoryIdParam: (id) => set({ scanCategoryIdParam: id }),
}));
