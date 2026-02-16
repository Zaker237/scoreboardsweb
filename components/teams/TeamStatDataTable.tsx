"use client";

import { useState } from "react";

import {
  ColumnDef,
  Column,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITeamStats } from "@/interfaces/ITeams";

interface IDataTableProps {
  columns: ColumnDef<ITeamStats>[];
  data: ITeamStats[];
}

export const TeamStatDataTable: React.FC<IDataTableProps> = ({
  columns,
  data,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  const renderSortingIcon = (column: Column<ITeamStats, unknown>) => {
    if (!column.getCanSort() || ["position", "team"].includes(column.id))
      return null;
    const sorted = column.getIsSorted();
    if (sorted === "asc") return <ArrowUp className="ml-1 w-3 h-3 inline" />;
    if (sorted === "desc") return <ArrowDown className="ml-1 w-3 h-3 inline" />;
    return <ArrowUpDown className="ml-1 w-3 h-3 inline" />;
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-[500px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {renderSortingIcon(header.column)}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
