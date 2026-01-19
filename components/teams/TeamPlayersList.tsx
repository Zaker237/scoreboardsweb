"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ITeam } from "@/interfaces/ITeams";
import { IPlayer } from "@/interfaces/IPlayers";
import { PlayerService } from "@/services/PlayerService";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ITeamPlayersListProps {
  team: ITeam;
}

export const TeamPlayersList: React.FC<ITeamPlayersListProps> = ({ team }) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPlayers = async () => {
      setIsLoading(true);
      const data = await PlayerService.getPlayersByTeam(team.id);
      setPlayers(data);
      setIsLoading(false);
    };
    loadPlayers();
  }, [team]);

  if (isLoading) {
    return <div>Loading players...</div>;
  }

  if (!players.length) {
    return <div>No players found for {team.name}.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {players.map((player) => (
        <Card key={player.id} className="flex items-center p-4">
          <Link href={`/players/${player.id}`}>
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src={player.avatar} alt={player.firstname} />
              <AvatarFallback>
                {`${player.firstname} ${player.lastname}`
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <CardContent className="p-0">
            <Link href={`/players/${player.id}`}>
              <p className="font-semibold">{`${player.firstname} ${player.lastname}`}</p>
            </Link>
            <div className="flex">
              {player.position && (
                <p className="text-sm text-muted-foreground">
                  {player.position}
                </p>
              )}
              {player.jersey_number && (
                <span className="text-sm text-muted-foreground">
                  ({player.jersey_number})
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
