"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ChampionshipService } from "@/services/ChampionshipService.ts";
import { IStanding } from "@/interfaces/IStanding";
import { Loader2 } from "lucide-react";
import { StandingDataTable } from "./StandingDataTable";

interface IChampionshipStandingProps {
  columns: ColumnDef<IStanding>[];
  editionId: number;
}

export const ChampionshipStanding: React.FC<IChampionshipStandingProps> = ({
  columns,
  editionId,
}) => {
  const [standings, setStandings] = useState<IStanding[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    const getStandings = async () => {
      setIsDataLoading(true);
      try {
        const data =
          await ChampionshipService.getStandingsByChampionshipEdition(
            editionId
          );
        setStandings(data);

        // Extract unique groups safely
        const uniqueGroups = Array.from(
          new Set(
            data
              .map((s) => s.participation.group)
              .filter(
                (g): g is string => g !== undefined && g !== null && g !== ""
              )
          )
        );
        setGroups(uniqueGroups);
      } finally {
        setIsDataLoading(false);
      }
    };

    getStandings();
  }, [editionId]);

  if (isDataLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-64">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
        <p className="text-primary mt-4">Loading Standings...</p>
      </div>
    );
  }

  if (!standings || standings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
        No standings available.
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group} className="flex flex-col w-full p-4">
            <h2 className="text-lg text-center font-semibold mb-4">{group}</h2>
            <StandingDataTable
              columns={columns}
              standings={standings.filter(
                (s) => s.participation.group === group
              )}
            />
            <hr className="my-4" />
          </div>
        ))
      ) : (
        <StandingDataTable columns={columns} standings={standings} />
      )}
    </div>
  );
};
