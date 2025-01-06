import { Scanner, ScannerRaw } from "@/app/lib/definitions";

export const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Aylar 0'dan başlar, 1 ekleyerek düzeltme yapıyoruz.
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

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

export const transformScannerData = (
  rawData: ScannerRaw[] | undefined,
): Scanner[] => {
  if (!rawData) {
    return [];
  }

  const scanners: Scanner[] = rawData.map((item) => ({
    name: item.name,
    description: item.mini_desc || item.auto_desc,
    severity: getSeverity(item.score),
  }));

  return scanners;
};
