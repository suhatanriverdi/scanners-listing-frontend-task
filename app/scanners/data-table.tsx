"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/app/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ENDPOINTS } from "@/app/config/endpoints"; // Updated import

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter(); // Using the correct router

  // State for sorting colums
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // State for search and category
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (selectedCategory) {
      query.set("tools-category", selectedCategory);
    }
    if (searchText) {
      query.set("text", searchText);
    }
    query.set("page", String(0)); // Reset to page 0 on search
    router.push(`${ENDPOINTS.scanners}?scan_type=0&${query.toString()}`);
  };

  return (
    <div>
      {/* Search Bar and Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-x-10 pb-4 gap-y-2 md:gap-y-0">
        <div className="flex items-center min-w-min-[19rem] gap-x-2 w-full md:w-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-sky-500 rounded-md h-10 px-4 pr-10 focus:outline-none focus:ring focus:ring-sky-300 w-full"
            />
            <span className="absolute right-3 top-2 text-sky-500">
              <SearchIcon />
            </span>
          </div>
          <Button
            onClick={handleSearch}
            className="bg-sky-500 text-white hover:bg-sky-600 h-10"
          >
            Search
          </Button>
        </div>

        {/* Dropdown Menu for Category Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border rounded-md w-full md:w-[19rem] h-10 px-3 focus:outline-none focus:ring focus:ring-sky-300 overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedCategory ? selectedCategory : "Select Category"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[19rem] md:w-[auto] max-w-full">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={category.value}
                onSelect={() => {
                  setSelectedCategory(category.label);
                }}
              >
                {category.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setSelectedCategory(null)} // Reset selection
            >
              Clear Selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toggle Dark/Light Mode */}
        {/*<ModeToggle />*/}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {"Total:" + data.length}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={`${table.getState().pagination.pageSize}`}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="h-8 w-[70px] border rounded-md"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
