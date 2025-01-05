import { ENDPOINTS } from "@/app/config/endpoints";
import { transformScannerData } from "@/app/utils/utils";
import { Scanner, ScannerRaw } from "@/app/lib/definitions";

const API_URL = ENDPOINTS.scanners; // API endpoint

// Function to fetch scanners from the API
export const getScanners = async (params: {
  page: number; // Page number for pagination
  per_page: number; // Number of results per page
  token: string; // API token for authentication
  query?: string; // Optional: Search query
  scan_category_id?: number; // Optional: Category ID for filtering results
}): Promise<{ code: number; value?: { data: ScannerRaw[] } }> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params), // Convert parameters to JSON format
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`); // Handle HTTP errors
    }

    const data = await response.json(); // Parse JSON response
    return data; // Return raw data from the API
  } catch (error) {
    console.error("POST request failed:", error); // Log error to console
    throw error; // Throw error for further handling
  }
};

// Function to initiate a scan operation and fetch results
export const handleScan = async (
  searchText?: string,
  scanCategoryId?: number,
  page = 1,
  perPage = 10,
) => {
  const token = process.env.API_TOKEN;

  if (!token) {
    throw new Error("API_TOKEN is not defined"); // Handle missing token error
  }

  const params = {
    page,
    per_page: perPage,
    token,
    query: searchText || undefined, // Set query to undefined if searchText is not provided
    scan_category_id: scanCategoryId || undefined, // Set category ID to undefined if not provided
  };

  try {
    const result = await getScanners(params); // Fetch scanners using defined parameters

    if (result.code === 200 && result.value?.data) {
      const scanners: Scanner[] = transformScannerData(result.value.data); // Transform raw data into usable format
      console.log("Scan results:", scanners); // Log transformed results to console
      return scanners; // Return transformed scanner data
    } else {
      console.error("Error in response:", result);
      throw new Error("Failed to fetch valid scan results."); // Handle invalid response error
    }
  } catch (error) {
    console.error("Error fetching scan results:", error); // Log any errors encountered during fetching process
  }
};
