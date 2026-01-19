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

export const PlayerAssistStatDataTable: React.FC<IDataTableProps> = (
  props: IDataTableProps
) => {
  const [rowsToShow, setRowsToShow] = useState<number>(5);
  const [stats, setStats] = useState<IPlayerStats[]>(props.data.slice(0, 5));
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
      setStats(props.data);
    } else {
      setStats(props.data.slice(0, rowsToShow));
    }
  }, [isShowAll, rowsToShow, props.data]);

  const table = useReactTable({
    data: stats,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={props.columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {props.data.length > rowsToShow && (
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
