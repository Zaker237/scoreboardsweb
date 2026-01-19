"use client";


import React, { useContext, useEffect, useState } from "react";
import { IMatchBase } from "@/interfaces/IMatch";
import { IChampionshipEdition } from "@/interfaces/IEditions";
import { MatchService } from "@/services/MatchService";
import { DateContext } from "@/contexts/DateContext";
import { MatchCard } from "@/components/matchs/MatchCard";
import { Loader2 } from "lucide-react";

interface IChampionshipMatchListProps {
  championship: IChampionshipEdition;
  editionId: number;
  status?: string;
  editionLabel?: string;
  showScore?: boolean;
}

export const ChampionshipMatchList: React.FC<IChampionshipMatchListProps> = ({
  championship,
  editionId,
  status,
}) => {
  const { state } = useContext(DateContext);
  const [matches, setMatches] = useState<IMatchBase[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMatches = async () => {
      setIsDataLoading(true);
      try {
        const data = await MatchService.getMatchsByEdition(
          editionId,
          status || ""
        );
        setMatches(data);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadMatches();
  }, [championship.id, state.date, status, editionId]);

  if (isDataLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-64">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
        <p className="text-primary mt-4">Loading Matches...</p>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-40 text-gray-500">
        No matches available.
      </div>
    );
  }

  // Group matches by round
  const groupedMatches = matches.reduce(
    (acc: Record<string, IMatchBase[]>, match) => {
      const round = match.round || "Unknown Round";
      if (!acc[round]) acc[round] = [];
      acc[round].push(match);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col w-full border rounded-lg p-4">
      {Object.entries(groupedMatches)
        .reverse()
        .map(([round, matches]) => (
          <div key={round} className="mb-2">
            <div className="flex items-center justify-center my-2">
              <h2 className="text-sm font-semibold bg-primary text-white px-4 py-1 rounded-md shadow-sm">
                round {round}
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-gray-200">
              {matches.map((match) => (
                <div key={match.id} className="py-1">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
