import { Metadata } from "next";
import PlayerClient from "./PlayerClient";
import { PlayerService } from "@/services/PlayerService";
import { appDomain } from "@/constants/seoTexts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const playerId = Number(id);

  try {
    const player = await PlayerService.getPlayersById(playerId);

    if (!player) {
      return {
        title: "Player not found | Scoreboards",
        description: "This player does not exist.",
      };
    }

    return {
      title: `${player.firstname} ${player.lastname} | Scoreboards`,
      description: `Stats, teams and transfers for ${player.firstname} ${player.lastname}.`,
      openGraph: {
        title: `${player.firstname} ${player.lastname}`,
        description: "Player profile, stats and transfer history",
        url: `${appDomain}/players/${player.id}`,
        images: [
          {
            url: player.avatar ?? `${appDomain}logo.svg`,
          },
        ],
        type: "profile",
      },
    };
  } catch {
    return {
      title: "Player | Scoreboards",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <PlayerClient id={id} />;
}
