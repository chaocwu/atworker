"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  Table,
} from "@tanstack/react-table";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import * as React from "react";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowSelect: (row: T) => void;
}

export function DataTableSearchBar<TData>({ table }: { table: Table<TData> }) {
  return (
    <label className="input w-full">
      <Search className="h-4 w-4" />
      <input
        type="search"
        placeholder="编号"
        value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("code")?.setFilterValue(event.target.value)
        }
      />
    </label>
  );
}

export function DataTablePagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex-1 text-xs opacity-50">
        {table.getFilteredRowModel().rows.length}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="btn btn-square btn-info"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="btn btn-square btn-info"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
export function DataTable<T>({
  columns,
  data,
  onRowSelect,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 15,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-4 pt-4">
      <DataTableSearchBar table={table} />
      <div className="rounded-box border border-base-300">
        <table className="table table-sm table-pin-cols	table-pin-rows">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-base-300"
                  onClick={() => onRowSelect(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="max-w-xs truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-48 text-center">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
