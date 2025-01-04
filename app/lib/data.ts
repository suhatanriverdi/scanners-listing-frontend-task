import { Scanner } from "./definitions";
// import { scannersData } from "../seed/seedScannersData";
import { API_URL } from "@/app/config/endpoints";
// import { getSeverity } from "@/app/utils/getSeverity";

// TODO
// Search:    ?text=Fortinet
// Category:
export const fetchScanners = async (
  category: number,
  search: string,
  page: number = 0,
): Promise<Scanner[]> => {
  const apiUrl = API_URL;

  const url = new URL(apiUrl);
  const params = new URLSearchParams();

  params.append("category", category.toString());
  if (search) params.append("text", search);

  params.append("page", page.toString());

  try {
    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};
