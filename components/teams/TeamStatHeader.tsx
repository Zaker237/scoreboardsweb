import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ITeamStats } from "@/interfaces/ITeams";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TeamStatTableHeader: ColumnDef<ITeamStats>[] = [
  {
    accessorKey: "position",
    header: "#",
    cell: ({ row }) => {
      return <div className="p-2">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      const name = row.original.team.name;
      if (!name) return "";
      const logo = row.original.team.logo;
      return (
        <Link href={`/teams/${row.original.team.id}`}>
          <div className="flex p-2 items-center gap-2">
            {logo && (
              <Avatar className="w-6 h-6 mr-2 mr-2 w">
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
    accessorKey: "goals",
    header: "Goals",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.goals}
        </span>
      );
    },
		enableSorting: true
  },
  {
    accessorKey: "assists",
    header: "Assists",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.assists}
        </span>
      );
    },
		enableSorting: true
  },
  {
    accessorKey: "yellow_cards",
    header: "Yellow Cards",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.yellow_cards}
        </span>
      );
    },
		enableSorting: true
  },
  {
    accessorKey: "red_cards",
    header: "Red card",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.red_cards}
        </span>
      );
    },
		enableSorting: true
  },
];