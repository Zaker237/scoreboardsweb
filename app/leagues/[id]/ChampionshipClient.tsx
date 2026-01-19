"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChampionshipStanding } from "@/components/standings/ChampionshipStanding";
import { StandingTableHeader } from "@/components/standings/StandingTableHeader";
import { ChampionshipService } from "@/services/ChampionshipService";
import { ChampionshipTeamList } from "@/components/teams/ChampionshipTeamList";
import { ChampionshipMatchList } from "@/components/matchs/ChampionshipMatchList";
import { ChampionshipPlayerStats } from "@/components/players/ChampionshipPlayerStats";
import { ChampionshipTeamStats } from "@/components/teams/ChampionshipTeamStats";
import { IEdition } from "@/interfaces/IEditions";

interface Props {
  id: string;
}

export default function ChampionshipClient({ id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [edition, setEdition] = useState<IEdition | null>(null);
  const [championshipTab, setChampionshipTab] = useState("table");
  const [matchTab, setMatchTab] = useState("all");

  useEffect(() => {
    const loadEdition = async () => {
      const data = await ChampionshipService.getEditionById(Number(id));
      setEdition(data);
    };
    loadEdition();

    const tab = searchParams.get("tab");
    if (tab) setChampionshipTab(tab);
  }, [id, searchParams]);

  if (!edition) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex p-4 gap-4 w-full">
      <div className="flex flex-col lg:flex-row p-4 gap-4 w-full">
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          {edition.championship?.logo && <Avatar className="mb-4 w-24 h-24 lg:w-32 lg:h-32">
            <AvatarImage src={edition.championship.logo} />
            <AvatarFallback>{edition.label}</AvatarFallback>
          </Avatar>}

          <h1 className="text-lg font-semibold text-center">
            {edition.label}
          </h1>

          {edition.championship.country && (
            <div className="flex items-center gap-2 pt-4 font-semibold">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {edition.championship.country}
              </span>
            </div>
          )}
        </div>

        <div className="w-full lg:w-3/4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <Tabs
            value={championshipTab}
            onValueChange={setChampionshipTab}
          >
            <TabsList className="flex w-full overflow-x-auto gap-2">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="matchs">Matches</TabsTrigger>
              <TabsTrigger value="teams_stats">
                Team Stats
              </TabsTrigger>
              <TabsTrigger value="players_stats">
                Player Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <ChampionshipStanding
                columns={StandingTableHeader}
                editionId={edition.id}
              />
            </TabsContent>

            <TabsContent value="teams">
              <ChampionshipTeamList
                championship={edition.championship}
                editionId={edition.id}
              />
            </TabsContent>

            <TabsContent value="players_stats">
              <ChampionshipPlayerStats championshipId={edition.id} />
            </TabsContent>

            <TabsContent value="teams_stats">
              <ChampionshipTeamStats championshipName={edition.label} championshipId={edition.id} />
            </TabsContent>

            <TabsContent value="matchs">
              <Tabs value={matchTab} onValueChange={setMatchTab}>
                <TabsList className="flex gap-2">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>

                <TabsContent value="today">
                  <ChampionshipMatchList
                    championship={edition.championship}
                    editionId={edition.id}
                    status="today"
                  />
                </TabsContent>

                <TabsContent value="fixtures">
                  <ChampionshipMatchList
                    championship={edition.championship}
                    editionId={edition.id}
                    status="scheduled"
                  />
                </TabsContent>

                <TabsContent value="results">
                  <ChampionshipMatchList
                    championship={edition.championship}
                    editionId={edition.id}
                    status="completed"
                  />
                </TabsContent>

                <TabsContent value="all">
                  <ChampionshipMatchList
                    championship={edition.championship}
                    editionId={edition.id}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
