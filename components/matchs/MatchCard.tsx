"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { IMatchBase } from "@/interfaces/IMatch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface IMatchCardProps {
  match: IMatchBase;
}

export const MatchCard: React.FC<IMatchCardProps> = ({ match }) => {
  const matchDate = useMemo(() => new Date(match.date), [match.date]);

  const isFinished = match.status === "completed" || match.status === "awarded";
  const isLive = match.status === "in_progress";
  const isPlanned = match.status === "planned";

  const matchTime = matchDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const renderScore = () => {
    if (isPlanned) {
      return <span className="text-gray-400 font-normal">{matchTime}</span>;
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className={isFinished ? "text-foreground" : "text-primary"}>
            {match.score_final_home}
          </span>
          <span className="text-muted-foreground">-</span>
          <span className={isFinished ? "text-foreground" : "text-primary"}>
            {match.score_final_away}
          </span>
        </div>

        {match.went_to_penalties && match.score_pso_home !== null && (
          <span className="text-[10px] text-muted-foreground font-medium">
            ({match.score_pso_home}-{match.score_pso_away} pen)
          </span>
        )}
      </div>
    );
  };

  const renderStatus = () => {
    if (isLive) {
      return (
        <Badge
          variant="destructive"
          className="animate-pulse text-[10px] py-0 px-1"
        >
          LIVE
        </Badge>
      );
    }

    if (match.went_to_penalties) return <StatusLabel>PEN</StatusLabel>;
    if (match.went_to_extra_time) return <StatusLabel>AET</StatusLabel>;
    if (isFinished) return <StatusLabel>FT</StatusLabel>;

    return null;
  };

  return (
    <Link
      href={`/matchs/${match.id}`}
      className="block transition-colors hover:bg-accent/50"
    >
      <Card className="w-full py-3 px-4 shadow-none rounded-none border-b bg-transparent">
        <CardContent className="p-0 flex items-center justify-between gap-4">
          {/* HOME */}
          <div className="flex items-center gap-3 w-1/3 justify-end">
            <span className="text-xs font-medium text-right xs:inline truncate">
              {match.home_team.name}
            </span>

            <Avatar className="w-7 h-7 border">
              <AvatarImage
                src={match.home_team.logo}
                alt={match.home_team.name}
              />
              <AvatarFallback className="text-[10px]">
                {match.home_team.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col items-center w-1/4 min-w-[60px]">
            {renderScore()}
            <div className="mt-1 h-4 flex items-center justify-center">
              {renderStatus()}
            </div>
          </div>

          {/* AWAY */}
          <div className="flex items-center gap-3 w-1/3 justify-start">
            <Avatar className="w-7 h-7 border">
              <AvatarImage
                src={match.away_team.logo}
                alt={match.away_team.name}
              />
              <AvatarFallback className="text-[10px]">
                {match.away_team.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            <span className="text-xs font-medium xs:inline truncate">
              {match.away_team.name}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

function StatusLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold text-muted-foreground">
      {children}
    </span>
  );
}
