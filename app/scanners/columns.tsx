"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Scanner } from "@/app/lib/definitions";

export const columns: ColumnDef<Scanner>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div
        className="truncate max-w-[200px]"
        title={row.getValue("description")}
      >
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as Scanner["severity"];
      const severityClass: Record<Scanner["severity"], string> = {
        None: "text-gray-500",
        Informational: "text-sky-500",
        Low: "text-green-500",
        Medium: "text-yellow-500",
        High: "text-orange-500",
        Critical: "text-red-500",
      };

      return <span className={severityClass[severity]}>{severity}</span>;
    },
  },
];
