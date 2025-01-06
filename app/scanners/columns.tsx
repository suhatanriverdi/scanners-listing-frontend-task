"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Scanner, SeverityLevel } from "@/app/lib/definitions";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Scanner>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-xs sm:text-sm"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className="w-full sm:w-[250px] overflow-hidden"
        title={row.getValue("name")}
      >
        <span
          className="line-clamp-2 overflow-hidden text-ellipsis block"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
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
        className="text-xs sm:text-sm"
      >
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className="w-full sm:w-[400px] overflow-hidden"
        title={row.getValue("description")}
      >
        <span
          className="line-clamp-2 overflow-hidden text-ellipsis block"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
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
        className="text-xs sm:text-sm"
      >
        Severity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const severity = row.getValue("severity") as SeverityLevel;
      const severityClass: Record<SeverityLevel, string> = {
        None: "rounded-full bg-gray-500 text-white p-2 w-[6rem] text-center",
        Informational:
          "rounded-full bg-sky-500 text-white p-2 w-[6rem] text-center",
        Low: "rounded-full bg-green-500 text-white p-2 w-[6rem] text-center",
        Medium:
          "rounded-full bg-yellow-500 text-white p-2 w-[6rem] text-center",
        High: "rounded-full bg-orange-500 text-white p-2 w-[6rem] text-center",
        Critical: "rounded-full bg-red-500 text-white p-2 w-[6rem] text-center",
      };

      return (
        <div className="flex justify-center">
          <span className={severityClass[severity]}>{severity}</span>
        </div>
      );
    },

    sortingFn: (rowA, rowB) => {
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
