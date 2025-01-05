// lib/data.ts
"use server";

import { useQueryStore } from "@/app/store/queryStore"; // Adjust path as necessary
import { ENDPOINTS } from "@/app/config/endpoints";
import { FetchScannersBody, Scanner } from "@/app/lib/definitions";
import { transformScannerData } from "@/app/utils/utils"; // Adjust path as necessary

export const fetchScanners = async () => {
  "use server";
  // Get state directly from Zustand store
  const {
    searchInputParam,
    scanCategoryIdParam,
    currentPageParam,
    resultsPerPageParam,
  } = useQueryStore.getState();

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
  console.log("Request Body:", JSON.stringify(body, null, 2), "\n\n");

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
    // console.log("Response Data:", data); // Log the response data for debugging

    const transformedData: Scanner[] = transformScannerData(data.value.data);
    console.log("transformedData:", transformedData);

    return transformedData; // Return the fetched data
  } catch (error) {
    console.error("Error fetching scanners:", error);
    throw error; // Rethrow error for further handling if needed
  }
};
