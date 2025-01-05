import { useQueryStore } from "@/app/store/queryStore"; // Adjust path as necessary
import { ENDPOINTS } from "@/app/config/endpoints";
import { FetchScannersBody } from "@/app/lib/definitions";
import { transformScannerData } from "@/app/utils/utils"; // Adjust path as necessary

export const fetchScanners = async () => {
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
    token: process.env.API_TOKEN, // Get the API token from environment variables
  };

  // Conditionally add parameters to the body if they exist
  // Add query if it exists
  if (searchInputParam) {
    body.query = searchInputParam;
  }

  // Add scan_category_id if it exists
  if (scanCategoryIdParam) {
    body.scan_category_id = Number(scanCategoryIdParam);
  }

  const url = `${ENDPOINTS.scanners}/scan/list`; // Correct URL for the POST request

  console.log("Making POST request to:", url);
  console.log("Request Headers:", {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  console.log("Request Body:", JSON.stringify(body, null, 2)); // Pretty print the body

  // try {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body), // Send the request body as JSON
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status} ${response.statusText}`);
  //   }
  //
  //   const data = await response.json();
  //
  //   console.log("Response Data:", data); // Log the response data for debugging
  //   // Transform the data for data table rows
  //   const transformedData = transformScannerData(data);
  //   console.log("transformedData:", transformedData);
  //
  //   return transformedData; // Return the fetched data
  // } catch (error) {
  //   console.error("Error fetching scanners:", error);
  //   throw error; // Rethrow error for further handling if needed
  // }
};
