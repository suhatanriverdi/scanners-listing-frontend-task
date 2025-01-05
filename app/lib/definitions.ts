// This file contains type definitions for our data,
// Describing the shape of the data, and what data type each property should accept.

export type categoryItem = { label: string; value: string };

export type SeverityLevel =
  | "None"
  | "Informational"
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

// TODO, will be used while fetching?
export type ScannerData = {
  event: object;
  value: {
    data: Scanner[];
  };
};

// Structure of the raw data returned from the API
export interface ScannerRaw {
  score: number; // Score of the scan
  meta_title: string; // Meta title of the scanner
  mini_desc: string; // Short description of the scanner
  auto_desc: string; // Automatic description of the scanner
  if_api_support: boolean; // Indicates if API support is available
  user_id: number | null; // User ID associated with the scan, if any
  asset_type: string; // Type of asset (e.g., domain, IPv4)
  slug: string; // Unique identifier for the scanner
  estimate_time: number; // Estimated time for the scan
  protocol_id: number; // Protocol ID used by the scanner
  created_at: string; // Creation date of the scanner
  result_img: string | null; // Image related to the scan result, if any
  name: string; // Name of the scanner
}

// Data structure for use in the table
export interface Scanner {
  name: string; // Name of the scanner
  description: string; // Description of the scanner
  severity: string; // Severity determined by getSeverity function
}
