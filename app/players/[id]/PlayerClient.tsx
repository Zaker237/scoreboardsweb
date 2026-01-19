"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PlayerStats } from "@/components/players/PlayerStats";
import { PlayerTransferts } from "@/components/players/PlayerTransferts";
import { PlayerTeams } from "@/components/players/PlayerTeams";

import { IPlayer } from "@/interfaces/IPlayers";
import { PlayerService } from "@/services/PlayerService";

interface Props {
  id: string;
}

export default function PlayerClient({ id }: Props) {
	const router = useRouter();

  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [playerTab, setPlayerTab] = useState("stats");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlayer = async () => {
      setIsLoading(true);
      const data = await PlayerService.getPlayersById(Number(id));
      setPlayer(data);
      setIsLoading(false);
    };
    loadPlayer();
  }, [id]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!player) {
    return <div className="p-4">Player not found</div>;
  }

  return (
    <div className="flex p-4 gap-4 w-full">
      <div className="flex flex-col lg:flex-row p-4 gap-4 w-full">
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <Avatar className="mb-4 w-24 h-24 lg:w-32 lg:h-32">
            <AvatarImage
              src={player.avatar}
              alt={`${player.firstname} ${player.lastname}`}
            />
            <AvatarFallback>
              {[player.firstname, player.lastname]
                .map((n) => n?.[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-lg font-semibold text-center break-words">
            {player.firstname} {player.lastname}
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
          <Tabs
            value={playerTab}
            onValueChange={setPlayerTab}
            className="w-full"
          >
            <TabsList className="flex w-full justify-center">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="transferts">Transfers</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="teams">
              <PlayerTeams player={player} />
            </TabsContent>

            <TabsContent value="transferts">
              <PlayerTransferts player={player} />
            </TabsContent>

            <TabsContent value="stats">
              <PlayerStats player={player} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
