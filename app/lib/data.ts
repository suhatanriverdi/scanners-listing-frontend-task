import { Scanner } from "./definitions";
import { scannersData } from "../seed/seedScannersData";

export async function fetchScanners() {
  try {
    // Intentionally delay a response for demo purposes.
    console.log("Fetching scanners data...");
    const data = await new Promise<Scanner[]>((resolve) =>
      setTimeout(() => resolve(scannersData), 1000),
    );
    console.log("Data fetch completed.");
    return data;
  } catch (error) {
    console.error("Error fetching scanners data:", error);
    throw new Error("Failed to fetch scanners data.");
  }
}
