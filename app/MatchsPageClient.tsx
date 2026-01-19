"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { DateContext } from "@/contexts/DateContext";
import { MatchService } from "@/services/MatchService";
import { IMatchBase } from "@/interfaces/IMatch";
import { MatchCard } from "@/components/matchs/MatchCard";
import { ChampionshipList } from "@/components/championships/ChampionshipList";
import { DateNavigator } from "@/components/DateNavigator";
import { Loader2, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IChampionshipMatchs {
  id: number;
  logo?: string;
  editionId: number;
  name: string;
  matchs: IMatchBase[];
}

export default function MatchsPageClient() {
  const { state, dispatch } = useContext(DateContext);
  const [matchs, setMatchs] = useState<IChampionshipMatchs[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const today = new Date();
  const isToday = state.date.toDateString() === today.toDateString();

  useEffect(() => {
    const loadMatchsByDate = async () => {
      setIsDataLoading(true);
      const data = await MatchService.getMatchsByDay(state.date);
      setMatchs(transformMatchsToChampionshipMatchs(data));
      setIsDataLoading(false);
    };
    loadMatchsByDate();
  }, [state.date]);

  return (
    <div className="flex w-full p-4 gap-4">
      <div className="hidden lg:flex lg:w-1/4">
        <ChampionshipList />
      </div>

      <div className="w-full lg:w-3/4">
        <div className="flex flex-col">
          <DateNavigator />

          {isDataLoading && (
            <div className="flex flex-col justify-center items-center w-full min-h-[50vh]">
              <Loader2 className="animate-spin text-primary w-20 h-20" />
              <p className="text-primary mt-4">Loading Matches...</p>
            </div>
          )}

          {!isDataLoading &&
            matchs.length > 0 &&
            matchs.map((data) => (
              <div key={data.id} className="mt-4">
                <div className="flex justify-start items-center border-b">
                  <Link
                    href={`/leagues/${data.editionId}?tab=table`}
                    className="flex w-full"
                  >
                    <div className="flex w-full justify-between items-center px-5 py-2">
                      <div className="flex gap-2 items-center">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={data.logo} alt={data.name} />
                          <AvatarFallback>
                            {data.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h2 className="text-sm font-semibold mr-4">
                          {data.name}
                        </h2>
                      </div>
                      <ChevronRight />
                    </div>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-4 w-full">
                  {data.matchs.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}

          {!isDataLoading && matchs.length === 0 && (
            <div className="flex flex-col justify-center items-center w-full min-h-[50vh]">
              <p className="text-primary mb-4">
                No Matches Found for{" "}
                <strong>
                  {isToday
                    ? "Today"
                    : state.date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </strong>
              </p>

              {!isToday && (
                <button
                  onClick={() =>
                    dispatch({
                      type: "DATE_CHANGED",
                      payload: today,
                    })
                  }
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                >
                  Back to Today
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function transformMatchsToChampionshipMatchs(
  matchs: IMatchBase[]
): IChampionshipMatchs[] {
  const championshipMatchs: IChampionshipMatchs[] = [];
  matchs.forEach((match) => {
    const championship = championshipMatchs.find(
      (champ) => champ.id === match.edition.championship.id
    );
    if (championship) {
      championship.matchs.push(match);
    } else {
      championshipMatchs.push({
        id: match.edition.championship.id,
        logo: match.edition.championship.logo,
        editionId: match.edition.id,
        name: match.edition.label ?? "",
        matchs: [match],
      });
    }
  });
  return championshipMatchs;
}
