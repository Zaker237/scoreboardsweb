"use client";

import React, { useEffect, useState } from "react";
import { PlayerService } from "@/services/PlayerService";
import { IPlayer } from "@/interfaces/IPlayers";
import { IPlayerTransfers } from "@/interfaces/ITransfers";
import { Loader2 } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface IPlayerTransfertsProps {
  player: IPlayer;
}

export const PlayerTransferts: React.FC<IPlayerTransfertsProps> = ({
  player,
}) => {
  const [transferts, setTransferts] = useState<IPlayerTransfers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await PlayerService.getPlayerTransfers(player.id);
      setTransferts(data);
      setLoading(false);
    };

    loadStats();
  }, [player]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-64">
          <Loader2 className="animate-spin text-primary w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40" />
          <p className="text-primary mt-4 text-sm sm:text-base lg:text-lg">
            Loading Player Transferts...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            Player Transferts
          </h1>
          <p className="text-muted-foreground text-center text-sm sm:text-base lg:text-lg max-w-md mb-6">
            Track the transfer history of {player.firstname} {player.lastname}.
          </p>

          <div className="w-full max-w-3xl flex flex-col gap-4">
            {transferts.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No transfers available.
              </p>
            ) : (
              transferts.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* From team */}
                  <div className="flex items-center gap-2 w-1/3 justify-end">
                    {t.team?.logo && (
                      <img
                        src={t.team.logo}
                        alt={t.team.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-sm sm:text-base font-medium text-right truncate">
                      {t.team?.name || "—"}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />

                  {/* To team */}
                  <div className="flex items-center gap-2 w-1/3">
                    {t.team?.logo && (
                      <img
                        src={t.team.logo}
                        alt={t.team.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-sm sm:text-base font-medium truncate">
                      {t.team?.name || "—"}
                    </span>
                  </div>

                  {/* Transfer info */}
                  <div className="ml-auto text-right text-sm sm:text-base">
                    <p className="font-semibold">
                      {new Date().toDateString() || "N/A"}
                    </p>
                    {t?.fee && <p className="text-muted-foreground">{t.fee}</p>}
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
