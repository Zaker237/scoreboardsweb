"use client";

import React, { useEffect, useState } from "react";
import { ITeam } from "@/interfaces/ITeams";
import { IMatchBase } from "@/interfaces/IMatch";
import { MatchService } from "@/services/MatchService";
import { MatchCard } from "../matchs/MatchCard";

interface ITeamPlayersListProps {
  team: ITeam;
}

export const TeamMatchesList: React.FC<ITeamPlayersListProps> = ({ team }) => {
  const [matchs, setMatchs] = useState<IMatchBase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPlayers = async () => {
      setIsLoading(true);
      const data: IMatchBase[] = await MatchService.getMatchsByTeam(team.id);
      setMatchs(data);
      setIsLoading(false);
    };
    loadPlayers();
  }, [team]);

  if (isLoading) {
    return <div>Loading Matches...</div>;
  }

  if (!matchs.length) {
    return <div>No Match found for {team.name}.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {matchs.map((match) => (
        <MatchCard match={match} key={`match${match.id}`}/>
      ))}
    </div>
  );
};
