"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Scanner, SeverityLevel } from "@/app/lib/definitions";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button"; // Buton bileşenini uygun yerden içe aktarın

export const columns: ColumnDef<Scanner>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="h-12 overflow-hidden" title={row.getValue("name")}>
        <span className="leading-tight line-clamp-2 h-full flex items-center">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="h-12 overflow-hidden" title={row.getValue("description")}>
        <span className="leading-tight line-clamp-2 h-full flex items-center">
          {row.getValue("description")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "severity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Severity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const severity = row.getValue("severity") as SeverityLevel;
      const severityClass: Record<SeverityLevel, string> = {
        None: "rounded-full bg-gray-500 text-white p-3 w-[7rem] text-center",
        Informational:
          "rounded-full bg-sky-500 text-white p-3 w-[7rem] text-center",
        Low: "rounded-full bg-green-500 text-white p-3 w-[7rem] text-center",
        Medium:
          "rounded-full bg-yellow-500 text-white p-3 w-[7rem] text-center",
        High: "rounded-full bg-orange-500 text-white p-3 w-[7rem] text-center",
        Critical: "rounded-full bg-red-500 text-white p-3 w-[7rem] text-center",
      };

      return (
        <div className="flex justify-center">
          <span className={severityClass[severity]}>{severity}</span>
        </div>
      );
    },

    sortingFn: (rowA, rowB) => {
      // Define severityOrder here
      const severityOrder: Record<SeverityLevel, number> = {
        None: 0,
        Informational: 1,
        Low: 2,
        Medium: 3,
        High: 4,
        Critical: 5,
      };

      const severityA = rowA.getValue("severity") as SeverityLevel;
      const severityB = rowB.getValue("severity") as SeverityLevel;

      return severityOrder[severityA] - severityOrder[severityB];
    },
  },
];
