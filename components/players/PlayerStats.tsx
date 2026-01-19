"use client";

import React, { useState, useEffect } from "react";
import { IPlayer, IPlayerStats } from "@/interfaces/IPlayers";
import { PlayerService } from "@/services/PlayerService";
import { Loader2 } from "lucide-react";
import {
  PlayerGoalStatTableHeader,
  PlayerRedCardStatTableHeader,
} from "@/components/players/PlayerStatHeader";
import { PlayerGoalStatDataTable } from "./PlayerGoalStatDataTable";
import { PlayerRedcardStatDataTable } from "./PlayerRedCardStatDataTable";

interface IPlayerStatsProps {
  player: IPlayer;
}

export const PlayerStats: React.FC<IPlayerStatsProps> = ({ player }) => {
  const [goalStats, setGoalStats] = useState<IPlayerStats[]>([]);
  const [cardStats, setCardStats] = useState<IPlayerStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await PlayerService.getPlayerStatsByPlayer(player.id);

      setGoalStats(
        data
          .filter((playerStat) => playerStat.goals > 0)
          .sort((a, b) => b.goals - a.goals)
      );

      setCardStats(
        data
          .filter((playerStat) => playerStat.red_cards > 0)
          .sort((a, b) => b.red_cards - a.red_cards)
      );

      setLoading(false);
    };
    if (player.id) {
      loadStats();
    }
  }, [player]);

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
          {goalStats.filter((stats) => stats.goals > 0).length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center">
                Goals
              </h2>
              <div className="overflow-x-auto">
                <PlayerGoalStatDataTable
                  columns={PlayerGoalStatTableHeader}
                  data={goalStats.filter((stats) => stats.goals > 0)}
                />
              </div>
            </div>
          )}

          {/* Cards */}
          {cardStats.filter(
            (stats) => stats.yellow_cards > 0 || stats.red_cards > 0
          ).length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center">
                Cards
              </h2>
              <div className="overflow-x-auto">
                <PlayerRedcardStatDataTable
                  columns={PlayerRedCardStatTableHeader}
                  data={cardStats.filter(
                    (stats) => stats.yellow_cards > 0 || stats.red_cards > 0
                  )}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
