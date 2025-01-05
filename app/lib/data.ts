"use server";

import { ENDPOINTS } from "@/app/config/endpoints";
import { FetchScannersBody, Scanner } from "@/app/lib/definitions";
import { transformScannerData } from "@/app/utils/utils";

export const fetchScanners = async (
  searchInputParam: string | undefined,
  scanCategoryIdParam: string | undefined,
  currentPageParam: number,
  resultsPerPageParam: number,
) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API_TOKEN is not defined"); // Handle missing token error
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
    body.scan_category_id = Number(scanCategoryIdParam);
  }

  const url = `${ENDPOINTS.scanners}`; // This should point to your API route
  console.log("url:", url, "\n\n");
  console.log("Request Body:", body);

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
    console.log("transformedData:", transformedData);
    // Return the fetched data
    return transformedData;
  } catch (error) {
    console.error("Error fetching scanners:", error);
    throw error;
  }
};
