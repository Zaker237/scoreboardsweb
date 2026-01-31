"use client";

import React, { useEffect, useState } from "react";
import { PlayerService } from "@/services/PlayerService";
import { IPlayer, IPlayerTeamHistory } from "@/interfaces/IPlayers";
import { Loader2 } from "lucide-react";

interface IPlayerTeamsProps {
  player: IPlayer;
}

export const PlayerTeams: React.FC<IPlayerTeamsProps> = ({ player }) => {
  const [teamsHistory, setTeamsHistory] = useState<IPlayerTeamHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formatDate = (date?: Date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  useEffect(() => {
    const loadTeamsHistory = async () => {
      const data = await PlayerService.getPlayerTeamsHistory(player.id);
      setTeamsHistory(data);
      setLoading(false);
    };

    loadTeamsHistory();
  }, [player]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-64">
          <Loader2 className="animate-spin text-primary w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40" />
          <p className="text-primary mt-4 text-sm sm:text-base lg:text-lg">
            Loading Players Teams...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            Player Teams
          </h1>
          <p className="text-muted-foreground text-center text-sm sm:text-base lg:text-lg max-w-md mb-6">
            Career history of {player.firstname} {player.lastname}.
          </p>

          <div className="w-full max-w-2xl flex flex-col gap-4">
            {teamsHistory.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No team history available.
              </p>
            ) : (
              teamsHistory.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  {h.team.logo && (
                    <img
                      src={h.team.logo}
                      alt={h.team.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm sm:text-base">
                      {h.team.name}
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {formatDate(h.start_date)} - {formatDate(h.end_date)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
