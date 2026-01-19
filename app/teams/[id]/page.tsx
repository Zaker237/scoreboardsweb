import { Metadata } from "next";
import TeamClient from "./TeamClient";
import { TeamService } from "@/services/TeamService";
import { appDomain } from "@/constants/seoTexts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const teamId = Number(id);

  try {
    const team = await TeamService.getTeamById(teamId);

    if (!team) {
      return {
        title: "Team not found | Scoreboards",
        description: "This team does not exist.",
      };
    }

    return {
      title: `${team.name} | Scoreboards`,
      description: `Players, matches and stats for ${team.name}.`,
      openGraph: {
        title: team.name,
        description: `View players, matches and stats`,
        url: `${appDomain}/teams/${team.id}`,
        images: [{ url: team.logo ?? `${appDomain}logo.svg` }],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Team | Scoreboards",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <TeamClient id={id} />;
}
