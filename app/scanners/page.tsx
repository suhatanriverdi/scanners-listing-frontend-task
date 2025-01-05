"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { scannersData } from "@/app/seed/seedScannersData";
import { transformScannerData } from "@/app/utils/utils";
// import { useEffect, useState } from "react";
import { Scanner } from "@/app/lib/definitions";
import { useQueryStore } from "@/app/store/queryStore";
import { fetchScanners } from "@/app/lib/data";
import { useEffect } from "react";
// import { ENDPOINTS } from "@/app/config/endpoints";
// import {handleScan} from "@/app/lib/scan-service";
// import {useEffect} from "react";

export default function Scanners() {
  // Local sample data TODO
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
