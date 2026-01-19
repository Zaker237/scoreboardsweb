"use client";

import React, { useState, useEffect } from "react";
import { IPlayerStats } from "@/interfaces/IPlayers";
import { PlayerService } from "@/services/PlayerService";
import { Loader2 } from "lucide-react";
import {
  PlayerAssistStatTableHeader,
  PlayerGoalStatTableHeader,
  // PlayerRedCardStatTableHeader,
} from "@/components/players/PlayerStatHeader";
import { PlayerGoalStatDataTable } from "./PlayerGoalStatDataTable";
///import { PlayerRedcardStatDataTable } from "./PlayerRedCardStatDataTable";
import { PlayerAssistStatDataTable } from "./PlayerAssistStatDataTable";

interface IChampionshipPlayerStatsProps {
  championshipId: number;
}

export const ChampionshipPlayerStats: React.FC<
  IChampionshipPlayerStatsProps
> = ({ championshipId }) => {
  const [goalStats, setGoalStats] = useState<IPlayerStats[]>([]);
  const [assistStats, setAssistStats] = useState<IPlayerStats[]>([]);
  // const [redCardStats, setRedCardStats] = useState<IPlayerStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await PlayerService.getPlayerStatsByEdition(championshipId);

      setGoalStats(
        data
          .filter((playerStat) => playerStat.goals > 0)
          .sort((a, b) => b.goals - a.goals)
      );

      setAssistStats(
        data
          .filter((playerStat) => playerStat.assists > 0)
          .sort((a, b) => b.assists - a.assists)
      );

      /*setRedCardStats(
        data
          .filter((playerStat) => playerStat.red_cards > 0)
          .sort((a, b) => b.red_cards - a.red_cards)
      );*/

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
            Loading Players Stats...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            Championship Player Stats
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

          {/* Top Assiter */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center">
              Top Assists
            </h2>
            <div className="overflow-x-auto">
              <PlayerAssistStatDataTable
                columns={PlayerAssistStatTableHeader}
                data={assistStats}
              />
            </div>
          </div>

          {/* Red Cards 
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
          */}
        </>
      )}
    </div>
  );
};
