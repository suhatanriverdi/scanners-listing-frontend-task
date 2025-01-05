"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { scannersData } from "@/app/seed/seedScannersData";
import { transformScannerData } from "@/app/utils/utils";
// import { useEffect, useState } from "react";
import { Scanner } from "@/app/lib/definitions";
import { useQueryStore } from "@/app/store/queryStore";
// import { ENDPOINTS } from "@/app/config/endpoints";
// import {handleScan} from "@/app/lib/scan-service";
// import {useEffect} from "react";

export default function Scanners() {
  // Local sample data TODO
  const scanners: Scanner[] = transformScannerData(scannersData);

  const { searchInputParam, scanCategoryIdParam } = useQueryStore();
  console.log(
    "searchInputParam: ",
    searchInputParam,
    "scanCategoryIdParam: ",
    scanCategoryIdParam,
  );

  // const [searchText, setSearchText] = useState<string | undefined>(undefined);
  // const [scanCategoryId, setScanCategoryId] = useState<number | undefined>(
  //   undefined,
  // );
  // const [scanners, setScanners] = useState<Scanner[]>([]); // Adjust type as needed

  // // Load search text and category ID from localStorage on component mount
  // useEffect(() => {
  //   const storedSearchText = localStorage.getItem("searchText");
  //   const storedCategoryId = localStorage.getItem("scanCategoryId");
  //
  //   if (storedSearchText) {
  //     setSearchText(storedSearchText);
  //   }
  //
  //   if (storedCategoryId) {
  //     setScanCategoryId(Number(storedCategoryId));
  //   }
  // }, []);

  // Fetch scanners when search text or category ID changes
  // useEffect(() => {
  //   const fetchScanners = async () => {
  //     const fetchedScanners = await handleScan(searchText, scanCategoryId);
  //     setScanners(fetchedScanners || []);
  //   };
  //
  //   fetchScanners();
  // }, [searchText, scanCategoryId]);
  //
  // // Save search text and category ID to localStorage when they change
  // useEffect(() => {
  //   if (searchText) {
  //     localStorage.setItem("searchText", searchText);
  //   }
  //
  //   if (scanCategoryId !== undefined) {
  //     localStorage.setItem("scanCategoryId", scanCategoryId.toString());
  //   }
  // }, [searchText, scanCategoryId]);

  return (
    <div className="container max-w-full w-full">
      <DataTable columns={columns} data={scanners} />
    </div>
  );
}
