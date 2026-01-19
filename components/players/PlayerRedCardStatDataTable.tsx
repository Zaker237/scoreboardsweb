"use client";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPlayerStats } from "@/interfaces/IPlayers";
import { Button } from "@/components/ui/button";

interface IDataTableProps {
  columns: ColumnDef<IPlayerStats>[];
  data: IPlayerStats[];
}

export const PlayerRedcardStatDataTable: React.FC<IDataTableProps> = ({
  columns,
  data,
}) => {
  const [rowsToShow, setRowsToShow] = useState<number>(5);
  const [stats, setStats] = useState<IPlayerStats[]>(data.slice(0, 5));
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRowsToShow(5);
      } else if (window.innerWidth < 1024) {
        setRowsToShow(8);
      } else {
        setRowsToShow(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isShowAll) {
      setStats(data);
    } else {
      setStats(data.slice(0, rowsToShow));
    }
  }, [isShowAll, rowsToShow, data]);

  const table = useReactTable({
    data: stats,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-[500px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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

      {data.length > rowsToShow && (
        <div className="flex w-full justify-center items-center mb-2 px-6">
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsShowAll(!isShowAll)}
            aria-label={isShowAll ? "Show fewer stats" : "Show all stats"}
          >
            {isShowAll ? "Show Less" : "Show All"}
          </Button>
        </div>
      )}
    </div>
  );
};
