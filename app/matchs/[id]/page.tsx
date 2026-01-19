import { Metadata } from "next";
import MatchTimelineClient from "./MatchTimelineClient";
import { MatchService } from "@/services/MatchService";
import { appDomain } from "@/constants/seoTexts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const matchId = Number(id);

  try {
    const match = await MatchService.getMatchById(matchId);

    if (!match) {
      return {
        title: "Match not found | Scoreboards",
        description: "The match you are looking for does not exist.",
      };
    }

    return {
      title: `Match ${match.home_team.name} vs ${match.away_team.name} | Scoreboards`,
      description: `Live score, timeline, and stats for ${match.home_team.name} vs ${match.away_team.name}.`,
      openGraph: {
        title: `Match ${match.home_team.name} vs ${match.away_team.name}`,
        description: `Live score and stats.`,
        url: `${appDomain}/matchs/${match.id}`,
        images: [{ url: `${appDomain}logo.svg` }],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Match not found | Scoreboards",
      description: "The match you are looking for does not exist.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <MatchTimelineClient id={id} />;
}
