"use client";

import { toast } from "@/hooks/use-toast";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { scannersData } from "@/app/seed/seedScannersData";
import { getFormattedDate, transformScannerData } from "@/app/utils/utils";
import { Scanner } from "@/app/lib/definitions";
import { useQueryStore } from "@/app/store/queryStore";
import { fetchScanners } from "@/app/lib/data";
import { useEffect, useState } from "react";
import {
  getCurrentPageParam,
  getResultsPerPageParam,
  getScanCategoryIdParam,
  getSearchInputParam,
} from "@/app/store/localStorageService";

export default function Scanners() {
  // Local sample data, TODO
  // const scanners: Scanner[] = transformScannerData(scannersData);
  const { scanners, setScanners } = useQueryStore();

  const {
    searchInputParam,
    scanCategoryIdParam,
    currentPageParam,
    resultsPerPageParam,
    setSearchInputParam: setStoreSearchInputParam,
    setScanCategoryIdParam: setStoreScanCategoryIdParam,
    setCurrentPage: setStoreCurrentPage,
    setResultsPerPage: setStoreResultsPerPage,
  } = useQueryStore();

  // Initialize store values from localStorage when the component mounts
  useEffect(() => {
    const searchInput = getSearchInputParam();
    const scanCategoryId = getScanCategoryIdParam();
    const currentPage = getCurrentPageParam();
    const resultsPerPage = getResultsPerPageParam();

    if (searchInput !== null) {
      setStoreSearchInputParam(searchInput);
    }

    if (scanCategoryId !== null) {
      setStoreScanCategoryIdParam(scanCategoryId);
    }

    if (currentPage !== null) {
      setStoreCurrentPage(currentPage);
    }

    if (resultsPerPage !== null) {
      setStoreResultsPerPage(resultsPerPage);
    }
  }, []);

  // Fetch scanners when component mounts or when any relevant parameter changes
  useEffect(() => {
    const handleFetchScanners = async () => {
      try {
        const fetchedScanners = await fetchScanners();
        setScanners(fetchedScanners);
      } catch (error: unknown) {
        // Type narrowing for error
        if (error instanceof Error) {
          console.error("Failed to fetch scanners:", error.message);
          toast({
            variant: "destructive",
            title: `Failed to fetch scanners: ${error.message}`,
            description: getFormattedDate(),
          });
        } else if (error instanceof Error) {
          console.error("An unknown error occurred", error);
          toast({
            variant: "destructive",
            title: `An unknown error occurred: ${error.message}`,
            description: getFormattedDate(),
          });
        }
      }
    };

    handleFetchScanners();
  }, [
    searchInputParam,
    scanCategoryIdParam,
    currentPageParam,
    resultsPerPageParam,
  ]);

  return (
    <div className="container max-w-full w-full">
      <DataTable columns={columns} data={scanners} />
    </div>
  );
}
