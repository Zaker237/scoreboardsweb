import { URLs } from "../constants/urls";
import { IChampionship } from "../interfaces/IChampionship";
import { IEdition } from "@/interfaces/IEditions";
import { IStanding } from "../interfaces/IStanding";

export class ChampionshipService {
  public static async getChampionships(): Promise<IChampionship[]> {
    const response = await fetch(URLs.CHAMPIONSHIPS.ALL);
    return response.json() as Promise<IChampionship[]>;
  }

  public static async getActiveEditions(): Promise<IEdition[]> {
    const response = await fetch(URLs.EDITIONS.ACTIVE);
    return response.json() as Promise<IEdition[]>;
  }

  public static async getChampionshipById(id: number): Promise<IChampionship> {
    const response = await fetch(
      URLs.CHAMPIONSHIPS.ONE.replace("$id", id.toString())
    );
    return response.json() as Promise<IChampionship>;
  }

  public static async getEditionById(id: number): Promise<IEdition> {
    const response = await fetch(`${URLs.EDITIONS.ACTIVE}${id.toString()}`);
    return response.json() as Promise<IEdition>;
  }

  public static async getStandingsByChampionshipEdition(
    editionId: number
  ): Promise<IStanding[]> {
    const response = await fetch(
      URLs.STANDINGS.CHAMPIONSHIP.replace("$editionId", editionId.toString())
    );
    return response.json() as Promise<IStanding[]>;
  }
}
