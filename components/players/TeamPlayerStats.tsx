"use client";

import React, { useState, useEffect } from "react";
import { IPlayerStats } from "@/interfaces/IPlayers";
import { PlayerService } from "@/services/PlayerService";
import { Loader2 } from "lucide-react";
import {
  PlayerGoalStatTableHeader,
  PlayerRedCardStatTableHeader,
} from "@/components/players/PlayerStatHeader";
import { PlayerGoalStatDataTable } from "./PlayerGoalStatDataTable";
import { PlayerRedcardStatDataTable } from "./PlayerRedCardStatDataTable";
import { ITeam } from "@/interfaces/ITeams";

interface ITeamPlayerStatsProps {
  team: ITeam;
}

export const TeamPlayerStats: React.FC<ITeamPlayerStatsProps> = ({ team }) => {
  const [goalStats, setGoalStats] = useState<IPlayerStats[]>([]);
  const [redCardStats, setRedCardStats] = useState<IPlayerStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await PlayerService.getPlayerStatsByTeam(team.id);

      setGoalStats(
        data
          .filter((playerStat) => playerStat.goals > 0)
          .sort((a, b) => b.goals - a.goals)
      );

      setRedCardStats(
        data
          .filter((playerStat) => playerStat.red_cards > 0)
          .sort((a, b) => b.red_cards - a.red_cards)
      );

      setLoading(false);
    };

    loadStats();
  }, [team]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-64">
          <Loader2 className="animate-spin text-primary w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40" />
          <p className="text-primary mt-4 text-sm sm:text-base lg:text-lg">
            Loading Players Stats...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            Team Player Stats
          </h1>

          {/* Top Scorers */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center">
              Top Scorers
            </h2>
            <div className="overflow-x-auto">
              <PlayerGoalStatDataTable
                columns={PlayerGoalStatTableHeader}
                data={goalStats}
              />
            </div>
          </div>

          {/* Red Cards */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center">
              Players with Most Red Cards
            </h2>
            <div className="overflow-x-auto">
              <PlayerRedcardStatDataTable
                columns={PlayerRedCardStatTableHeader}
                data={redCardStats}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
