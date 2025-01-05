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
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "@/app/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryItem } from "@/app/lib/definitions"; // Updated import
import { useQueryStore } from "../store/queryStore";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // State for sorting columns
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // State for search and category for query string
  const {
    setSearchInputParam,
    setScanCategoryIdParam,
    currentPageParam,
    resultsPerPageParam,
    setCurrentPage,
    setResultsPerPage,
    searchInputParam, // Get search input param from store
    scanCategoryIdParam, // Get scan category id param from store
  } = useQueryStore();

  // State for search and category
  const [searchText, setSearchText] = useState("");

  // This is for UI only
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryItem | undefined
  >(undefined);

  // Initialize the searchText and selectedCategory when the component mounts
  useEffect(() => {
    if (searchInputParam) {
      setSearchText(searchInputParam);
    }

    if (scanCategoryIdParam) {
      const category = categories.at(Number(scanCategoryIdParam) - 1);
      setSelectedCategory(category);
    }

    // Optionally, you can also set the Zustand store values if needed
    // setSearchInputParam(searchText);
    // setScanCategoryIdParam(selectedCategory?.id);
  }, [searchInputParam, scanCategoryIdParam]);

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
      pagination: {
        pageIndex: currentPageParam - 1, // Adjust for zero-based index
        pageSize: resultsPerPageParam,
      },
    },
  });

  // Handle page change
  const handlePageChange = (newPageIndex: number) => {
    setCurrentPage(newPageIndex + 1); // Update Zustand store (1-based index)
    table.setPageIndex(newPageIndex); // Update local table state
  };

  // Handle results per page change
  const handleResultsPerPageChange = (newPageSize: number) => {
    setResultsPerPage(newPageSize); // Update Zustand store
    table.setPageSize(newPageSize); // Update local table state
    handlePageChange(0); // Reset to first page when changing page size
  };

  return (
    <div className="overflow-x-auto">
      {/* Search Bar and Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-x-10 pb-4 gap-y-2 md:gap-y-0">
        <div className="flex items-center min-w-[19rem] gap-x-2 w-full md:w-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-sky-500 rounded-md h-10 px-4 pr-10 w-full"
            />
            {!searchText && (
              <span className="absolute right-3 top-2 text-sky-500">
                <SearchIcon />
              </span>
            )}
            {searchText && ( // Çarpı ikonu yalnızca bir metin varsa görünsün
              <span
                className="absolute right-3 top-2 cursor-pointer text-sky-500"
                onClick={() => {
                  setSearchText("");
                  setSearchInputParam("");
                }}
              >
                <XIcon />
              </span>
            )}
          </div>
          <Button
            onClick={() => {
              setSearchInputParam(searchText);
              // setSearchText(""); // Eğer arama kutusunu sıfırlamak istemiyorsanız bu satırı bırakabilirsiniz
            }}
            className="bg-sky-500 text-white hover:bg-sky-600 h-10"
          >
            Search
          </Button>
        </div>

        {/* Dropdown Menu for Category Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border rounded-md w-full md:w-[19rem] h-10 px-3 focus:outline-none focus:ring-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedCategory ? selectedCategory.label : "Select Category"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[19rem] md:w-[auto] max-w-full">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category: CategoryItem) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={category.value}
                onSelect={() => {
                  setSelectedCategory(category);
                  setScanCategoryIdParam(category.value);
                }}
              >
                {category.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                setSelectedCategory(undefined);
                setScanCategoryIdParam(undefined);
              }} // Reset selection
            >
              Clear Selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table Container */}
      <div className="rounded-md border overflow-hidden">
        {" "}
        {/* Added overflow-hidden */}
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
          {"Total: " + data.length}
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-8">
          <div className="flex items-center gap-x-2">
            <p className="text-sm font-medium">Rows:</p>
            <select
              value={`${table.getState().pagination.pageSize}`}
              onChange={(e) => {
                // table.setPageSize(Number(e.target.value));
                handleResultsPerPageChange(Number(e.target.value));
              }}
              className="h-8 w-[2.9rem] border rounded-md"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => handlePageChange(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handlePageChange(table.getState().pagination.pageIndex - 1)
              }
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handlePageChange(table.getState().pagination.pageIndex + 1)
              }
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => handlePageChange(table.getPageCount() - 1)}
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
