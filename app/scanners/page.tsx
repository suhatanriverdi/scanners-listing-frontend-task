"use client";

import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { scannersData } from "@/app/seed/seedScannersData";
import { transformScannerData } from "@/app/utils/utils";
import { Scanner } from "@/app/lib/definitions";
import { useQueryStore } from "@/app/store/queryStore";
import { fetchScanners } from "@/app/lib/data";
import { useEffect } from "react";
import {
  getCurrentPageParam,
  getResultsPerPageParam,
  getScanCategoryIdParam,
  getSearchInputParam,
} from "@/app/store/localStorageService";

export default function Scanners() {
  // Local sample data, TODO
  const scanners: Scanner[] = transformScannerData(scannersData);

  const {
    searchInputParam,
    scanCategoryIdParam,
    currentPageParam,
    resultsPerPageParam,
  } = useQueryStore();
  console.log(
    "searchInputParam: ",
    searchInputParam,
    "scanCategoryIdParam: ",
    scanCategoryIdParam,
    "currentPageParam: ",
    currentPageParam,
    "resultsPerPage: ",
    resultsPerPageParam,
  );

  const {
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

    // console.log(
    //   "LOCALGET: ",
    //   searchInput,
    //   scanCategoryId,
    //   currentPage,
    //   resultsPerPage,
    // );

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
        await fetchScanners();
        // setScanners(transformScannerData(fetchedScanners)); // Transform and set scanners
      } catch (error) {
        console.error("Failed to fetch scanners:", error);
      }
    };
    handleFetchScanners();
  }, []);

  return (
    <div className="container max-w-full w-full">
      <DataTable columns={columns} data={scanners} />
    </div>
  );
}
