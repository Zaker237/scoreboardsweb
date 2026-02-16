"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ITeam } from "@/interfaces/ITeams";
import { IChampionshipEdition } from "@/interfaces/IEditions";
import { TeamService } from "@/services/TeamService";
import { DateContext } from "@/contexts/DateContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IChampionshipTeamListProps {
  championship: IChampionshipEdition;
  editionId: number;
}

export const ChampionshipTeamList: React.FC<IChampionshipTeamListProps> = ({
  championship,
  editionId,
}) => {
  const { state } = useContext(DateContext);
  const [teams, setTeams] = useState<ITeam[]>([]);

  useEffect(() => {
    const loadTeams = async () => {
      const data = await TeamService.getTeamsByEdition(editionId);
      setTeams(data);
    };
    loadTeams();
  }, [championship.id, editionId, state.date]);

  return (
    <div className="flex flex-col w-full rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 w-full">
        {championship.name}&apos;s Teams
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="min-w-32 sm:min-w-36 lg:min-w-40 border-none shadow-none"
          >
            <CardContent className="flex flex-col justify-center items-center p-4">
              <Link
                className="flex flex-col items-center"
                href={`/teams/${team.id}`}
              >
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                  <AvatarImage src={team.logo} alt={team.name} />
                  <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xs sm:text-sm font-semibold mt-2 text-center">
                  {team.name}
                </h3>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
