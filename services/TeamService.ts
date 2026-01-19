import { URLs } from "../constants/urls";
import { ITeam } from "../interfaces/ITeams";
import { ITeamStats } from "../interfaces/ITeams";

export class TeamService {
  public static async getTeamsByChampionshipAndYear(
    championshipId: number,
    year: number
  ): Promise<ITeam[]> {
    const response = await fetch(
      URLs.TEAMS.BY_CHAMPIONSHIP_YEAR.replace(
        "$championshipId",
        championshipId.toString()
      ).replace("$year", year.toString())
    );
    return response.json() as Promise<ITeam[]>;
  }

  public static async getTeamsByEdition(editionId: number): Promise<ITeam[]> {
    const response = await fetch(
      URLs.TEAMS.BY_EDITION.replace("$editionId", editionId.toString())
    );
    return response.json() as Promise<ITeam[]>;
  }

  public static async getTeamById(id: number): Promise<ITeam> {
    const response = await fetch(
      URLs.TEAMS.BY_ID.replace("$id", id.toString())
    );
    return response.json() as Promise<ITeam>;
  }

  public static async getPlayerStatsByEdition(
      editionId: number
    ): Promise<ITeamStats[]> {
      const response = await fetch(
        URLs.TEAMS.STATS_BY_EDITION.replace("$editionId", editionId.toString())
      );
      return response.json() as Promise<ITeamStats[]>;
    }
}
