"use server";

import { ENDPOINTS } from "@/app/config/endpoints";
import { FetchScannersBody, Scanner } from "@/app/lib/definitions";
import { transformScannerData } from "@/app/utils/utils";

export const fetchScanners = async (
  searchInputParam: string,
  scanCategoryIdParam: string,
  currentPageParam: number,
  resultsPerPageParam: number,
) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  // Handle missing token error
  if (!token) {
    throw new Error("API_TOKEN is not defined");
  }

  // Prepare the request body
  const body: FetchScannersBody = {
    page: currentPageParam, // Current page number
    per_page: resultsPerPageParam, // Number of results per page
    token: token, // Use the token obtained above
  };

  if (searchInputParam) {
    body.query = searchInputParam;
  }

  if (scanCategoryIdParam) {
    body.scan_category_id = parseInt(scanCategoryIdParam);
  }

  const url = `${ENDPOINTS.scanners}`; // This should point to your API route

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Send the request body as JSON
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const transformedData: Scanner[] = transformScannerData(data.value.data);
    const totalRowsCount = data.value.total_count;

    // Return the fetched data & total rows count
    return [transformedData, totalRowsCount];
  } catch (error) {
    console.error("Error fetching scanners:", error);
    throw error;
  }
};
