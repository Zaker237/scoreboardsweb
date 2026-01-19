"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ITeam } from "@/interfaces/ITeams";
import { TeamPlayersList } from "@/components/teams/TeamPlayersList";
import { TeamMatchesList } from "@/components/teams/TeamMatchesList";
import { TeamPlayerStats } from "@/components/players/TeamPlayerStats";
import { TeamService } from "@/services/TeamService";

interface Props {
  id: string;
}

export default function TeamClient({ id }: Props) {
  const router = useRouter();

  const [team, setTeam] = useState<ITeam | null>(null);
  const [teamTab, setTeamTab] = useState("players");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      setIsLoading(true);
      const data = await TeamService.getTeamById(Number(id));
      setTeam(data);
      setIsLoading(false);
    };
    loadTeam();
  }, [id]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!team) {
    return <div className="p-4">Team not found</div>;
  }

  return (
    <div className="flex p-4 gap-4 w-full">
      <div className="flex flex-col lg:flex-row p-4 gap-4 w-full">
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <Avatar className="mb-4 w-24 h-24 lg:w-32 lg:h-32">
            <AvatarImage src={team.logo} alt={`${team.name} logo`} />
            <AvatarFallback>
              {team.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-lg font-semibold text-center break-words">
            {team.name}
          </h1>
        </div>

        <div className="w-full lg:w-3/4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <Tabs value={teamTab} onValueChange={setTeamTab}>
            <TabsList className="flex w-full justify-center">
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="players">
              <TeamPlayersList team={team} />
            </TabsContent>

            <TabsContent value="matches">
              <TeamMatchesList team={team} />
            </TabsContent>

            <TabsContent value="stats">
              <TeamPlayerStats team={team} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
