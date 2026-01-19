import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { IPlayerStats } from "@/interfaces/IPlayers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PlayerGoalStatTableHeader: ColumnDef<IPlayerStats>[] = [
  {
    accessorKey: "position",
    header: "#",
    cell: ({ row }) => {
      return <div className="p-2">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "pleayer",
    header: "Player",
    cell: ({ row }) => {
      const name = `${row.original.player.firstname} ${row.original.player.lastname}`;
      const logo = row.original.player.avatar
        ? row.original.player.avatar
        : "/football-player.jpg";
      return (
        <Link href={`/players/${row.original.player.id}`}>
          <div className="flex p-2 items-center gap-2">
            {logo && (
              <Avatar className="w-6 h-6 mr-2 mr-2">
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
  },
];

export const PlayerAssistStatTableHeader: ColumnDef<IPlayerStats>[] = [
  {
    accessorKey: "position",
    header: "#",
    cell: ({ row }) => {
      return <div className="p-2">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "pleayer",
    header: "Player",
    cell: ({ row }) => {
      const name = `${row.original.player.firstname} ${row.original.player.lastname}`;
      const logo = row.original.player.avatar
        ? row.original.player.avatar
        : "/football-player.jpg";
      return (
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
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      const name = row.original.team.name;
      const logo = row.original.team.logo;
      return (
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
      );
    },
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
  },
];

export const PlayerRedCardStatTableHeader: ColumnDef<IPlayerStats>[] = [
  {
    accessorKey: "position",
    header: "#",
    cell: ({ row }) => {
      return <div className="p-2">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "player",
    header: "Player",
    cell: ({ row }) => {
      const name = `${row.original.player.firstname} ${row.original.player.lastname}`;
      const logo = row.original.player.avatar
        ? row.original.player.avatar
        : "/football-player.jpg";
      return (
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
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      const name = row.original.team.name;
      const logo = row.original.team.logo;
      return (
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
      );
    },
  },
  {
    accessorKey: "red_cards",
    header: "Red Cards",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-bold truncate max-w-[300px]">
          {row.original.red_cards}
        </span>
      );
    },
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
  },
];
