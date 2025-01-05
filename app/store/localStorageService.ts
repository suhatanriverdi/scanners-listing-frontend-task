// localStorageService.ts

const LOCAL_STORAGE_KEYS = {
  SEARCH_INPUT: "searchInputParam",
  SCAN_CATEGORY_ID: "scanCategoryIdParam",
  CURRENT_PAGE: "currentPageParam",
  RESULTS_PER_PAGE: "resultsPerPageParam",
};

// Set item to localStorage
export const setLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

// Get item from localStorage
export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

// Specific functions for each parameter
export const setSearchInputParam = (text?: string) => {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.SEARCH_INPUT, text);
};

export const getSearchInputParam = (): string | null => {
  return getLocalStorageItem<string>(LOCAL_STORAGE_KEYS.SEARCH_INPUT);
};

export const setScanCategoryIdParam = (id?: string) => {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.SCAN_CATEGORY_ID, id);
};

export const getScanCategoryIdParam = (): string | null => {
  return getLocalStorageItem<string>(LOCAL_STORAGE_KEYS.SCAN_CATEGORY_ID);
};

export const setCurrentPageParam = (page: number) => {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.CURRENT_PAGE, page);
};

export const getCurrentPageParam = (): number => {
  return getLocalStorageItem<number>(LOCAL_STORAGE_KEYS.CURRENT_PAGE) || 1; // Default to 1
};

export const setResultsPerPageParam = (count: number) => {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.RESULTS_PER_PAGE, count);
};

export const getResultsPerPageParam = (): number => {
  return getLocalStorageItem<number>(LOCAL_STORAGE_KEYS.RESULTS_PER_PAGE) || 10; // Default to 10
};
