import { URLs } from "../constants/urls";
import {
  IMatchBase,
  IMatch,
  IMatchAppearance,
  IMatchEvent,
} from "@/interfaces/IMatch";

export class MatchService {
  public static async getMatchsByDay(date: Date): Promise<IMatchBase[]> {
    const response = await fetch(
      URLs.MATCHS.BY_DAY +
        `?date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    );
    return response.json() as Promise<IMatchBase[]>;
  }

  public static async getMatchById(matchId: number): Promise<IMatch> {
    const response = await fetch(
      URLs.MATCHS.BY_ID.replace("$id", matchId.toString()),
    );
    return response.json() as Promise<IMatch>;
  }

  public static async getMatchsByChampionshipEdition(
    championshipId: number,
    editionId: number,
    status: string = "",
  ): Promise<IMatchBase[]> {
    let url: string = URLs.MATCHS.BY_CHAMPIONSHIP_EDITION.replace(
      "$championshipId",
      championshipId.toString(),
    ).replace("$editionId", editionId.toString());
    if (status !== "") {
      url += `?status=${status}`;
    }
    const response = await fetch(url);
    return response.json() as Promise<IMatchBase[]>;
  }

  public static async getMatchsByEdition(
    editionId: number,
    status: string = "",
  ): Promise<IMatchBase[]> {
    let url: string = URLs.MATCHS.BY_EDITION.replace(
      "$editionId",
      editionId.toString(),
    );
    if (status !== "") {
      url += `?status=${status}`;
    }
    const response = await fetch(url);
    return response.json() as Promise<IMatchBase[]>;
  }

  public static async getMatchsByTeam(
    teamId: number,
    status: string = "",
  ): Promise<IMatchBase[]> {
    let url: string = URLs.MATCHS.BY_TEAM.replace("$teamId", teamId.toString());
    if (status !== "") {
      url += `?status=${status}`;
    }
    const response = await fetch(url);
    return response.json() as Promise<IMatchBase[]>;
  }

  public static async getMatchAppearances(
    matchId: number,
  ): Promise<IMatchAppearance[]> {
    const response = await fetch(
      URLs.MATCHS.APPEARANCE.replace("$matchId", matchId.toString()),
    );
    return response.json() as Promise<IMatchAppearance[]>;
  }

  public static async getMatchTimeline(
    _matchId: number,
  ): Promise<IMatchEvent[]> {
    return [];
  }

  public static async getUpcomingMatchs(
    limit: number = 10,
  ): Promise<IMatchBase[]> {
    const response = await fetch(URLs.MATCHS.UPCOMING + `?limit=${limit}`);
    return response.json() as Promise<IMatchBase[]>;
  }
}
