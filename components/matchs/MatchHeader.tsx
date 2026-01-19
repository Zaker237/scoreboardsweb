"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMatch, IMatchBase } from "@/interfaces/IMatch";
import { Badge } from "../ui/badge";

interface MatchHeaderProps {
  match: IMatch;
}

export const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between gap-4">
        <TeamBlock team={match.home_team} align="right" />

        <div className="flex flex-col items-center min-w-[100px]">
          <div className="text-4xl font-black tracking-tighter">
            {match.score_final_home} : {match.score_final_away}
          </div>
          {match.went_to_penalties && (
            <div className="text-xs font-bold text-gray-500">
              ({match.score_pso_home}-{match.score_pso_away} PSO)
            </div>
          )}
          <Badge className="mt-2 bg-red-50 text-red-600 border-red-100 hover:bg-red-50">
            {formatMatchStatus(match)}
          </Badge>
        </div>

        <TeamBlock team={match.away_team} align="left" />
      </div>
    </div>
  );
};

const TeamBlock = ({
  team,
  align,
}: {
  team: { name: string; logo?: string };
  align: "left" | "right";
}) => (
  <div
    className={`flex items-center gap-2 ${
      align === "right" ? "flex-row-reverse" : ""
    }`}
  >
    {team.logo && (
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={team.logo} alt={team.name} />
        <AvatarFallback className="text-[10px]">
          {team.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
    )}
    <span className="font-semibold">{team.name}</span>
  </div>
);

function formatMatchStatus(match: IMatchBase) {
  switch (match.status) {
    case "ongoing":
      return "LIVE";
    case "completed":
      return match.went_to_penalties
        ? "PEN"
        : match.went_to_extra_time
          ? "AET"
          : "FT";
    case "planned":
      return "Planned";
    default:
      return match.status.toUpperCase();
  }
}
