"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ChampionshipService } from "@/services/ChampionshipService.ts";
import { IStanding } from "@/interfaces/IStanding";
import { IEditionStandingRule } from "@/interfaces/IEditions";
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
  const [rules, setRules] = useState<IEditionStandingRule[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    const getStandings = async () => {
      setIsDataLoading(true);
      try {
        const [data, ruleData] = await Promise.all([
          ChampionshipService.getStandingsByChampionshipEdition(editionId),
          ChampionshipService.getRulesByChampionshipEdition(editionId),
        ]);
        setStandings(data);
        setRules(ruleData);

        // Extract unique groups safely
        const uniqueGroups = Array.from(
          new Set(
            data
              .map((s) => s.participation.group)
              .filter(
                (g): g is string => g !== undefined && g !== null && g !== "",
              ),
          ),
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
                (s) => s.participation.group === group,
              )}
              rules={rules}
            />
            <hr className="my-4" />
          </div>
        ))
      ) : (
        <StandingDataTable
          columns={columns}
          standings={standings}
          rules={rules}
        />
      )}
      {rules.length > 0 && (
        <div className="flex flex-wrap gap-4 px-4 py-2 border-t bg-muted/30 rounded-b-md">
          {rules
            // Sort by priority or position so the legend looks organized
            .sort((a, b) => a.priority - b.priority)
            .map((rule) => (
              <div key={rule.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: rule.color }}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {rule.outcome}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
