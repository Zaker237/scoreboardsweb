"use client";

import React, { useState, useEffect } from "react";
import { ITeamStats } from "@/interfaces/ITeams";
import { TeamService } from "@/services/TeamService";
import { Loader2 } from "lucide-react";
import { TeamStatTableHeader } from "@/components/teams/TeamStatHeader";
import { TeamStatDataTable } from "../teams/TeamStatDataTable";

interface IChampionshipTeamStatsProps {
  championshipId: number;
  championshipName?: string;
}

export const ChampionshipTeamStats: React.FC<IChampionshipTeamStatsProps> = ({
  championshipId,
  championshipName
}) => {
  const [stats, setStats] = useState<ITeamStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await TeamService.getPlayerStatsByEdition(championshipId);

      setStats(data);

      setLoading(false);
    };

    loadStats();
  }, [championshipId]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-64">
          <Loader2 className="animate-spin text-primary w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40" />
          <p className="text-primary mt-4 text-sm sm:text-base lg:text-lg">
            Loading Team Stats...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            {championshipName ?? ""} Team Stats
          </h1>

          <div className="flex flex-col gap-2">
            <div className="overflow-x-auto">
              <TeamStatDataTable
                columns={TeamStatTableHeader}
                data={stats}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
