import { columns } from "./columns";
import { DataTable } from "./data-table";
import { scannersData } from "@/app/seed/seedScannersData";
import { transformScannerData } from "@/app/utils/utils";

export default function Scanners() {
  const scanners = transformScannerData(scannersData);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={scanners} />
    </div>
  );
}
