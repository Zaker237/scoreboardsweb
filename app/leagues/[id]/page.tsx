import { Metadata } from "next";
import ChampionshipClient from "./ChampionshipClient";
import { ChampionshipService } from "@/services/ChampionshipService";
import { appDomain } from "@/constants/seoTexts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const editionId = Number(id);

  try {
    const edition = await ChampionshipService.getEditionById(editionId);

    if (!edition) {
      return {
        title: "Championship not found | Scoreboards",
        description: "This championship does not exist.",
      };
    }

    return {
      title: `${edition.label} | Scoreboards`,
      description: `Standings, matches, teams and stats for ${edition.label}.`,
      openGraph: {
        title: edition.label,
        description: `View standings, matches and stats`,
        url: `${appDomain}/championships/${edition.id}`,
        images: [{ url: edition.championship.logo ?? `${appDomain}logo.svg` }],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Championship | Scoreboards",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ChampionshipClient id={id} />;
}
