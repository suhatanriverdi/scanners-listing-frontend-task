import { Scanner, ScannerRaw } from "@/app/lib/definitions";

export const categories = [
  { label: "DNS Controls", value: "1" },
  { label: "SSL Controls", value: "2" },
  { label: "Misconfiguration", value: "3" },
  { label: "Network Vulnerabilities", value: "4" },
  { label: "Web Vulnerabilities", value: "5" },
  { label: "Information Scans", value: "6" },
  { label: "Product Based Web Vulnerabilities", value: "7" },
  { label: "Product Based Network Vulnerabilities", value: "8" },
];

export const getSeverity = (score: number): string => {
  if (score === 1) return "Informational";
  if (score === 0) return "None";
  if (score <= 3.9) return "Low";
  if (score <= 6.9) return "Medium";
  if (score <= 8.9) return "High";
  return "Critical";
};

export const transformScannerData = (rawData: ScannerRaw[]): Scanner[] => {
  const scanners: Scanner[] = rawData.map((item) => ({
    name: item.name,
    description: item.auto_desc || item.mini_desc,
    severity: getSeverity(item.score),
  }));

  return scanners;
};
