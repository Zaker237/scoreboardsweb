import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { IStanding } from "@/interfaces/IStanding";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StandingTableHeader: ColumnDef<IStanding>[] = [
  {
    accessorKey: "position",
    header: "#",
    cell: ({ row, table }) => {
      // number of rows in the table
      const rows = table.getRowModel().rows.length;
      // set the background color of the cell based on the position
      const bgColor =
        row.index - 2 < 0
          ? "bg-green-500"
          : row.index >= rows - 3
          ? "bg-red-600"
          : "";
      return (
        <div
          className={`p-2 rounded-md text-center font-semibold text-black ${bgColor}`}
        >
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      const name = row.original.participation.team.name;
      const logo = row.original.participation.team.logo;
      return (
        <Link href={`/teams/${row.original.participation.team.id}`}>
          <div className="flex p-2 items-center gap-2">
            {logo && (
              <Avatar className="w-6 h-6 mr-2">
                <AvatarImage src={logo} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <span className="text-xs font-medium truncate max-w-[300px]">
              {name}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "matches_played",
    header: "Played",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.matches_played}
        </span>
      );
    },
  },
  {
    accessorKey: "GDgd",
    header: "GD",
    cell: ({ row }) => {
      const fg = row.original.goals_for;
      const ga = row.original.goals_against;
      return (
        <span className="text-xs font-semibold truncate max-w-[300px]">
          {fg - ga}
        </span>
      );
    },
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.points}
        </span>
      );
    },
  },
  {
    accessorKey: "wins",
    header: "Wins",
  },
  {
    accessorKey: "draws",
    header: "Draws",
  },
  {
    accessorKey: "losses",
    header: "Losses",
  },
  {
    accessorKey: "goals_for",
    header: "GF",
  },
  {
    accessorKey: "goals_against",
    header: "GA",
  },
];
